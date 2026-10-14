/* Abre los montos vigentes de CABA en una ventana, sin salir de la página.
   Los datos se leen de la página de obras en CABA, así hay una sola tabla para actualizar. */
(function(){var d=document.getElementById('montos-caba');if(!d||!d.showModal||!window.fetch)return;
var cont=d.querySelector('.montos-cont'),cargado=false;
function abrir(e){var href=this.getAttribute('href');e.preventDefault();d.showModal();
  if(cargado)return;
  fetch(href).then(function(r){return r.text();}).then(function(html){
    var doc=new DOMParser().parseFromString(html,'text/html'),h=doc.getElementById('montos');if(!h)throw 0;
    var n=h.nextElementSibling,out='';
    while(n&&!(n.tagName==='ASIDE'||n.tagName==='H2'||n.tagName==='SECTION')){out+=n.outerHTML;n=n.nextElementSibling;}
    cont.innerHTML=out;cargado=true;
  }).catch(function(){window.location.href=href;});}
document.querySelectorAll('a[data-montos-caba]').forEach(function(a){a.addEventListener('click',abrir);});
d.querySelector('.cerrar').addEventListener('click',function(){d.close();});
d.addEventListener('click',function(e){if(e.target===d)d.close();});})();
