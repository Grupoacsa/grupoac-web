// Buscador de convenios colectivos (Grupo AC). Las fichas están en el HTML; esto solo filtra y abre el detalle.
(function(){
var q=document.getElementById('cvb-q'),grid=document.getElementById('cvb-grid'),cnt=document.getElementById('cvb-cnt'),dlg=document.getElementById('cvd');
if(!q||!grid)return;
var cards=[].slice.call(document.querySelectorAll('.cvb .cv:not(.cv-falta)')),mas=document.getElementById('cvb-mas'),falta=document.getElementById('cvb-falta');
var norm=function(s){return (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/^\s*(cct|convenio)\s*/,'').trim();};
var t;
function go(){var v=norm(q.value),n=0;var words=v.split(/\s+/).filter(Boolean);
 cards.forEach(function(c){var k=norm(c.getAttribute('data-k'));var ok=!words.length||words.every(function(w){return k.indexOf(w)>-1;});c.hidden=!ok;if(ok)n++;});
 if(mas)mas.hidden=!mas.querySelector('.cv:not([hidden])');
 cnt.textContent=!v?'':(n?n+(n===1?' convenio encontrado':' convenios encontrados'):'Todavía no publicamos ese convenio. Preguntanos y te decimos qué te exige.');
 clearTimeout(t);if(v&&window.gtag)t=setTimeout(function(){gtag('event','buscar_convenio',{termino:v,resultados:n});},1200);}
q.addEventListener('input',go);
[].forEach.call(document.querySelectorAll('.cvb-chips button'),function(b){b.addEventListener('click',function(){q.value=b.textContent;go();q.focus();});});
function open(c){if(!dlg||!dlg.showModal){var d=c.querySelector('.cv-det');d.hidden=!d.hidden;return;}
 document.getElementById('cvd-num').textContent=c.querySelector('.cv-num').textContent;
 document.getElementById('cvd-tit').textContent=c.querySelector('h3').textContent;
 document.getElementById('cvd-body').innerHTML=c.querySelector('.cv-det').innerHTML;
 dlg.showModal();if(window.gtag)gtag('event','ver_convenio',{convenio:c.id});}
grid.addEventListener('click',function(e){var b=e.target.closest('button.cv-ver');if(b)open(b.closest('.cv'));});
if(dlg){dlg.querySelector('.cvd-x').addEventListener('click',function(){dlg.close();});
 dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();});}
var h=location.hash.match(/^#cct-(.+)/);if(h){var c=document.getElementById('cct-'+h[1]);if(c)setTimeout(function(){c.scrollIntoView({block:'center'});open(c);},300);}
})();
