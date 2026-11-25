// Cloudflare Pages Function: recibe la solicitud de cotización de granizo (/guias/seguro-de-granizo/#solicitud)
// y la envía por mail con Resend. Usa las mismas variables que /api/consulta: RESEND_API_KEY, NOMINA_TO, NOMINA_FROM.
// Si no está configurado, responde 503 y el navegador ofrece mandar la solicitud por WhatsApp.

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const SECCIONES = [
  ['Riesgo', [['localidad_riesgo', 'Localidad del riesgo (granizo)'], ['cultivo', 'Cultivo'], ['moneda', 'Moneda o quintales'], ['bono', 'Número de bono'], ['producto', 'Producto']]],
  ['Adicionales', [['franq_helada', 'Franquicia helada'], ['franq_viento', 'Franquicia viento']]],
  ['Contratante', [['nombre', 'Nombre o razón social'], ['tipo', 'Tipo'], ['cuit', 'CUIT'], ['iva', 'IVA'], ['localidad_solicitante', 'Localidad del solicitante'], ['provincia_riesgo', 'Provincia de riesgo'], ['periodo', 'Período de vigencia'], ['inicio', 'Inicio de vigencia'], ['hasta', 'Vigencia hasta']]],
  ['Datos de cotización', [['hectareas', 'Cantidad de hectáreas'], ['valor_ha', 'Valor por hectárea']]],
  ['Coberturas', [['coberturas', 'Coberturas']]],
  ['Datos de pago', [['moneda_pago', 'Moneda de pago'], ['forma_pago', 'Forma de pago'], ['cuotas', 'Cuotas']]],
  ['Observación', [['observacion', 'Observación']]],
  ['Contacto', [['telefono', 'WhatsApp o teléfono'], ['mail', 'Mail']]],
];

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'sin_configurar' }, 503);
  let fd;
  try { fd = await request.formData(); } catch { return json({ ok: false, error: 'formato' }, 400); }
  if (fd.get('web')) return json({ ok: true }); // honeypot
  const g = (k, n = 300) => String(fd.get(k) || '').trim().slice(0, n);
  if (!g('nombre') || !g('telefono') || !g('cuit')) return json({ ok: false, error: 'faltan_datos' }, 400);

  const filas = SECCIONES.map(([tit, campos]) => {
    const f = campos.map(([k, l]) => (g(k, 2000) ? `<tr><td style="color:#4d5577;width:220px">${l}</td><td><b>${esc(g(k, 2000)).replace(/\n/g, '<br>')}</b></td></tr>` : '')).join('');
    return f ? `<tr><td colspan="2" style="background:#2B4798;color:#fff;font-weight:bold;padding:6px 8px">${tit}</td></tr>${f}` : '';
  }).join('');
  const html = `<div style="font-family:Arial,sans-serif;color:#0D0E1E">
  <h2 style="margin:0 0 8px">Solicitud de cotización de granizo: ${esc(g('nombre'))}</h2>
  <table cellpadding="6" cellspacing="0" style="font-size:14px;border-collapse:collapse">${filas}</table>
  <p style="color:#6b6e80;font-size:12px">Enviado desde ${esc(g('pagina') || 'grupoac.com.ar/guias/seguro-de-granizo/')}</p></div>`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.NOMINA_FROM || 'Web Grupo AC <web@grupoac.com.ar>',
      to: [env.NOMINA_TO || 'info@grupoac.com.ar'],
      ...(g('mail') ? { reply_to: g('mail') } : {}),
      subject: `Solicitud granizo: ${g('nombre')} · ${g('cultivo') || 'cultivo'} · ${g('hectareas') || '?'} ha · ${g('localidad_riesgo')}${g('provincia_riesgo') ? ' (' + g('provincia_riesgo') + ')' : ''}`,
      html,
    }),
  });
  if (!r.ok) return json({ ok: false, error: 'envio' }, 502);
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, error: 'metodo' }, 405);
