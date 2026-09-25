const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('span').textContent='+';}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('is-open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.querySelector('span').textContent=open?'−':'+';});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('is-open')){closeMenu();menuButton.focus();}});
matchMedia('(min-width:801px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const descriptions=['SUPPORT FOR THE PLACE YOU CALL HOME','ACCESS FOR YOUR NEXT BIG AMBITION','A DIFFERENT APPROACH TO COMPLEX ACCESS'];
const heroImage=document.querySelector('.hero-image');
const sceneButtons=[...document.querySelectorAll('.showcase-option')];
sceneButtons.forEach((button,index)=>button.addEventListener('click',()=>{sceneButtons.forEach((item,i)=>{item.classList.toggle('is-selected',i===index);item.setAttribute('aria-pressed',String(i===index));});heroImage.dataset.scene=String(index);heroImage.classList.add('scene-change');document.querySelector('.scene-description').textContent=descriptions[index];}));
const gallery=document.querySelector('.project-grid');
const previous=document.querySelector('.gallery-previous');
const next=document.querySelector('.gallery-next');
function galleryState(){const end=gallery.scrollWidth-gallery.clientWidth;previous.disabled=gallery.scrollLeft<4;next.disabled=gallery.scrollLeft>=end-4;document.querySelector('.gallery-count').textContent=gallery.scrollLeft>end/2?'02 / 02':'01 / 02';}
function moveGallery(direction){gallery.scrollTo({left:direction>0?gallery.scrollWidth-gallery.clientWidth:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}
previous.addEventListener('click',()=>moveGallery(-1));next.addEventListener('click',()=>moveGallery(1));gallery.addEventListener('scroll',galleryState,{passive:true});gallery.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();moveGallery(event.key==='ArrowRight'?1:-1);}});window.addEventListener('resize',galleryState);galleryState();
const sections=[...document.querySelectorAll('main>section[id]')];
function updateNavigation(){let current='home';sections.forEach(section=>{if(section.getBoundingClientRect().top<=innerHeight*.4)current=section.id;});navigation.querySelectorAll('a').forEach(link=>{if(link.hash===`#${current}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
let pending=false;window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(()=>{updateNavigation();pending=false;});}},{passive:true});updateNavigation();
