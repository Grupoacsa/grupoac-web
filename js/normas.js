/* Ventana emergente con el resumen y el enlace oficial de cada norma citada.
   Uso: <button type="button" class="norma" data-norma="ccyc-2067">art. 2067 del Código Civil y Comercial</button> */
(function () {
  var N = {
    'ccyc-2067': {
      t: 'Código Civil y Comercial de la Nación, art. 2067, inc. h',
      r: 'Entre las obligaciones del administrador del consorcio está mantener asegurado el inmueble con un seguro integral de consorcios que incluya incendio, responsabilidad civil y demás riesgos de práctica, además de los otros riesgos que resuelva la asamblea.',
      u: 'https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/texact.htm'
    },
    'res-412-agc-2019': {
      t: 'Resolución 412-AGC-2019 (Ciudad de Buenos Aires)',
      r: 'De la Agencia Gubernamental de Control. Reglamenta el Código de Edificación (Ley 6100) para ascensores, calderas y termotanques, y fija coberturas mínimas de responsabilidad civil en Unidades Fijas (UF): 300.000 UF para el primer ascensor y 50.000 UF por cada uno adicional; 400.000, 200.000 y 100.000 UF según el tipo de caldera; 50.000 UF por termotanque; y 350.000 UF para las empresas conservadoras.',
      u: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/487696'
    },
    'ley-24557': {
      t: 'Ley 24.557 de Riesgos del Trabajo',
      r: 'Todo empleador con trabajadores en relación de dependencia debe afiliarse a una aseguradora de riesgos del trabajo (ART), que cubre los accidentes de trabajo y las enfermedades profesionales.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/27971/actualizacion'
    },
    'dec-1567-74': {
      t: 'Decreto 1567/74, Seguro de Vida Colectivo Obligatorio',
      r: 'Obliga a los empleadores a contratar un seguro de vida para cada trabajador en relación de dependencia. Cubre la muerte por cualquier causa y se paga aparte de cualquier otro beneficio, seguro o indemnización.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/norma-24301/texto'
    },
    'ley-941': {
      t: 'Ley 941 (Ciudad de Buenos Aires), art. 12, inc. e',
      r: 'Crea el Registro Público de Administradores de Consorcios de Propiedad Horizontal. Entre las obligaciones del administrador inscripto está garantizar ante el consorcio el cumplimiento de las obligaciones que surgen de su relación con él.',
      u: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/29885'
    },
    'disp-777-2013': {
      t: 'Disposición 777/2013 (Defensa del Consumidor, Ciudad de Buenos Aires)',
      r: 'Establece que, para cumplir con el art. 12, inc. e, de la Ley 941, los administradores de consorcios deben tomar un seguro de responsabilidad profesional a favor del consorcio.',
      u: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/217861'
    },
    'ley-17418-65': {
      t: 'Ley de Seguros 17.418, art. 65 (infraseguro)',
      r: 'Si la suma asegurada es menor que el valor real del bien, ante un siniestro parcial la aseguradora indemniza solo en la proporción que hay entre la suma asegurada y ese valor, salvo que se haya pactado otra cosa. Es la llamada regla proporcional.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/ley-17418-39520/actualizacion'
    },
    'ley-17804': {
      t: 'Ley 17.804, seguro de caución en obras públicas',
      r: 'Permite constituir mediante un seguro de caución las garantías que exigen los artículos 14, 21 y 46 de la Ley de Obras Públicas 13.064.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/norma-300867/texto'
    },
    'ley-13064': {
      t: 'Ley 13.064 de Obras Públicas',
      r: 'Regula la contratación de obras públicas nacionales y exige garantías a oferentes y contratistas para asegurar el cumplimiento de sus obligaciones.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/norma-38542/texto'
    },
    'ley-18829': {
      t: 'Ley 18.829 de Agentes de Viajes',
      r: 'Regula la actividad de las agencias de viajes. Para obtener la licencia exige constituir un fondo de garantía en efectivo, títulos públicos, fianza bancaria o seguro sustitutivo, que protege al turista.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/norma-27128/texto'
    },
    'ley-25599': {
      t: 'Ley 25.599 de Turismo Estudiantil',
      r: 'Las agencias que venden viajes de estudiantes necesitan un certificado nacional de autorización y deben acreditar garantías suficientes ante posibles incumplimientos. Desde 2024 el reglamento exige un seguro de caución que garantiza la devolución de las cuotas pagadas si la agencia no cumple.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/ley-25599-75087/texto'
    }
  };

  var css = '.norma{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline dotted;text-underline-offset:3px;cursor:pointer}' +
    '.norma::after{content:" \\2139";font-size:.8em;opacity:.6}' +
    '.norma-pop{max-width:520px;width:calc(100% - 32px);border:0;border-radius:14px;padding:26px 24px 22px;box-shadow:0 20px 60px rgba(0,0,0,.35);font-family:inherit;color:#14162b}' +
    '.norma-pop::backdrop{background:rgba(10,12,30,.55)}' +
    '.norma-pop h3{margin:0 34px 12px 0;font-size:1.1rem;line-height:1.35}' +
    '.norma-pop p{margin:0 0 16px;line-height:1.6;font-size:.98rem}' +
    '.norma-pop a{font-weight:600;color:#1d3fb8}' +
    '.norma-pop .x{position:absolute;top:12px;right:14px;background:none;border:0;font-size:26px;line-height:1;cursor:pointer;color:#55586b}' +
    '.norma-pop small{display:block;color:#6b6e80;margin-top:14px;font-size:.8rem}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var d = document.createElement('dialog');
  d.className = 'norma-pop';
  d.setAttribute('aria-labelledby', 'norma-t');
  d.innerHTML = '<button type="button" class="x" aria-label="Cerrar">&times;</button><h3 id="norma-t"></h3><p id="norma-r"></p><a id="norma-u" target="_blank" rel="noopener">Ver el texto oficial &rarr;</a><small>Resumen orientativo elaborado por Grupo AC. Ante cualquier duda, rige el texto oficial.</small>';
  document.body.appendChild(d);
  function cerrar() { if (d.open) d.close(); }
  d.querySelector('.x').addEventListener('click', cerrar);
  d.addEventListener('click', function (e) { if (e.target === d) cerrar(); });

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.norma[data-norma]');
    if (!b) return;
    var n = N[b.getAttribute('data-norma')];
    if (!n) return;
    e.preventDefault();
    d.querySelector('#norma-t').textContent = n.t;
    d.querySelector('#norma-r').textContent = n.r;
    d.querySelector('#norma-u').href = n.u;
    if (d.showModal) d.showModal(); else window.open(n.u, '_blank');
  });
})();
