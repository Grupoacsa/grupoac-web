/* Formulario de nómina para cotizar seguro de vida de empleados */
(function () {
  var f = document.getElementById('nomina');
  if (!f) return;
  var lista = document.getElementById('lista-emp');
  var cont = document.getElementById('contador');
  var estado = document.getElementById('estado');
  var btn = document.getElementById('enviar');
  var WA = 'https://api.whatsapp.com/send?phone=5491157694024&text=';

  function fmtCuit(v) {
    v = v.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) return v.slice(0, 2) + '-' + v.slice(2, 10) + '-' + v.slice(10);
    if (v.length > 2) return v.slice(0, 2) + '-' + v.slice(2);
    return v;
  }
  function fmtPesos(v) {
    v = v.replace(/[^\d]/g, '');
    return v ? Number(v).toLocaleString('es-AR') : '';
  }
  f.addEventListener('input', function (e) {
    var t = e.target;
    if (t.hasAttribute('data-cuit')) t.value = fmtCuit(t.value);
    if (t.hasAttribute('data-pesos')) t.value = fmtPesos(t.value);
    if (t.classList.contains('err')) t.classList.remove('err');
  });

  var n = 0;
  function renumerar() {
    var filas = lista.querySelectorAll('.emp');
    filas.forEach(function (fi, i) { fi.querySelector('.num').innerHTML = '<span class="t">Empleado </span>' + (i + 1); });
    cont.textContent = filas.length + (filas.length === 1 ? ' empleado cargado' : ' empleados cargados');
  }
  function fila(enfocar) {
    n++;
    var d = document.createElement('div');
    d.className = 'emp';
    d.innerHTML =
      '<span class="num"></span>' +
      '<div class="f-nom"><label for="e' + n + 'n">Nombre y apellido</label><input id="e' + n + 'n" name="emp_nombre" autocomplete="off"></div>' +
      '<div class="f-cuil"><label for="e' + n + 'c">CUIL</label><input id="e' + n + 'c" name="emp_cuil" inputmode="numeric" maxlength="13" placeholder="20-12345678-9" data-cuit></div>' +
      '<div><label for="e' + n + 'v">Convenio</label><input id="e' + n + 'v" name="emp_convenio" list="convenios" placeholder="Ej.: Comercio"></div>' +
      '<div><label for="e' + n + 's">Sueldo mensual ($)</label><input id="e' + n + 's" name="emp_sueldo" inputmode="numeric" placeholder="1.500.000" data-pesos></div>' +
      '<div><label for="e' + n + 'f">Fecha de ingreso</label><input id="e' + n + 'f" name="emp_ingreso" type="date"></div>' +
      '<button type="button" class="quitar" aria-label="Quitar este empleado">×</button>';
    lista.appendChild(d);
    renumerar();
    if (enfocar) d.querySelector('input').focus();
  }
  lista.addEventListener('click', function (e) {
    if (!e.target.classList.contains('quitar')) return;
    if (lista.querySelectorAll('.emp').length === 1) {
      lista.querySelectorAll('.emp input').forEach(function (i) { i.value = ''; });
      return;
    }
    e.target.closest('.emp').remove();
    renumerar();
  });
  document.getElementById('agregar').addEventListener('click', function () { fila(true); });
  fila(false);

  var bArch = document.getElementById('bloque-archivo');
  var arch = document.getElementById('archivo');
  f.querySelectorAll('input[name="tiene_excel"]').forEach(function (r) {
    r.addEventListener('change', function () { bArch.hidden = f.tiene_excel.value !== 'si'; });
  });

  function mostrar(clase, html) { estado.className = 'estado ' + clase; estado.innerHTML = html; estado.scrollIntoView({ behavior: 'smooth', block: 'center' }); }

  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (f.web.value) return;
    var malos = [];
    f.querySelectorAll('fieldset:first-of-type [required]').forEach(function (i) {
      var ok = i.value.trim() !== '';
      if (i.type === 'email') ok = /.+@.+\..+/.test(i.value);
      if (i.hasAttribute('data-cuit')) ok = i.value.replace(/\D/g, '').length === 11;
      if (!ok) { i.classList.add('err'); malos.push(i); }
    });
    var conArchivo = f.tiene_excel.value === 'si' && arch.files.length;
    if (f.tiene_excel.value === 'si' && !arch.files.length) { arch.classList.add('err'); malos.push(arch); }
    if (arch.files.length && arch.files[0].size > 5 * 1024 * 1024) { arch.classList.add('err'); malos.push(arch); mostrar('mal', 'El archivo pesa más de 5 MB. Probá guardarlo como CSV o mandanoslo por WhatsApp.'); }
    var cargados = 0;
    lista.querySelectorAll('.emp').forEach(function (fi) {
      var nom = fi.querySelector('[name="emp_nombre"]');
      if (nom.value.trim()) cargados++;
    });
    if (!conArchivo && cargados === 0) {
      var p = lista.querySelector('[name="emp_nombre"]'); p.classList.add('err'); malos.push(p);
    }
    if (malos.length) {
      malos[0].focus();
      if (!estado.innerHTML || estado.className.indexOf('mal') < 0) mostrar('mal', 'Revisá los campos marcados en rojo. Necesitamos los datos de la empresa y al menos un empleado o el archivo con la nómina.');
      return;
    }
    btn.disabled = true; btn.textContent = 'Enviando…';
    var fd = new FormData(f);
    fetch('/api/nomina', { method: 'POST', body: fd })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }).then(function (j) { if (!r.ok || !j.ok) throw new Error(j.error || 'error'); }); })
      .then(function () {
        if (window.gtag) gtag('event', 'generate_lead', { form: 'nomina_vida' });
        f.querySelectorAll('fieldset').forEach(function (x) { x.hidden = true; });
        btn.hidden = true;
        mostrar('ok', '<strong>¡Listo! Recibimos la nómina.</strong><br>Te mandamos la cotización dentro de las 24 horas hábiles. Si querés, escribinos por <a href="' + WA + encodeURIComponent('Hola, acabo de cargar la nómina de ' + f.razon_social.value + ' en la web.') + '" target="_blank" rel="noopener">WhatsApp</a>.');
      })
      .catch(function () {
        btn.disabled = false; btn.textContent = 'Enviar para cotizar';
        mostrar('mal', 'No pudimos enviar el formulario. Por favor mandanos los datos y el Excel por <a href="' + WA + encodeURIComponent('Hola, quiero cotizar el seguro de vida de mis empleados (' + f.razon_social.value + '). Les mando la nómina.') + '" target="_blank" rel="noopener">WhatsApp</a> o a <a href="mailto:info@grupoac.com.ar">info@grupoac.com.ar</a>.');
      });
  });
})();
