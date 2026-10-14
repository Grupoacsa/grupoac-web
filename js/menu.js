(function(){var n=document.querySelector('.nav'),b=n&&n.querySelector('.menu-btn');if(!b)return;
function t(o){n.classList.toggle('abierto',o);b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú');}
b.addEventListener('click',function(){t(!n.classList.contains('abierto'));});
n.querySelectorAll('ul a').forEach(function(a){a.addEventListener('click',function(){t(false);});});
document.addEventListener('keydown',function(e){if(e.key==='Escape')t(false);});})();
