var ITEMS=[
{id:'chatgpt',n:'ChatGPT',d:'OpenAI flagship AI assistant. GPT-4o, DALL-E, web browsing.',c:'ai',img:'assets/products/png/chatgpt.png',tiers:[
{n:'Plus',p:16,dur:'1 month',fmt:'Account access',desc:'GPT-4o, GPT-4, DALL-E, web browsing, 40 msgs/3h'},
{n:'Team',p:25,dur:'1 month',fmt:'Team workspace',desc:'Admin console, shared workspaces, higher limits'},
{n:'Pro',p:50,dur:'1 month',fmt:'Priority access',desc:'o1 preview, priority access, unlimited GPT-4o'}
]},
{id:'claude',n:'Claude',d:'Anthropic AI assistant. Extended thinking, vision, 200k context.',c:'ai',img:'assets/products/png/claude.png',tiers:[
{n:'Pro',p:13,dur:'1 month',fmt:'Client account',desc:'Claude 3.5 Sonnet, 5x usage, extended thinking'},
{n:'Team',p:20,dur:'1 month',fmt:'Team workspace',desc:'Admin dashboard, shared workspaces, SSO'},
{n:'Enterprise',p:40,dur:'1 month',fmt:'Full access',desc:'Audit logs, unlimited usage, custom retention'}
]},
{id:'perplexity',n:'Perplexity',d:'AI search engine with real-time citations and deep research.',c:'ai',img:'assets/products/png/perplexity.png',tiers:[
{n:'Pro',p:10,dur:'1 month',fmt:'Client account',desc:'Unlimited Pro searches, $5 API credits, file uploads'},
{n:'Enterprise',p:20,dur:'1 month',fmt:'Team account',desc:'Team libraries, admin controls, priority support'}
]},
{id:'spotify',n:'Spotify',d:'Music streaming with 100M+ tracks, podcasts, AI discovery.',c:'music',img:'assets/products/png/spotify.png',tiers:[
{n:'Individual',p:10,dur:'1 month',fmt:'Gift code',desc:'Ad-free, offline, unlimited skips'},
{n:'Duo',p:13,dur:'1 month',fmt:'Gift code',desc:'2 accounts, duo mix playlists'},
{n:'Family',p:16,dur:'1 month',fmt:'Gift code',desc:'Up to 6 accounts, family mix'},
{n:'Student',p:5,dur:'1 month',fmt:'Gift code',desc:'Discounted Individual plan'}
]},
{id:'yt',n:'YouTube Premium',d:'Ad-free YouTube, background play, offline, YouTube Music.',c:'music',img:'assets/products/png/yt.png',tiers:[
{n:'Individual',p:8,dur:'1 month',fmt:'Code / Setup',desc:'Ad-free, background, offline, Music included'},
{n:'Family',p:16,dur:'1 month',fmt:'Code / Setup',desc:'Up to 6 family members'},
{n:'Student',p:4,dur:'1 month',fmt:'Code / Setup',desc:'Discounted plan'}
]},
{id:'apple',n:'Apple Music',d:'Lossless audio, Spatial Audio Dolby Atmos, 100M+ tracks.',c:'music',img:'assets/products/png/apple.png',tiers:[
{n:'Individual',p:11,dur:'1 month',fmt:'Gift code',desc:'100M+ songs, lossless, Spatial Audio'},
{n:'Family',p:17,dur:'1 month',fmt:'Gift code',desc:'Up to 6 family members'},
{n:'Student',p:6,dur:'1 month',fmt:'Gift code',desc:'Student pricing'}
]},
{id:'canva',n:'Canva Pro',d:'Professional design. Templates, brand kit, BG remover, AI gen.',c:'work',img:'assets/products/png/canva.png',tiers:[
{n:'Pro',p:12,dur:'1 month',fmt:'Personal plan',desc:'100M+ templates, brand kit, BG remover, AI generator'},
{n:'Teams',p:25,dur:'1 month',fmt:'Team plan',desc:'3-5 people, shared brand kit, collaboration'}
]},
{id:'notion',n:'Notion',d:'All-in-one workspace. Notes, docs, wikis, projects, databases.',c:'work',img:'assets/products/png/notion.png',tiers:[
{n:'Plus',p:10,dur:'1 month',fmt:'Personal workspace',desc:'Unlimited pages, 10 guests, 5GB uploads'},
{n:'Business',p:18,dur:'1 month',fmt:'Team workspace',desc:'SAML SSO, advanced permissions, 250 guests'},
{n:'Enterprise',p:30,dur:'1 month',fmt:'Full access',desc:'Audit log, security, dedicated success manager'}
]},
{id:'m365',n:'Microsoft 365',d:'Office suite + 1TB OneDrive. Word, Excel, PowerPoint, Outlook.',c:'work',img:'assets/products/png/m365.png',tiers:[
{n:'Personal',p:50,dur:'1 year',fmt:'License key',desc:'All Office apps, 1TB OneDrive, premium Outlook'},
{n:'Family',p:70,dur:'1 year',fmt:'License key',desc:'Up to 6 people, 6TB total, family safety'}
]},
{id:'steam',n:'Steam',d:'Gift cards for the largest PC gaming platform.',c:'play',img:'assets/products/png/steam.png',tiers:[
{n:'$10',p:10,dur:'one-time',fmt:'Gift card',desc:'$10 Steam Wallet credit'},
{n:'$25',p:25,dur:'one-time',fmt:'Gift card',desc:'$25 Steam Wallet credit'},
{n:'$50',p:50,dur:'one-time',fmt:'Gift card',desc:'$50 Steam Wallet credit'}
]},
{id:'psn',n:'PlayStation',d:'Gift cards for PlayStation Store. Games, DLC, PS Plus.',c:'play',img:'assets/products/png/psn.png',tiers:[
{n:'$10',p:10,dur:'one-time',fmt:'Gift card',desc:'$10 PSN Wallet credit'},
{n:'$25',p:25,dur:'one-time',fmt:'Gift card',desc:'$25 PSN Wallet credit'},
{n:'$50',p:50,dur:'one-time',fmt:'Gift card',desc:'$50 PSN Wallet credit'}
]},
{id:'xbox',n:'Xbox',d:'Game Pass and gift cards for the Xbox ecosystem.',c:'play',img:'assets/products/png/xbox.png',tiers:[
{n:'Core',p:10,dur:'1 month',fmt:'Code',desc:'Online multiplayer, 25+ games'},
{n:'Standard',p:15,dur:'1 month',fmt:'Code',desc:'Hundreds of games, day-one releases'},
{n:'Ultimate',p:20,dur:'1 month',fmt:'Code',desc:'Standard + EA Play + cloud gaming'}
]}
];
var tg=window.Telegram&&window.Telegram.WebApp;
if(tg){try{tg.ready();tg.expand();if(tg.BackButton)tg.BackButton.hide();}catch(e){}}
var cart=JSON.parse(localStorage.getItem('ms_c7')||'[]');
var orders=JSON.parse(localStorage.getItem('ms_o7')||'[]');
var currentView='home';
var viewHistory=[];
var detailItem=null;
var API=window.location.origin;
var uid=(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user&&tg.initDataUnsafe.user.id)||0;
var refCode='MS'+(uid||Math.floor(Math.random()*99999));
function $(id){return document.getElementById(id);}
function showView(name){
var views=document.querySelectorAll('.view');
for(var i=0;i<views.length;i++)views[i].classList.remove('active');
var v=document.getElementById('view-'+name);
if(v)v.classList.add('active');
viewHistory.push(currentView);currentView=name;updateNav();window.scrollTo(0,0);
}
function goBack(){var p=viewHistory.pop()||'home';showViewDirect(p);}
function showViewDirect(name){
var views=document.querySelectorAll('.view');
for(var i=0;i<views.length;i++)views[i].classList.remove('active');
var v=document.getElementById('view-'+name);
if(v)v.classList.add('active');
currentView=name;updateNav();window.scrollTo(0,0);
}
function navTo(name){if(name===currentView)return;viewHistory=[];showViewDirect(name);}
function updateNav(){
var items=document.querySelectorAll('.nav-item');
for(var i=0;i<items.length;i++){items[i].classList.remove('active');if(items[i].dataset.view===currentView)items[i].classList.add('active');}
}
function switchTab(el){
var tabs=document.querySelectorAll('.tab');
for(var i=0;i<tabs.length;i++)tabs[i].classList.remove('active');
el.classList.add('active');renderCatalog(el.dataset.cat);
}
function renderCatalog(cat){
cat=cat||'all';var el=$('catalog');el.innerHTML='';
var items=ITEMS.filter(function(x){return cat==='all'||x.c===cat;});
for(var i=0;i<items.length;i++){
var it=items[i];var d=document.createElement('div');d.className='product';
d.onclick=(function(item){return function(){openDetail(item);};})(it);
d.innerHTML='<div class="product-img"><img src="'+it.img+'" alt="'+it.n+'" style="width:100%;height:100%;object-fit:cover;display:block"></div><div class="product-bottom"><span class="product-name">'+it.n+'</span><span class="product-price">from $'+it.tiers[0].p+'</span></div>';
el.appendChild(d);
}
}
function openDetail(item){
detailItem=item;
$('d-tag').textContent=item.c.toUpperCase();
$('d-name').textContent=item.n;
$('d-desc').textContent=item.d;
$('d-dur').textContent=item.tiers.length+' plans';
$('d-fmt').textContent=item.tiers[0].fmt;
$('d-price').textContent='from $'+item.tiers[0].p;
var h=$('d-hero');h.className='detail-img';
h.innerHTML='<img src="'+item.img+'" alt="'+item.n+'" style="width:100%;height:100%;object-fit:cover;display:block">';
showView('detail');
}
function showTiers(){
if(!detailItem)return;
var hero=$('tier-hero');hero.className='detail-img';
hero.innerHTML='<img src="'+detailItem.img+'" alt="'+detailItem.n+'" style="width:100%;height:100%;object-fit:cover;display:block">';
var list=$('tier-list');list.innerHTML='<div class="detail-tag" style="margin:0 0 4px">'+detailItem.c.toUpperCase()+'</div><h2 style="margin-bottom:12px">'+detailItem.n+'</h2>';
for(var i=0;i<detailItem.tiers.length;i++){
var t=detailItem.tiers[i];
var d=document.createElement('div');d.className='tier-card';
d.innerHTML='<div class="tier-ic"><img src="'+detailItem.img+'" style="width:32px;height:32px;border-radius:6px"></div><div class="tier-info"><strong>'+t.n+'</strong><span>'+t.desc+'</span></div><span class="tier-price">$'+t.p+'</span>';
d.onclick=(function(item,tier){return function(){addToCartTier(item,tier);};})(detailItem,t);
list.appendChild(d);
}
showView('tier');
}
function updateBadge(){var c=cart.length;var b=$('nav-badge');if(b){b.textContent=c;if(c>0)b.classList.remove('hidden');else b.classList.add('hidden');}}
function saveCart(){localStorage.setItem('ms_c7',JSON.stringify(cart));updateBadge();}
function saveOrders(){localStorage.setItem('ms_o7',JSON.stringify(orders));}
function addToCart(){showTiers();}
function addToCartTier(item,tier){
cart.push({id:item.id+'-'+tier.n,n:item.n+' '+tier.n,price:tier.p,dur:tier.dur,fmt:tier.fmt,img:item.img});
saveCart();viewHistory=viewHistory.filter(function(v){return v==='home'||v==='detail';});
navTo('home');
}
function removeFromCart(i){cart.splice(i,1);saveCart();renderCart();}
function showCart2(){renderCart();showView('cart2');}
function renderCart(){
var list=$('cart-list2');var empty=$('cart-empty2');var footer=$('cart-footer2');
list.innerHTML='';
if(cart.length===0){empty.classList.remove('hidden');footer.classList.add('hidden');return;}
empty.classList.add('hidden');footer.classList.remove('hidden');
var total=0;
for(var i=0;i<cart.length;i++){
var it=cart[i];total+=it.price;
var d=document.createElement('div');d.className='cart-item';
d.innerHTML='<div class="cart-item-img"><img src="'+(it.img||'assets/products/png/chatgpt.png')+'" style="width:100%;height:100%;object-fit:cover;border-radius:8px"></div><div class="cart-item-info"><h4>'+it.n+'</h4><p>'+it.dur+' / '+it.fmt+'</p></div><div class="cart-item-right"><span class="cart-item-price">$'+it.price+'</span><button class="cart-item-del" data-idx="'+i+'">&#10005;</button></div>';
list.appendChild(d);
}
var dels=list.querySelectorAll('.cart-item-del');
for(var j=0;j<dels.length;j++){dels[j].onclick=(function(idx){return function(){removeFromCart(idx);};})(j);}
var cb=Math.round(total*0.05*100)/100;
$('cart-total-val2').textContent='$'+total+' (+'+cb.toFixed(2)+' cashback)';
}
function showPay2(){showView('pay');var t=cart.reduce(function(s,i){return s+i.price;},0);$('pay-total').textContent='$'+t;}
function doPay(method){
var total=cart.reduce(function(s,i){return s+i.price;},0);
var cb=Math.round(total*0.05*100)/100;
var order=cart.map(function(i){return{id:i.id,name:i.n,price:i.price,duration:i.dur};});
fetch(API+'/api/create-invoice',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:order,method:method})})
.then(function(r){return r.json();})
.then(function(data){
if(data.invoice_url){
if(tg&&tg.openInvoice){tg.openInvoice(data.invoice_url,function(st){
if(st==='paid'){
var names=cart.map(function(c){return c.n;}).join(', ');
cart=[];saveCart();
orders.push({date:new Date().toLocaleDateString(),total:total,cashback:cb,items:names});
saveOrders();showView('confirm');
}});}else{window.open(data.invoice_url,'_blank');}
}else{if(tg&&tg.showAlert)tg.showAlert('Error: '+(data.error||'Failed'));}})
.catch(function(){if(tg&&tg.showAlert)tg.showAlert('Network error');});
}
function renderHistory(){
var list=$('history-list');var empty=$('history-empty');
list.innerHTML='';
if(orders.length===0){empty.classList.remove('hidden');return;}
empty.classList.add('hidden');
for(var i=orders.length-1;i>=0;i--){
var o=orders[i];
var d=document.createElement('div');d.className='history-item';
d.innerHTML='<div class="history-top"><span class="history-date">'+o.date+'</span><span class="history-total">$'+o.total+'</span></div><div class="history-items">'+o.items+'</div><div class="history-cb">+$'+o.cashback.toFixed(2)+' cashback</div>';
list.appendChild(d);
}
}
function renderProfile(){
var user=(tg&&tg.initDataUnsafe&&tg.initDataUnsafe.user)?tg.initDataUnsafe.user:null;
$('p-av').textContent=user?user.first_name.charAt(0).toUpperCase():'?';
$('p-name').textContent=user?user.first_name:'User';
$('p-orders').textContent=orders.length;
var tc=orders.reduce(function(s,o){return s+(o.cashback||0);},0);
$('p-cb').textContent='$'+tc.toFixed(2);
$('ref-code').textContent=refCode;
$('p-refs').textContent=orders.length;
$('p-ref-e').textContent='$'+(orders.length*2);
}
function copyRef(){
if(navigator.clipboard)navigator.clipboard.writeText(refCode);
if(tg&&tg.showAlert)tg.showAlert('Ref code: '+refCode);
}
function toggleFaq(el){
var a=el.nextElementSibling;
if(a&&a.classList.contains('faq-a')){a.classList.toggle('hidden');var arr=el.querySelector('span:last-child');if(arr)arr.textContent=a.classList.contains('hidden')?'▼':'▲';}
}
renderCatalog();updateBadge();renderProfile();renderHistory();
