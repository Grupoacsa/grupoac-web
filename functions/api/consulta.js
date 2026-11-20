// Cloudflare Pages Function: recibe el formulario de cotización de las guías y lo envía por mail con Resend.
// Usa las mismas variables que /api/nomina: RESEND_API_KEY (obligatoria), NOMINA_TO, NOMINA_FROM.
// Si no está configurado, responde 503 y el navegador abre WhatsApp con la consulta lista.

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'sin_configurar' }, 503);
  let fd;
  try { fd = await request.formData(); } catch { return json({ ok: false, error: 'formato' }, 400); }
  if (fd.get('web')) return json({ ok: true }); // honeypot

  const g = (k, n = 200) => String(fd.get(k) || '').trim().slice(0, n);
  const d = {
    nombre: g('nombre'), tel: g('telefono'), mail: g('mail'), loc: g('localidad'), prov: g('provincia'), origen: g('origen', 300),
    riesgo: g('riesgo'), contacto: g('contacto'), com: g('comentario', 2000), pagina: g('pagina', 300),
  };
  if (!d.nombre || !d.tel) return json({ ok: false, error: 'faltan_datos' }, 400);

  const fila = (k, v) => (v ? `<tr><td><b>${k}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>` : '');
  const html = `<div style="font-family:Arial,sans-serif;color:#14162b">
  <h2 style="margin:0 0 8px">Nueva consulta desde la web: ${esc(d.riesgo || 'seguro')}</h2>
  <table cellpadding="5" style="font-size:14px">
   ${fila('Nombre', d.nombre)}${fila('Teléfono / WhatsApp', d.tel)}${fila('Mail', d.mail)}${fila('Provincia', d.prov)}${fila('Localidad', d.loc)}
   ${fila('Quiere asegurar', d.riesgo)}${fila('Prefiere que lo contacten por', d.contacto)}${fila('Comentario', d.com)}${fila('Página de origen', d.origen)}
  </table>
  <p style="color:#6b6e80;font-size:12px">Enviado desde ${esc(d.pagina || 'grupoac.com.ar')}</p></div>`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.NOMINA_FROM || 'Web Grupo AC <web@grupoac.com.ar>',
      to: [env.NOMINA_TO || 'info@grupoac.com.ar'],
      ...(d.mail ? { reply_to: d.mail } : {}),
      subject: `Consulta web: ${d.riesgo || 'seguro'} · ${d.nombre}${d.prov ? ' (' + d.prov + ')' : ''} · desde ${(d.origen.match(/\(([^)]*)\)\s*$/) || [, d.pagina])[1] || 'la web'}`,
      html,
    }),
  });
  if (!r.ok) return json({ ok: false, error: 'envio' }, 502);
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, error: 'metodo' }, 405);
