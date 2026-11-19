// Cloudflare Pages Function: recibe el formulario de nómina y lo envía por mail con Resend.
// Variables de entorno (Cloudflare Pages > Settings > Variables):
//   RESEND_API_KEY  (obligatoria)
//   NOMINA_TO       (opcional, por defecto info@grupoac.com.ar)
//   NOMINA_FROM     (opcional, por defecto "Web Grupo AC <web@grupoac.com.ar>")

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const csvCell = (s) => '"' + String(s ?? '').replace(/"/g, '""') + '"';

function b64(buf) {
  let bin = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'sin_configurar' }, 503);
  let fd;
  try { fd = await request.formData(); } catch { return json({ ok: false, error: 'formato' }, 400); }
  if (fd.get('web')) return json({ ok: true }); // honeypot

  const g = (k) => String(fd.get(k) || '').trim().slice(0, 300);
  const emp = {
    razon: g('razon_social'), cuit: g('cuit'), iva: g('iva'), dom: g('domicilio'), loc: g('localidad'),
    prov: g('provincia'), cp: g('cp'), tel: g('telefono'), mail: g('mail'), com: String(fd.get('comentarios') || '').slice(0, 2000),
  };
  if (!emp.razon || !emp.cuit || !emp.mail) return json({ ok: false, error: 'faltan_datos' }, 400);

  const cols = ['emp_nombre', 'emp_cuil', 'emp_convenio', 'emp_sueldo', 'emp_ingreso'];
  const arr = cols.map((c) => fd.getAll(c).map((v) => String(v).trim().slice(0, 120)));
  const filas = arr[0].map((_, i) => cols.map((_, j) => arr[j][i] || '')).filter((f) => f[0] || f[1]).slice(0, 500);

  const fecha = (s) => (/^\d{4}-\d{2}-\d{2}$/.test(s) ? s.split('-').reverse().join('/') : s);
  const tabla = filas.length
    ? '<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px"><tr style="background:#0D0E1E;color:#fff"><th>#</th><th>Nombre y apellido</th><th>CUIL</th><th>Convenio</th><th>Sueldo mensual</th><th>Fecha de ingreso</th></tr>' +
      filas.map((f, i) => `<tr><td>${i + 1}</td><td>${esc(f[0])}</td><td>${esc(f[1])}</td><td>${esc(f[2])}</td><td style="text-align:right">$ ${esc(f[3])}</td><td>${esc(fecha(f[4]))}</td></tr>`).join('') + '</table>'
    : '<p><em>No cargó empleados en el formulario (ver archivo adjunto).</em></p>';

  const html = `<div style="font-family:Arial,sans-serif;color:#14162b">
  <h2 style="margin:0 0 8px">Nueva nómina para cotizar seguro de vida</h2>
  <h3>Empresa</h3>
  <table cellpadding="4" style="font-size:14px">
   <tr><td><b>Razón social</b></td><td>${esc(emp.razon)}</td></tr>
   <tr><td><b>CUIT</b></td><td>${esc(emp.cuit)}</td></tr>
   <tr><td><b>Condición IVA</b></td><td>${esc(emp.iva)}</td></tr>
   <tr><td><b>Domicilio</b></td><td>${esc(emp.dom)}</td></tr>
   <tr><td><b>Localidad</b></td><td>${esc(emp.loc)}</td></tr>
   <tr><td><b>Provincia</b></td><td>${esc(emp.prov)}</td></tr>
   <tr><td><b>Código postal</b></td><td>${esc(emp.cp)}</td></tr>
   <tr><td><b>Teléfono</b></td><td>${esc(emp.tel)}</td></tr>
   <tr><td><b>Mail</b></td><td>${esc(emp.mail)}</td></tr>
  </table>
  <h3>Empleados (${filas.length})</h3>${tabla}
  ${emp.com ? `<h3>Comentarios</h3><p>${esc(emp.com).replace(/\n/g, '<br>')}</p>` : ''}
  <p style="color:#6b6e80;font-size:12px">Enviado desde grupoac.com.ar/cotizar-seguro-de-vida-empleados/</p></div>`;

  const attachments = [];
  if (filas.length) {
    const csv = '﻿' + ['Nombre y apellido;CUIL;Convenio;Sueldo mensual;Fecha de ingreso']
      .concat(filas.map((f) => [f[0], f[1], f[2], f[3], fecha(f[4])].map(csvCell).join(';'))).join('\r\n');
    attachments.push({ filename: 'nomina-formulario.csv', content: btoa(unescape(encodeURIComponent(csv))) });
  }
  const file = fd.get('archivo');
  if (file && typeof file === 'object' && file.size > 0) {
    if (file.size > 5 * 1024 * 1024) return json({ ok: false, error: 'archivo_grande' }, 413);
    const nombre = (file.name || 'nomina').replace(/[^\w.\- ]/g, '_').slice(0, 80);
    attachments.push({ filename: nombre, content: b64(await file.arrayBuffer()) });
  }

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.NOMINA_FROM || 'Web Grupo AC <web@grupoac.com.ar>',
      to: [env.NOMINA_TO || 'info@grupoac.com.ar'],
      reply_to: emp.mail,
      subject: `Nómina para cotizar vida: ${emp.razon} (${filas.length} empleados)`,
      html,
      attachments,
    }),
  });
  if (!r.ok) return json({ ok: false, error: 'envio' }, 502);
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, error: 'metodo' }, 405);
