var ITEMS=[
{id:'chatgpt',n:'ChatGPT',d:'OpenAI flagship AI assistant. GPT-4o, DALL-E image generation, file analysis, web browsing, and advanced reasoning.',c:'ai',em:'\u2728',pg:'pg-chatgpt',tiers:[
{n:'Plus',p:16,dur:'1 month',fmt:'Account access',desc:'GPT-4o, GPT-4, DALL-E, web browsing, 40 messages/3h on GPT-4'},
{n:'Team',p:25,dur:'1 month',fmt:'Team workspace',desc:'Plus features + admin console, shared workspaces, higher limits'},
{n:'Pro',p:50,dur:'1 month',fmt:'Priority access',desc:'Everything in Team + o1 preview, priority access, unlimited GPT-4o'}
]},
{id:'claude',n:'Claude',d:'Anthropic AI assistant. Extended thinking, vision, large context window, and strong coding abilities.',c:'ai',em:'\uD83C\uDF1F',pg:'pg-claude',tiers:[
{n:'Pro',p:13,dur:'1 month',fmt:'Client account',desc:'Claude 3.5 Sonnet, 5x more usage, extended thinking, priority access'},
{n:'Team',p:20,dur:'1 month',fmt:'Team workspace',desc:'Pro features + admin dashboard, shared workspaces, SSO ready'},
{n:'Enterprise',p:40,dur:'1 month',fmt:'Full access',desc:'Everything in Team + audit logs, unlimited usage, custom data retention'}
]},
{id:'perplexity',n:'Perplexity',d:'AI-powered search engine with real-time citations. Pro reasoning, file uploads, and API credits.',c:'ai',em:'\uD83D\uDD0D',pg:'pg-perplexity',tiers:[
{n:'Pro',p:10,dur:'1 month',fmt:'Client account',desc:'Unlimited Pro searches, $5/mo API credits, file uploads, image generation'},
{n:'Enterprise',p:20,dur:'1 month',fmt:'Team account',desc:'Pro features + team libraries, admin controls, priority support'}
]},
{id:'spotify',n:'Spotify',d:'Music streaming with 100M+ tracks, podcasts, and AI-powered discovery.',c:'music',em:'\uD83C\uDFB5',pg:'pg-spotify',tiers:[
{n:'Individual',p:10,dur:'1 month',fmt:'Gift code',desc:'Ad-free music, offline download, unlimited skips, 1 account'},
{n:'Duo',p:13,dur:'1 month',fmt:'Gift code',desc:'Everything in Individual for 2 people living together'},
{n:'Family',p:16,dur:'1 month',fmt:'Gift code',desc:'Up to 6 accounts, family mix playlists, explicit content filter'},
{n:'Student',p:5,dur:'1 month',fmt:'Gift code',desc:'Discounted Individual plan with Hulu or SHOWTIME'}
]},
{id:'yt-premium',n:'YouTube Premium',d:'Ad-free YouTube, background play, offline download, and YouTube Music Premium.',c:'music',em:'\u25B6\uFE0F',pg:'pg-yt',tiers:[
{n:'Individual',p:8,dur:'1 month',fmt:'Code / Setup',desc:'Ad-free videos, background play, offline, YouTube Music included'},
{n:'Family',p:16,dur:'1 month',fmt:'Code / Setup',desc:'Up to 6 family members, all Individual Premium features'},
{n:'Student',p:4,dur:'1 month',fmt:'Code / Setup',desc:'Discounted Individual plan with student verification'}
]},
{id:'apple-music',n:'Apple Music',d:'Apple music streaming. Lossless audio, Spatial Audio with Dolby Atmos, and curated playlists.',c:'music',em:'\uD83C\uDFB6',pg:'pg-apple',tiers:[
{n:'Individual',p:11,dur:'1 month',fmt:'Gift code',desc:'100M+ songs, lossless, Spatial Audio, 1 account'},
{n:'Family',p:17,dur:'1 month',fmt:'Gift code',desc:'Up to 6 family members, individual recommendations'},
{n:'Student',p:6,dur:'1 month',fmt:'Gift code',desc:'Discounted plan with Apple Music student pricing'}
]},
{id:'canva',n:'Canva Pro',d:'Professional design platform. Templates, brand kit, background remover, AI image generation.',c:'work',em:'\uD83C\uDFA8',pg:'pg-canva',tiers:[
{n:'Pro',p:12,dur:'1 month',fmt:'Personal plan',desc:'1 person, 100M+ premium templates, brand kit, BG remover, AI generator'},
{n:'Teams',p:25,dur:'1 month',fmt:'Team plan',desc:'3-5 people, shared brand kit, collaboration tools, admin controls'}
]},
{id:'notion',n:'Notion',d:'All-in-one workspace for notes, docs, wikis, projects, and databases.',c:'work',em:'\uD83D\uDCD3',pg:'pg-notion',tiers:[
{n:'Plus',p:10,dur:'1 month',fmt:'Personal workspace',desc:'Unlimited pages & blocks, 10 guest collaborators, file uploads up to 5GB'},
{n:'Business',p:18,dur:'1 month',fmt:'Team workspace',desc:'SAML SSO, advanced permissions, bulk PDF export, 250 guests'},
{n:'Enterprise',p:30,dur:'1 month',fmt:'Full access',desc:'Audit log, advanced security, dedicated success manager, unlimited API'}
]},
{id:'m365',n:'Microsoft 365',d:'Office suite and cloud storage. Word, Excel, PowerPoint, Outlook, and 1TB OneDrive.',c:'work',em:'\uD83D\uDCBB',pg:'pg-m365',tiers:[
{n:'Personal',p:50,dur:'1 year',fmt:'License key',desc:'1 person, all Office apps, 1TB OneDrive, premium Outlook'},
{n:'Family',p:70,dur:'1 year',fmt:'License key',desc:'Up to 6 people, 6TB total OneDrive, family safety features'}
]},
{id:'steam',n:'Steam',d:'Gift cards for the world largest PC gaming platform.',c:'play',em:'\uD83C\uDFAE',pg:'pg-steam',tiers:[
{n:'$10',p:10,dur:'one-time',fmt:'Gift card',desc:'$10 Steam Wallet credit for games and DLC'},
{n:'$25',p:25,dur:'one-time',fmt:'Gift card',desc:'$25 Steam Wallet credit'},
{n:'$50',p:50,dur:'one-time',fmt:'Gift card',desc:'$50 Steam Wallet credit'}
]},
{id:'psn',n:'PlayStation',d:'Gift cards for PlayStation Store. Games, DLC, and PS Plus subscriptions.',c:'play',em:'\uD83C\uDFC6',pg:'pg-psn',tiers:[
{n:'$10',p:10,dur:'one-time',fmt:'Gift card',desc:'$10 PSN Wallet credit'},
{n:'$25',p:25,dur:'one-time',fmt:'Gift card',desc:'$25 PSN Wallet credit'},
{n:'$50',p:50,dur:'one-time',fmt:'Gift card',desc:'$50 PSN Wallet credit'}
]},
{id:'xbox',n:'Xbox',d:'Xbox Game Pass and gift cards for the Xbox ecosystem.',c:'play',em:'\uD83D\uDC7E',pg:'pg-xbox',tiers:[
{n:'Game Pass Core',p:10,dur:'1 month',fmt:'Code',desc:'Online multiplayer, 25+ games catalog, deals and discounts'},
{n:'Game Pass Standard',p:15,dur:'1 month',fmt:'Code',desc:'Hundreds of games, online multiplayer, day-one releases'},
{n:'Game Pass Ultimate',p:20,dur:'1 month',fmt:'Code',desc:'Standard + EA Play, cloud gaming, PC Game Pass included'}
]}
];
var tg=window.Telegram&&window.Telegram.WebApp;
if(tg){try{tg.ready();tg.expand();if(tg.BackButton)tg.BackButton.hide();}catch(e){}}
var cart=JSON.parse(localStorage.getItem('ms_c6')||'[]');
var orders=JSON.parse(localStorage.getItem('ms_o6')||'[]');
var refCount=parseInt(localStorage.getItem('ms_r6')||'0');
var currentView='home';
var viewHistory=[];
var detailItem=null;
var selectedTier=null;
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
d.innerHTML='<div class="product-img '+it.pg+'"><span class="product-emoji">'+it.em+'</span><span class="product-label">'+it.n+'</span></div><div class="product-bottom"><span class="product-name">'+it.n+'</span><span class="product-price">from $'+it.tiers[0].p+'</span></div>';
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
var h=$('d-hero');h.className='detail-img '+item.pg;
h.innerHTML='<span class="product-emoji">'+item.em+'</span><span class="product-label">'+item.n+'</span>';
showView('detail');
}
function showTiers(){
if(!detailItem)return;
var hero=$('tier-hero');hero.className='detail-img '+detailItem.pg;
hero.innerHTML='<span class="product-emoji">'+detailItem.em+'</span><span class="product-label">'+detailItem.n+'</span>';
var list=$('tier-list');list.innerHTML='<div class="detail-tag" style="margin:0 0 4px">'+detailItem.c.toUpperCase()+'</div><h2 style="margin-bottom:12px">'+detailItem.n+'</h2>';
for(var i=0;i<detailItem.tiers.length;i++){
var t=detailItem.tiers[i];
var d=document.createElement('div');d.className='tier-card';
d.innerHTML='<span class="tier-ic">'+detailItem.em+'</span><div class="tier-info"><strong>'+t.n+'</strong><span>'+t.desc+'</span></div><span class="tier-price">$'+t.p+'</span>';
d.onclick=(function(item,tier){return function(){selectedTier=tier;addToCartTier(item,tier);};})(detailItem,t);
list.appendChild(d);
}
showView('tier');
}
function updateBadge(){var c=cart.length;var b=$('nav-badge');if(b){b.textContent=c;if(c>0)b.classList.remove('hidden');else b.classList.add('hidden');}}
function saveCart(){localStorage.setItem('ms_c6',JSON.stringify(cart));updateBadge();}
function saveOrders(){localStorage.setItem('ms_o6',JSON.stringify(orders));}
function addToCart(){showTiers();}
function addToCartTier(item,tier){
cart.push({id:item.id+'-'+tier.n,n:item.n+' '+tier.n,price:tier.p,dur:tier.dur,fmt:tier.fmt,em:item.em,pg:item.pg});
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
d.innerHTML='<div class="cart-item-img '+(it.pg||'pg-chatgpt')+'">'+(it.em||'*')+'</div><div class="cart-item-info"><h4>'+it.n+'</h4><p>'+it.dur+' / '+it.fmt+'</p></div><div class="cart-item-right"><span class="cart-item-price">$'+it.price+'</span><button class="cart-item-del" data-idx="'+i+'">&#10005;</button></div>';
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
$('p-refs').textContent=refCount;
$('p-ref-e').textContent='$'+(refCount*2);
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