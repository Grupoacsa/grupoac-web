// Formulario de cotización de las guías: intenta enviarlo por mail (/api/consulta);
// si el envío no está disponible, abre WhatsApp con la consulta ya escrita.
(function () {
  var WA = '5491157694024';
  document.querySelectorAll('form.fg-form').forEach(function (f) {
    var ok = f.parentNode.querySelector('.fg-ok');
    var btn = f.querySelector('button[type=submit]');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var faltan = [];
      f.querySelectorAll('[required]').forEach(function (i) {
        var v = i.value.trim();
        var mal = !v || (i.name === 'telefono' && v.replace(/\D/g, '').length < 8);
        i.closest('.fg-campo').classList.toggle('error', mal);
        if (mal) faltan.push(i);
      });
      if (faltan.length) { faltan[0].focus(); return; }
      var fd = new FormData(f);
      fd.append('pagina', location.href.split('#')[0]);
      var txt = 'Hola, vengo de la web y quiero cotizar: ' + (fd.get('riesgo') || 'un seguro') +
        '.\nNombre: ' + fd.get('nombre') + '\nTeléfono: ' + fd.get('telefono') +
        (fd.get('mail') ? '\nMail: ' + fd.get('mail') : '') +
        (fd.get('provincia') ? '\nProvincia: ' + fd.get('provincia') : '') +
        (fd.get('contacto') ? '\nPrefiero que me contacten por: ' + fd.get('contacto') : '') +
        (fd.get('comentario') ? '\n' + fd.get('comentario') : '') +
        '\n(Desde: ' + (fd.get('origen') || location.pathname) + ')';
      var listo = function () {
        f.hidden = true; if (ok) { ok.hidden = false; ok.focus(); }
        if (window.gtag) gtag('event', 'generate_lead', { form: 'guia', riesgo: fd.get('riesgo'), origen: location.pathname });
      };
      var aWhatsApp = function () {
        // Sin envío por mail: último paso por WhatsApp (botón que toca la persona, así no lo bloquea el navegador).
        var w = ok && ok.querySelector('.fg-wa');
        if (w) { w.href = 'https://api.whatsapp.com/send?phone=' + WA + '&text=' + encodeURIComponent(txt); ok.classList.add('por-wa'); }
        listo();
      };
      btn.disabled = true; btn.classList.add('enviando');
      fetch('/api/consulta', { method: 'POST', body: fd })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (j) { if (j && j.ok) listo(); else aWhatsApp(); })
        .catch(aWhatsApp)
        .finally(function () { btn.disabled = false; btn.classList.remove('enviando'); });
    });
    f.querySelectorAll('input,textarea,select').forEach(function (i) {
      i.addEventListener('input', function () { var c = i.closest('.fg-campo'); if (c) c.classList.remove('error'); });
    });
  });
})();
