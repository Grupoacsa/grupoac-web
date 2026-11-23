(function(){var n=document.querySelector('.nav'),b=n&&n.querySelector('.menu-btn');if(!b)return;
function t(o){n.classList.toggle('abierto',o);b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú');}
b.addEventListener('click',function(){t(!n.classList.contains('abierto'));});
n.querySelectorAll('ul a').forEach(function(a){a.addEventListener('click',function(){t(false);});});
document.addEventListener('keydown',function(e){if(e.key==='Escape')t(false);});})();
/* Abre la sección plegada cuando se llega por un enlace del índice */
(function(){function abrir(){var h=location.hash;if(!h||h.length<2)return;var t;try{t=document.querySelector(h)}catch(e){return}var d=t&&t.closest('details');while(d){d.open=true;d=d.parentElement&&d.parentElement.closest('details')}if(t)t.scrollIntoView()}
window.addEventListener('hashchange',abrir);if(document.readyState!=='loading')abrir();else document.addEventListener('DOMContentLoaded',abrir);})();
