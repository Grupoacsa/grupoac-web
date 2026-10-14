(function(){var d=document.getElementById('quienes-somos');if(!d||!d.showModal)return;
function abrir(e){if(e)e.preventDefault();d.showModal();}
document.querySelectorAll('a[href="/#nosotros"],[data-abrir-nosotros]').forEach(function(a){a.addEventListener('click',abrir);});
d.querySelector('.cerrar').addEventListener('click',function(){d.close();});
d.addEventListener('click',function(e){if(e.target===d)d.close();});})();
