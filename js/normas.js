/* Ventana emergente con el resumen y el enlace oficial de cada norma citada.
   Uso: <button type="button" class="norma" data-norma="ccyc-2067">art. 2067 del Código Civil y Comercial</button> */
(function () {
  var N = {
    'ley-24449-68': {
      t: "Ley de Tránsito 24.449, art. 68 (seguro obligatorio)",
      r: "Todo automotor, acoplado o semiacoplado debe tener un seguro que cubra los daños causados a terceros, transportados o no. Rige también para las motos. El comprobante del seguro vigente debe llevarse al circular.",
      u: "https://www.argentina.gob.ar/normativa/nacional/ley-24449-818/actualizacion"
    },
    'res-ssn-480-2026': {
      t: "Resolución SSN 480/2026 (montos de RC de vehículos desde 2027)",
      r: "Actualiza los límites mínimos del seguro de responsabilidad civil de vehículos para las pólizas emitidas o renovadas desde el 1 de enero de 2027. Autos, camionetas y motos: $270 millones por acontecimiento. Seguro obligatorio: $27 millones por persona.",
      ul: "Ver nuestra nota con los montos →",
      u: "https://grupoac.com.ar/novedades/nuevos-montos-rc-autos-2027/"
    },
    'cct-130-97': {
      t: "Convenio Colectivo de Trabajo 130/75 (empleados de comercio), art. 97",
      r: "Obliga al empleador a contratar un seguro de vida colectivo para todo el personal comprendido en el convenio, sin límite de edad, que cubre muerte e incapacidad total y permanente por un capital equivalente a 12 sueldos iniciales de la categoría Administrativo A. El empleador lo contrata con la aseguradora que elija. Es independiente del seguro de vida obligatorio del Decreto 1567/74 y del seguro de retiro La Estrella.",
      ul: "Ver un resumen del convenio →",
      u: "https://www.ignacioonline.com.ar/empleados-de-comercio-seguros/"
    },
    'cct-389-23': {
      t: "Convenio Colectivo de Trabajo 389/04 (gastronómicos y hoteleros), art. 23",
      r: "Prevé seguros de vida y sepelio para los trabajadores de la actividad. Según los acuerdos paritarios homologados, se financian con un aporte del 1% a cargo del trabajador y una contribución del 1% a cargo del empleador.",
      u: "https://www.santafe.gov.ar/index.php/web/content/download/69127/335737/file/CCT%20389-04%20Gastron%C3%B3micos%20"
    },
    'lct-75': {
      t: 'Ley de Contrato de Trabajo 20.744, art. 75 (deber de seguridad)',
      r: 'El empleador debe hacer observar las pautas y limitaciones a la duración del trabajo y las normas de higiene y seguridad, y responde por los daños que sufra el trabajador por no cumplirlas. Rige para el consorcio como empleador del encargado y demás personal.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/ley-20744-25552/actualizacion'
    },
    'lct-248': {
      t: 'Ley de Contrato de Trabajo 20.744, art. 248 (texto según Ley 27.802)',
      r: 'Si el trabajador fallece, el empleador debe pagar a sus causahabientes una indemnización. Es independiente de lo que paguen la ART, el seguro de vida obligatorio u otros beneficios. Por eso muchos empleadores contratan un seguro de vida colectivo que cubra esa indemnización.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/norma-423680/texto'
    },
    'ley-12981': {
      t: 'Ley 12.981, Estatuto del personal de casas de renta y propiedad horizontal',
      r: 'Regula el trabajo de los encargados, ayudantes y demás personal de los edificios: categorías, jornada, vivienda y obligaciones del consorcio como empleador. Se complementa con el convenio colectivo de la actividad y, en lo que no prevé, con la Ley de Contrato de Trabajo.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/norma-45226/texto'
    },
    'ley-26844-74': {
      t: 'Ley 26.844 de Casas Particulares, arts. 14.1 inc. e) y 74',
      r: 'El art. 14.1 inc. e) establece la obligación del empleador de contratar a favor del personal un seguro por los riesgos del trabajo. El art. 74 incorpora a las trabajadoras y trabajadores de casas particulares al régimen de las leyes 24.557 y 26.773. El Decreto 467/14 y la Resolución SRT 2224/14 lo reglamentan: el empleador elige libremente la ART y, si paga la cuota sin elegir, la SRT le asigna una de oficio.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/210489/texto'
    },
    'ley-24557-3': {
      t: 'Ley 24.557 de Riesgos del Trabajo, art. 3',
      r: 'El seguro de riesgos del trabajo es obligatorio para todo empleador con personal en relación de dependencia: debe afiliarse a una ART o, si cumple los requisitos, autoasegurarse. El empleador no afiliado responde directamente por las prestaciones.',
      u: 'https://www.argentina.gob.ar/normativa/nacional/27971/actualizacion'
    },
    'prorrata-pra': {
      t: 'Incendio a prorrata o a primer riesgo absoluto: ¿cuál conviene?',
      h: '<p><strong>A prorrata.</strong> Asegurás el valor total del edificio. Si la suma asegurada es menor que el valor real, ante un siniestro parcial la aseguradora paga en proporción. <em>Ejemplo:</em> el edificio vale $1.000 millones y está asegurado por $500 millones (la mitad). Un incendio causa daños por $100 millones: cobrás $50 millones.</p><p><strong>A primer riesgo absoluto.</strong> Asegurás un monto fijo y la aseguradora paga el daño completo hasta ese monto, sin aplicar la proporción. <em>Mismo ejemplo</em> con un primer riesgo de $200 millones: cobrás los $100 millones completos. Cada peso asegurado cuesta más, y si el daño supera el monto, la diferencia corre por tu cuenta.</p><p><strong>¿Cuál conviene?</strong> Para un edificio, lo habitual es asegurar a prorrata por el valor total de reposición, con cláusula de ajuste automático, y sumar un primer riesgo absoluto complementario que cubre lo que falte si la suma quedó atrasada. Te ayudamos a calcular el valor del edificio.</p>',
      u: 'https://www.argentina.gob.ar/normativa/nacional/ley-17418-39520/actualizacion',
      ul: 'Ver la Ley de Seguros (art. 65) →'
    },
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
    'cct-589-27': {
      t: 'Convenio Colectivo de Trabajo 589/10 (encargados de edificio), arts. 27 y 27 bis',
      r: 'El sindicato contrata pólizas colectivas que cubren muerte, la indemnización del art. 248 LCT, sueldos por enfermedad o accidente inculpable, desempleo y licencias especiales. El consorcio aporta el 4% del sueldo bruto de cada trabajador y se retiene el 1% a los afiliados. El art. 27 bis suma un seguro de vida entera con ahorro (0,75% del consorcio y 0,75% del trabajador). Los sueldos cubiertos los paga el consorcio y la aseguradora los reintegra dentro de los 30 días.',
      u: 'https://fateryh.org.ar/convenio-colectivo-589-10/'
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

  var css = '.norma{background:none;border:0;padding:0;font:inherit;color:inherit;text-align:inherit;text-decoration:underline dotted;text-underline-offset:3px;cursor:pointer}' +
    '.norma::after{content:" \\2139";font-size:.8em;opacity:.6}.norma.nota::after{content:" \\2192"}' +
    '.norma-pop{max-width:600px;width:calc(100% - 32px);border:0;border-radius:14px;padding:26px 24px 22px;box-shadow:0 20px 60px rgba(0,0,0,.35);font-family:inherit;color:#14162b}' +
    '.norma-pop::backdrop{background:rgba(10,12,30,.55)}' +
    '.norma-pop h3{margin:0 34px 12px 0;font-size:1.1rem;line-height:1.35}' +
    '.norma-pop p{margin:0 0 14px;line-height:1.6;font-size:.98rem}.norma-pop #norma-r{margin-bottom:6px;max-height:60vh;overflow:auto}' +
    '.norma-pop a{font-weight:600;color:#1d3fb8}' +
    '.norma-pop .x{position:absolute;top:12px;right:14px;background:none;border:0;font-size:26px;line-height:1;cursor:pointer;color:#55586b}' +
    '.norma-pop small{display:block;color:#6b6e80;margin-top:14px;font-size:.8rem}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var d = document.createElement('dialog');
  d.className = 'norma-pop';
  d.setAttribute('aria-labelledby', 'norma-t');
  d.innerHTML = '<button type="button" class="x" aria-label="Cerrar">&times;</button><h3 id="norma-t"></h3><div id="norma-r"></div><a id="norma-u" target="_blank" rel="noopener">Ver el texto oficial &rarr;</a><small>Resumen orientativo elaborado por Grupo AC. Ante cualquier duda, rige el texto oficial.</small>';
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
    var rr=d.querySelector('#norma-r'); if (n.h) { rr.innerHTML = n.h; } else { rr.textContent = n.r; }
    var uu=d.querySelector('#norma-u'); uu.href = n.u; uu.textContent = n.ul || 'Ver el texto oficial \u2192';
    if (d.showModal) d.showModal(); else window.open(n.u, '_blank');
  });
})();
