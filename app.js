const dialog=document.getElementById('project-dialog');
const content=document.getElementById('project-content');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let lastFocus;
let projectData;
const ready=fetch('portfolio.json').then(r=>{if(!r.ok)throw Error('Portfolio data unavailable');return r.json();}).then(d=>projectData=d);
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',async()=>{
 try{
  await ready;const p=projectData.projects.find(p=>p.id===button.dataset.open);lastFocus=button;
  document.getElementById('project-company').textContent=p.company;
  content.innerHTML=`<p class="eyebrow">${esc(p.type)}</p><h2 id="project-title">${esc(p.title)}</h2><p class="dialog-subtitle">${esc(p.subtitle)}</p><ul>${p.details.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="dialog-links">${p.links.map(([label,url],i)=>`<a class="button ${i?'secondary':'primary'}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`).join('')}</div><p class="access-note">Для материалов на платформе может потребоваться доступ.</p>`;
  dialog.showModal();document.body.classList.add('modal-open');
 }catch{button.textContent='Повторить открытие ↗';}
}));
document.getElementById('close-project').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastFocus?.focus({preventScroll:true});});
dialog.addEventListener('click',ev=>{const r=dialog.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)dialog.close();});
