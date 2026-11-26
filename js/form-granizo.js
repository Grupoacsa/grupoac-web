// Solicitud de cotización de granizo: arma las coberturas y la vigencia, valida y envía a /api/granizo.
// Si el envío por mail no está disponible, ofrece mandar la solicitud completa por WhatsApp.
(function () {
  var f = document.getElementById('sg-form'); if (!f) return;
  var WA = '5491157694024';
  var ok = document.getElementById('sg-ok'), btn = f.querySelector('button[type=submit]');
  var $ = function (n) { return f.elements[n]; };
  function coberturas() {
    var l = ['Granizo', 'Incendio (incluido sin costo)'];
    if (/%/.test($('franq_helada').value)) l.push('Helada (' + $('franq_helada').value + ')');
    if (/%/.test($('franq_viento').value)) l.push('Viento (' + $('franq_viento').value + ')');
    document.getElementById('sg-cob').innerHTML = l.map(function (x) { return '<li>' + x + '</li>'; }).join('');
    $('coberturas').value = l.join(', ');
  }
  function unidad() {
    var m = $('moneda').value;
    document.getElementById('sg-unidad').textContent = /Quintales/.test(m) ? 'Quintales por hectárea' : /Dólares/.test(m) ? 'Dólares por hectárea' : /Pesos/.test(m) ? 'Pesos por hectárea' : 'Según la moneda elegida';
  }
  function hasta() {
    var i = $('inicio').value, p = parseInt($('periodo').value, 10);
    if (!i || !p) { $('hasta').value = ''; return; }
    var d = new Date(i + 'T12:00:00'); d.setMonth(d.getMonth() + p);
    $('hasta').value = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();
  }
  ['franq_helada', 'franq_viento'].forEach(function (n) { $(n).addEventListener('change', coberturas); });
  $('moneda').addEventListener('change', unidad);
  $('inicio').addEventListener('change', hasta); $('periodo').addEventListener('change', hasta);
  coberturas(); unidad();
  f.querySelectorAll('input,select,textarea').forEach(function (i) {
    i.addEventListener('input', function () { var c = i.closest('.fg-campo'); if (c) c.classList.remove('error'); });
  });
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var faltan = [];
    f.querySelectorAll('[required]').forEach(function (i) {
      var v = i.value.trim(), mal = !v || (i.name === 'telefono' && v.replace(/\D/g, '').length < 8) || (i.name === 'cuit' && v.replace(/\D/g, '').length !== 11);
      i.closest('.fg-campo').classList.toggle('error', mal); if (mal) faltan.push(i);
    });
    if (faltan.length) { faltan[0].focus(); return; }
    var fd = new FormData(f); fd.append('pagina', location.href.split('#')[0]);
    var txt = 'Hola, quiero cotizar el seguro de granizo (solicitud de la web):';
    f.querySelectorAll('[data-et]').forEach(function (i) { if (i.value.trim()) txt += '\n' + i.getAttribute('data-et') + ': ' + i.value.trim(); });
    var listo = function () { f.hidden = true; ok.hidden = false; ok.focus(); if (window.gtag) gtag('event', 'generate_lead', { form: 'granizo', origen: location.pathname }); };
    var porWA = function () { var w = ok.querySelector('.fg-wa'); w.href = 'https://api.whatsapp.com/send?phone=' + WA + '&text=' + encodeURIComponent(txt); ok.classList.add('por-wa'); listo(); };
    btn.disabled = true; btn.classList.add('enviando');
    fetch('/api/granizo', { method: 'POST', body: fd })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (j) { if (j && j.ok) listo(); else porWA(); })
      .catch(porWA)
      .finally(function () { btn.disabled = false; btn.classList.remove('enviando'); });
  });
})();
