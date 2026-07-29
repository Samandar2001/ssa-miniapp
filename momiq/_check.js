
"use strict";
/* =========================================================================
   Momiq — o'zbekcha gapiradigan qo'zichoq. Claude Design "Qo'zichoq O'yini"
   dizayni asosida (option 1a — to'liq prototip) vanilla JS'da amalga oshirildi.
   ========================================================================= */

/* ---------- Momiq personaji (sof CSS/HTML) ---------- */
function Momiq(p){
  p = p || {};
  var mood = p.mood || 'xursand';
  var anims = {
    xursand:'momiq-nafas 3.4s ease-in-out infinite',
    kulgan:'momiq-kulish .5s ease-in-out infinite',
    xafa:'momiq-xafa 2.2s ease-in-out infinite',
    uyquda:'momiq-uyqu 4.2s ease-in-out infinite',
    sakra:'momiq-sakrash .75s ease-out infinite',
    ovqat:'momiq-titrash .35s ease-in-out infinite',
    yuvinish:'momiq-titrash .5s ease-in-out infinite'
  };
  var shut = mood === 'uyquda' || mood === 'kulgan';
  var hide = 'display:none';
  var scale = p.scale;
  var moodAnim = anims[mood] || anims.xursand;
  var scaleStyle = scale ? ('transform:scale(' + scale + ')') : '';
  var hatStyle = p.hat ? '' : hide;
  var choponStyle = p.chopon ? '' : hide;
  var scarfStyle = p.scarf ? '' : hide;
  var glassesStyle = p.glasses ? '' : hide;
  var eyesOpenStyle = shut ? hide : '';
  var eyesShutStyle = shut ? '' : hide;
  var mouthOpenStyle = (mood === 'kulgan' || mood === 'ovqat') ? '' : hide;
  var mouthSmileStyle = (mood === 'kulgan' || mood === 'ovqat') ? hide : (mood === 'xafa' ? 'border-radius:50% 50% 0 0;border-bottom:none;border-top:3px solid #8A6A55;top:20px' : '');
  var zzzStyle = mood === 'uyquda' ? '' : hide;
  var bubbleStyle = p.bubbles ? '' : hide;
  var heartStyle = p.hearts ? '' : hide;
  return '<div style="position:relative;width:230px;height:250px;transform-origin:50% 92%;' + scaleStyle + '">'
    + '<div style="position:absolute;left:50%;bottom:2px;transform:translateX(-50%);width:170px;height:22px;border-radius:50%;background:rgba(59,42,30,.16);filter:blur(5px)"></div>'
    + '<div style="position:absolute;inset:0;transform-origin:50% 92%;animation:' + moodAnim + '">'
      + '<div style="position:absolute;left:38px;bottom:16px;width:18px;height:48px;border-radius:9px;background:linear-gradient(90deg,#EFE0CE,#E3D0B9)"></div>'
      + '<div style="position:absolute;left:37px;bottom:10px;width:20px;height:14px;border-radius:6px 6px 9px 9px;background:#5C4436"></div>'
      + '<div style="position:absolute;right:38px;bottom:16px;width:18px;height:48px;border-radius:9px;background:linear-gradient(90deg,#E3D0B9,#EFE0CE)"></div>'
      + '<div style="position:absolute;right:37px;bottom:10px;width:20px;height:14px;border-radius:6px 6px 9px 9px;background:#5C4436"></div>'
      + '<div style="position:absolute;right:6px;bottom:96px;width:30px;height:30px;border-radius:50%;background:#fff;box-shadow:12px -10px 0 -8px #fff,6px 8px 0 -8px #fff,0 0 12px rgba(93,71,52,.1)"></div>'
      + '<div style="position:absolute;left:50%;bottom:52px;transform:translateX(-50%);width:132px;height:108px;border-radius:52% 52% 46% 46%;background:radial-gradient(120% 130% at 32% 22%,#ffffff 0%,#FBF4EA 58%,#EFE3D4 100%);box-shadow:0 8px 16px rgba(93,71,52,.12),inset 0 -12px 16px rgba(93,71,52,.07)"></div>'
      + '<div style="position:absolute;left:50%;bottom:44px;transform:translateX(-50%);width:196px;height:120px">'
        + '<div style="position:absolute;left:4px;top:34px;width:52px;height:52px;border-radius:50%;background:#FDF7EE;box-shadow:inset -4px -4px 8px rgba(93,71,52,.07)"></div>'
        + '<div style="position:absolute;right:4px;top:34px;width:52px;height:52px;border-radius:50%;background:#FDF7EE;box-shadow:inset 4px -4px 8px rgba(93,71,52,.07)"></div>'
        + '<div style="position:absolute;left:20px;top:6px;width:46px;height:46px;border-radius:50%;background:#FFFCF7"></div>'
        + '<div style="position:absolute;right:20px;top:6px;width:46px;height:46px;border-radius:50%;background:#FFFCF7"></div>'
        + '<div style="position:absolute;left:16px;bottom:2px;width:44px;height:40px;border-radius:50%;background:#FBF3E8"></div>'
        + '<div style="position:absolute;right:16px;bottom:2px;width:44px;height:40px;border-radius:50%;background:#FBF3E8"></div>'
      + '</div>'
      + '<div style="position:absolute;left:50%;bottom:58px;transform:translateX(-50%);width:126px;height:92px;border-radius:46% 46% 44% 44%;overflow:hidden;box-shadow:0 4px 10px rgba(59,42,30,.16);' + choponStyle + '">'
        + '<div style="position:absolute;inset:0;background:repeating-linear-gradient(96deg,#1E7A8C 0 11px,#F5EDDD 11px 15px,#C8452F 15px 26px,#E9A62B 26px 31px)"></div>'
        + '<div style="position:absolute;left:0;right:0;bottom:0;height:9px;background:#12303B"></div>'
      + '</div>'
      + '<div style="position:absolute;left:50%;bottom:124px;transform:translateX(-50%);width:172px;height:132px">'
        + '<div style="--q:-28deg;position:absolute;left:-14px;top:48px;width:64px;height:36px;border-radius:64% 36% 50% 50%;background:linear-gradient(160deg,#F5E8D9,#DFC9B2);box-shadow:inset 6px 6px 10px rgba(214,164,160,.35);transform:rotate(-28deg);animation:momiq-quloq 3.4s ease-in-out infinite"></div>'
        + '<div style="--q:28deg;position:absolute;right:-14px;top:48px;width:64px;height:36px;border-radius:36% 64% 50% 50%;background:linear-gradient(200deg,#F5E8D9,#DFC9B2);box-shadow:inset -6px 6px 10px rgba(214,164,160,.35);transform:rotate(28deg);animation:momiq-quloq 3.4s ease-in-out .4s infinite"></div>'
        + '<div style="position:absolute;left:50%;top:14px;transform:translateX(-50%);width:112px;height:106px;border-radius:50% 50% 48% 48%;background:radial-gradient(120% 120% at 34% 20%,#FFFDF9,#F6EADB 62%,#E9D9C6 100%);box-shadow:0 6px 14px rgba(93,71,52,.14)"></div>'
        + '<div style="position:absolute;left:50%;top:2px;transform:translateX(-50%);width:104px;height:34px;border-radius:50%;background:#fff;box-shadow:-30px 10px 0 -8px #fff,30px 10px 0 -8px #fff,-14px -4px 0 -6px #fff,14px -4px 0 -6px #fff"></div>'
        + '<div style="position:absolute;left:50%;top:-2px;transform:translateX(-50%);width:92px;height:44px;' + hatStyle + '">'
          + '<div style="position:absolute;inset:0;border-radius:50% 50% 8px 8px;background:linear-gradient(180deg,#17414F,#0E2B35);box-shadow:0 4px 8px rgba(0,0,0,.18)"></div>'
          + '<div style="position:absolute;left:0;right:0;bottom:0;height:11px;border-radius:3px;background:#0B222A;box-shadow:inset 0 2px 0 rgba(255,255,255,.18)"></div>'
          + '<div style="position:absolute;left:18px;top:16px;width:9px;height:15px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#F3EADA;transform:rotate(-18deg)"></div>'
          + '<div style="position:absolute;left:44px;top:11px;width:9px;height:15px;border-radius:50%/60% 60% 40% 40%;background:#F3EADA"></div>'
          + '<div style="position:absolute;right:18px;top:16px;width:9px;height:15px;border-radius:50%/60% 60% 40% 40%;background:#F3EADA;transform:rotate(18deg)"></div>'
        + '</div>'
        + '<div style="position:absolute;left:50%;top:52px;transform:translateX(-50%);width:88px;height:34px;' + eyesOpenStyle + '">'
          + '<div style="position:absolute;left:6px;top:0;width:26px;height:30px;border-radius:50%;background:#2E2320;animation:momiq-koz 4.8s ease-in-out infinite">'
            + '<div style="position:absolute;left:6px;top:5px;width:9px;height:9px;border-radius:50%;background:#fff;opacity:.92"></div>'
            + '<div style="position:absolute;right:5px;bottom:6px;width:5px;height:5px;border-radius:50%;background:#fff;opacity:.6"></div>'
          + '</div>'
          + '<div style="position:absolute;right:6px;top:0;width:26px;height:30px;border-radius:50%;background:#2E2320;animation:momiq-koz 4.8s ease-in-out infinite">'
            + '<div style="position:absolute;left:6px;top:5px;width:9px;height:9px;border-radius:50%;background:#fff;opacity:.92"></div>'
            + '<div style="position:absolute;right:5px;bottom:6px;width:5px;height:5px;border-radius:50%;background:#fff;opacity:.6"></div>'
          + '</div>'
        + '</div>'
        + '<div style="position:absolute;left:50%;top:60px;transform:translateX(-50%);width:88px;height:18px;' + eyesShutStyle + '">'
          + '<div style="position:absolute;left:6px;top:0;width:26px;height:13px;border-bottom:4px solid #2E2320;border-radius:0 0 50% 50%"></div>'
          + '<div style="position:absolute;right:6px;top:0;width:26px;height:13px;border-bottom:4px solid #2E2320;border-radius:0 0 50% 50%"></div>'
        + '</div>'
        + '<div style="position:absolute;left:50%;top:48px;transform:translateX(-50%);width:104px;height:40px;' + glassesStyle + '">'
          + '<div style="position:absolute;left:2px;top:2px;width:38px;height:34px;border-radius:50%;border:4px solid #12303B;background:rgba(255,255,255,.32)"></div>'
          + '<div style="position:absolute;right:2px;top:2px;width:38px;height:34px;border-radius:50%;border:4px solid #12303B;background:rgba(255,255,255,.32)"></div>'
          + '<div style="position:absolute;left:44px;top:16px;width:16px;height:4px;background:#12303B"></div>'
        + '</div>'
        + '<div style="position:absolute;left:8px;top:76px;width:20px;height:12px;border-radius:50%;background:#F0A9A4;opacity:.55;filter:blur(1px)"></div>'
        + '<div style="position:absolute;right:8px;top:76px;width:20px;height:12px;border-radius:50%;background:#F0A9A4;opacity:.55;filter:blur(1px)"></div>'
        + '<div style="position:absolute;left:50%;top:80px;transform:translateX(-50%);width:52px;height:34px;border-radius:50% 50% 46% 46%;background:radial-gradient(100% 100% at 50% 20%,#FFF8EE,#F3E3D0)">'
          + '<div style="position:absolute;left:50%;top:5px;transform:translateX(-50%);width:18px;height:12px;border-radius:50% 50% 60% 60%;background:#DE9A9C"></div>'
          + '<div style="position:absolute;left:50%;top:16px;transform:translateX(-50%);width:26px;height:12px;border-bottom:3px solid #8A6A55;border-radius:0 0 50% 50%;' + mouthSmileStyle + '"></div>'
          + '<div style="position:absolute;left:50%;top:18px;transform:translateX(-50%);width:24px;height:20px;border-radius:0 0 60% 60%;background:#8A5348;' + mouthOpenStyle + '">'
            + '<div style="position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:14px;height:8px;border-radius:50% 50% 0 0;background:#E8908F"></div>'
          + '</div>'
        + '</div>'
      + '</div>'
      + '<div style="position:absolute;left:50%;top:118px;transform:translateX(-50%);width:150px;height:26px;' + scarfStyle + '">'
        + '<div style="position:absolute;left:22px;right:22px;top:0;height:20px;border-radius:12px;background:repeating-linear-gradient(90deg,#C8452F 0 12px,#E9A62B 12px 20px)"></div>'
        + '<div style="position:absolute;left:50%;top:12px;width:18px;height:34px;border-radius:6px;background:#C8452F;transform:rotate(9deg)"></div>'
      + '</div>'
    + '</div>'
    + '<div style="position:absolute;right:2px;top:-6px;width:60px;height:70px;' + zzzStyle + '">'
      + '<div style="position:absolute;left:0;top:44px;font:700 15px/1 \'Baloo 2\',system-ui;color:#1E7A8C;animation:momiq-zzz 3s ease-out infinite">z</div>'
      + '<div style="position:absolute;left:8px;top:34px;font:700 20px/1 \'Baloo 2\',system-ui;color:#1E7A8C;animation:momiq-zzz 3s ease-out .9s infinite">z</div>'
      + '<div style="position:absolute;left:16px;top:22px;font:700 26px/1 \'Baloo 2\',system-ui;color:#1E7A8C;animation:momiq-zzz 3s ease-out 1.8s infinite">z</div>'
    + '</div>'
    + '<div style="position:absolute;inset:0;pointer-events:none;' + bubbleStyle + '">'
      + '<div style="position:absolute;left:34px;bottom:70px;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.75);box-shadow:inset -3px -3px 0 rgba(30,122,140,.25);animation:momiq-kopik 2.2s ease-out infinite"></div>'
      + '<div style="position:absolute;left:96px;bottom:60px;width:18px;height:18px;border-radius:50%;background:rgba(255,255,255,.8);box-shadow:inset -2px -2px 0 rgba(30,122,140,.25);animation:momiq-kopik 2.2s ease-out .5s infinite"></div>'
      + '<div style="position:absolute;right:40px;bottom:78px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.7);box-shadow:inset -4px -4px 0 rgba(30,122,140,.22);animation:momiq-kopik 2.4s ease-out 1s infinite"></div>'
      + '<div style="position:absolute;right:96px;bottom:56px;width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,.85);animation:momiq-kopik 2s ease-out 1.5s infinite"></div>'
    + '</div>'
    + '<div style="position:absolute;inset:0;pointer-events:none;' + heartStyle + '">'
      + '<div style="position:absolute;left:48px;top:20px;width:16px;height:16px;background:#E4655C;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:8px 0 0 -1px #E4655C;animation:momiq-yurak 1.8s ease-out infinite"></div>'
      + '<div style="position:absolute;right:44px;top:8px;width:12px;height:12px;background:#EE8A82;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:6px 0 0 -1px #EE8A82;animation:momiq-yurak 1.8s ease-out .7s infinite"></div>'
    + '</div>'
  + '</div>';
}

/* ---------- Handler registri (onClick uchun) ---------- */
var H = [];
function on(fn){ H.push(fn); return 'data-a="' + (H.length - 1) + '"'; }

/* ---------- O'yin holati va mantiqi ---------- */
var G = {
  state: {
    screen:'menu', coins:248, hunger:72, joy:84, energy:58, clean:66,
    mood:'xursand', msg:"Salom, do'stim! Meni erkalab qo'y.",
    bubbles:false, hearts:false, tickles:0,
    wear:{dopi:true,chopon:false,sharf:false,kozoynak:false},
    owned:{dopi:true,chopon:false,sharf:false,kozoynak:false},
    gActive:false, gOver:false, gScore:0, gTime:20, gItems:[],
    sound:true, music:true, titrash:true, nazorat:false,
    bath:false, dirt:[], giftTaken:false, kun:3,
    nom:'Momiq', nomSet:false, xp:30, daraja:2, levelUp:false,
    harfIndex:0, organgan:[], son:3, sanoqVariant:[2,3,5], target:'Qizil', natija:'',
    inglizIndex:0, fanlar:{matem:45,ingliz:20,tabiiy:35,savod:60},
    hisob:{erkalash:0,ovqat:0,yuvish:0,oyin:0}, olingan:[],
    mCards:[], mOpen:[], mMatched:[], mMoves:0, mBusy:false
  },

  setState:function(u, silent){
    var patch = (typeof u === 'function') ? u(this.state) : u;
    for(var k in patch){ this.state[k] = patch[k]; }
    save();
    if(!silent) update();
  },

  addFan:function(key, n){
    this.setState(function(s){
      var fanlar = Object.assign({}, s.fanlar);
      fanlar[key] = Math.min(100, (fanlar[key] || 0) + n);
      return { fanlar: fanlar };
    });
  },
  addXp:function(n, tur){
    this.setState(function(s){
      var xp = s.xp + n, daraja = s.daraja, levelUp = s.levelUp, coins = s.coins;
      if(xp >= 100){ xp -= 100; daraja += 1; levelUp = true; coins += 20; }
      var hisob = Object.assign({}, s.hisob);
      if(tur) hisob[tur] = (hisob[tur] || 0) + 1;
      return { xp:xp, daraja:daraja, levelUp:levelUp, coins:coins, hisob:hisob };
    });
    clearTimeout(this._lvl);
    var self = this;
    this._lvl = setTimeout(function(){ self.setState({ levelUp:false }); }, 2600);
  },

  react:function(mood, msg, ms){
    clearTimeout(this._reset);
    this.setState({ mood:mood, msg:msg });
    var self = this;
    if(ms) this._reset = setTimeout(function(){ self.setState({ mood:'xursand', hearts:false, bubbles:false }); }, ms);
  },
  bump:function(key, amount){
    this.setState(function(s){
      var o = {}; o[key] = Math.max(0, Math.min(100, s[key] + amount)); return o;
    });
  },

  startBath:function(){
    var spots = [
      { id:'d1', left:'31%', top:'62%' }, { id:'d2', left:'56%', top:'67%' },
      { id:'d3', left:'43%', top:'74%' }, { id:'d4', left:'62%', top:'57%' }
    ];
    clearTimeout(this._resetBath);
    this.setState({ bath:true, dirt:spots, bubbles:true, mood:'yuvinish', msg:'Kirlarni bosib tozalang!' });
  },
  rubDirt:function(id){
    var self = this;
    return function(){
      self.setState(function(s){
        var dirt = s.dirt.filter(function(d){ return d.id !== id; });
        var done = dirt.length === 0;
        if(done){
          clearTimeout(self._resetBath);
          self._resetBath = setTimeout(function(){ self.setState({ bath:false, bubbles:false, mood:'xursand', msg:'Junim oppoq boʻldi! Rahmat.' }); }, 1400);
        }
        return {
          dirt:dirt, clean:Math.min(100, s.clean + 9), coins:s.coins + 1, xp:s.xp + 4,
          hisob:Object.assign({}, s.hisob, { yuvish:(s.hisob.yuvish || 0) + 1 }),
          mood: done ? 'kulgan' : 'yuvinish',
          msg: done ? 'Voy, yaltirayapman!' : 'Yana ozgina qoldi...'
        };
      });
    };
  },

  harflar:[
    { h:'A', s:'Anor', r:'#C8452F' }, { h:'B', s:'Baliq', r:'#1E7A8C' },
    { h:'D', s:"Do'ppi", r:'#12303B' }, { h:'G', s:'Gul', r:'#E4655C' },
    { h:'I', s:'It', r:'#8A5A3C' }, { h:'K', s:'Kitob', r:'#7FA650' },
    { h:'L', s:'Lola', r:'#C8452F' }, { h:'N', s:'Non', r:'#E9A62B' },
    { h:'O', s:'Olma', r:'#B23F2E' }, { h:'Q', s:"Qo'zichoq", r:'#12303B' },
    { h:'S', s:'Somsa', r:'#C98A3C' }, { h:'U', s:'Uzum', r:'#6B4A7A' }
  ],
  inglizSozlar:[
    { en:'Sheep', uz:"Qo'zichoq" }, { en:'Apple', uz:'Olma' },
    { en:'Bread', uz:'Non' }, { en:'Milk', uz:'Sut' },
    { en:'Cat', uz:'Mushuk' }, { en:'Sun', uz:'Quyosh' },
    { en:'Water', uz:'Suv' }, { en:'Book', uz:'Kitob' }
  ],
  ranglar:[
    { nom:'Qizil', kod:'#C8452F' }, { nom:"Ko'k", kod:'#1E7A8C' },
    { nom:'Yashil', kod:'#7FA650' }, { nom:'Sariq', kod:'#E9A62B' }
  ],

  pickWord:function(i){
    var self = this;
    return function(){
      var w = self.inglizSozlar[i];
      self.setState({ inglizIndex:i, msg:w.en + ' — ' + w.uz, mood:'kulgan' });
      self.addXp(3); self.addFan('ingliz', 5);
      clearTimeout(self._reset);
      self._reset = setTimeout(function(){ self.setState({ mood:'xursand' }); }, 1300);
    };
  },
  pickLetter:function(i){
    var self = this;
    return function(){
      var l = self.harflar[i];
      self.setState(function(s){
        return {
          harfIndex:i, msg:l.h + ' harfi — ' + l.s,
          organgan: s.organgan.indexOf(l.h) > -1 ? s.organgan : s.organgan.concat([l.h]),
          mood:'kulgan'
        };
      });
      self.addXp(3); self.addFan('savod', 5);
      clearTimeout(self._reset);
      self._reset = setTimeout(function(){ self.setState({ mood:'xursand' }); }, 1300);
    };
  },

  newCount:function(){
    var son = 1 + Math.floor(Math.random() * 5);
    var set = {}; set[son] = true;
    while(Object.keys(set).length < 3) set[1 + Math.floor(Math.random() * 5)] = true;
    var variant = Object.keys(set).map(Number).sort(function(){ return Math.random() - 0.5; });
    this.setState({ screen:'sanoq', son:son, sanoqVariant:variant, natija:'' });
  },
  answerCount:function(n){
    var self = this;
    return function(){
      if(n === self.state.son){
        self.setState(function(s){ return { natija:"To'g'ri!", coins:s.coins + 2, mood:'kulgan', msg:n + ' ta! Barakalla!' }; });
        self.addXp(5); self.addFan('matem', 7);
        setTimeout(function(){ self.newCount(); }, 1100);
      } else {
        self.setState({ natija:'Yana sanab koʻring', mood:'xafa' });
        setTimeout(function(){ self.setState({ mood:'xursand', natija:'' }); }, 1100);
      }
    };
  },

  newColor:function(){
    var t = this.ranglar[Math.floor(Math.random() * this.ranglar.length)];
    this.setState({ screen:'rang', target:t.nom, natija:'' });
  },
  answerColor:function(nom){
    var self = this;
    return function(){
      if(nom === self.state.target){
        self.setState(function(s){ return { natija:"To'g'ri!", coins:s.coins + 2, mood:'kulgan', msg:self.state.target + ' rang topildi!' }; });
        self.addXp(5); self.addFan('tabiiy', 7);
        setTimeout(function(){ self.newColor(); }, 1100);
      } else {
        self.setState({ natija:'Bu boshqa rang', mood:'xafa' });
        setTimeout(function(){ self.setState({ mood:'xursand', natija:'' }); }, 1100);
      }
    };
  },

  startMemory:function(){
    var juft = [
      { harf:"O'", rang:'#7FA650' }, { harf:'N', rang:'#C8452F' },
      { harf:'S', rang:'#1E7A8C' }, { harf:'D', rang:'#E9A62B' }
    ];
    var cards = juft.concat(juft).map(function(c, i){ return Object.assign({}, c, { id:'c' + i, k:c.harf }); })
      .sort(function(){ return Math.random() - 0.5; });
    this.setState(function(s){ return { screen:'xotira', mCards:cards, mOpen:[], mMatched:[], mMoves:0, mBusy:false,
      hisob:Object.assign({}, s.hisob, { oyin:(s.hisob.oyin || 0) + 1 }) }; });
  },
  flip:function(card){
    var self = this;
    return function(){
      var s = self.state;
      if(s.mBusy || s.mOpen.indexOf(card.id) > -1 || s.mMatched.indexOf(card.k) > -1) return;
      var open = s.mOpen.concat([card.id]);
      if(open.length < 2){ self.setState({ mOpen:open }); return; }
      var first = s.mCards.filter(function(c){ return c.id === open[0]; })[0];
      var moves = s.mMoves + 1;
      if(first && first.k === card.k){
        var matched = s.mMatched.concat([card.k]);
        var win = matched.length === 4;
        self.setState({
          mOpen:[], mMatched:matched, mMoves:moves,
          coins:s.coins + 5 + (win ? 15 : 0), joy:win ? Math.min(100, s.joy + 10) : s.joy,
          mood:'kulgan', msg: win ? 'Hammasini topdik! Zoʻr!' : 'Juftini topdik!'
        });
      } else {
        self.setState({ mOpen:open, mMoves:moves, mBusy:true });
        setTimeout(function(){ self.setState({ mOpen:[], mBusy:false }); }, 750);
      }
    };
  },

  startGame:function(){
    var self = this;
    clearInterval(this._tick); clearInterval(this._spawn);
    this.setState(function(s){ return { gActive:true, gOver:false, gScore:0, gTime:20, gItems:[], screen:'oyin',
      hisob:Object.assign({}, s.hisob, { oyin:(s.hisob.oyin || 0) + 1 }) }; });
    this._tick = setInterval(function(){
      self.setState(function(s){
        if(s.gTime <= 1){
          clearInterval(self._tick); clearInterval(self._spawn);
          return { gTime:0, gActive:false, gOver:true, gItems:[], coins:s.coins + s.gScore * 2, joy:Math.min(100, s.joy + 12) };
        }
        return { gTime:s.gTime - 1 };
      });
    }, 1000);
    this._spawn = setInterval(function(){
      var kinds = [
        { harf:'O', rang:'#C8452F' }, { harf:'S', rang:'#E9A62B' },
        { harf:"O'", rang:'#7FA650' }, { harf:'U', rang:'#1E7A8C' }
      ];
      var k = kinds[Math.floor(Math.random() * kinds.length)];
      var id = 'i' + Date.now() + Math.round(Math.random() * 1e6);
      var dur = (2.4 + Math.random() * 1.4).toFixed(2) + 's';
      var left = Math.round(6 + Math.random() * 74);
      self.setState(function(s){ return { gItems:s.gItems.concat([{ id:id, left:left, dur:dur, harf:k.harf, rang:k.rang }]) }; });
      setTimeout(function(){ self.setState(function(s){ return { gItems:s.gItems.filter(function(x){ return x.id !== id; }) }; }); }, 4200);
    }, 750);
  },
  stopGame:function(){ clearInterval(this._tick); clearInterval(this._spawn); },
  tapItem:function(id){
    this.setState(function(s){ return { gItems:s.gItems.filter(function(x){ return x.id !== id; }), gScore:s.gScore + 1 }; });
  },

  mount:function(){
    var self = this;
    this._decay = setInterval(function(){
      var onFeed = self.state.screen === 'oshxona' || self.state.screen === 'home';
      self.setState(function(s){
        return {
          hunger:Math.max(0, s.hunger - 1),
          joy:Math.max(0, s.joy - 1),
          energy: s.mood === 'uyquda' ? Math.min(100, s.energy + 4) : Math.max(0, s.energy - 1),
          clean:Math.max(0, s.clean - 1)
        };
      }, !onFeed);
    }, 7000);
  },

  /* ---- render uchun qiymatlar (dizayndagi renderVals) ---- */
  renderVals:function(){
    var s = this.state;
    var self = this;
    var go = function(scr){ return function(){ self.setState({ screen:scr }); }; };
    var pct = function(v){ return v + '%'; };

    var foods = [
      { key:'non', nom:'Issiq non', izoh:'Tandirdan yangi uzilgan', harf:'N', rang:'#C8452F', quvvat:18 },
      { key:'ot', nom:"Yaydab o't", izoh:"Tog' yonbag'ridan", harf:"O'", rang:'#7FA650', quvvat:12 },
      { key:'sut', nom:'Iliq sut', izoh:'Katta kosada', harf:'S', rang:'#1E7A8C', quvvat:22 }
    ].map(function(f){ return Object.assign({}, f, {
      tap:function(){
        self.bump('hunger', f.quvvat); self.bump('joy', 4); self.addXp(8, 'ovqat');
        self.react('ovqat', f.nom + ' juda mazza! Rahmat!', 1800);
      }
    }); });

    var kiyimlar = [
      { key:'dopi', nom:"Do'ppi", rang:'linear-gradient(160deg,#17414F,#0E2B35)' },
      { key:'chopon', nom:'Chopon', rang:'repeating-linear-gradient(96deg,#1E7A8C 0 10px,#F5EDDD 10px 14px,#C8452F 14px 24px,#E9A62B 24px 29px)' },
      { key:'sharf', nom:'Belbogʻ', rang:'repeating-linear-gradient(90deg,#C8452F 0 12px,#E9A62B 12px 20px)' },
      { key:'kozoynak', nom:"Ko'zoynak", rang:'linear-gradient(90deg,#12303B 0 30%,rgba(30,122,140,.35) 30% 70%,#12303B 70%)' }
    ];
    var clothes = kiyimlar.map(function(k){
      var owned = s.owned[k.key], onw = s.wear[k.key];
      return Object.assign({}, k, {
        holat: owned ? (onw ? 'Kiyilgan' : 'Yechilgan') : 'Qulflangan',
        holatRang: owned ? (onw ? '#7FA650' : 'rgba(18,48,59,.45)') : '#C8452F',
        bg: onw ? '#FFF8EA' : '#F6F0E2',
        border: onw ? '#7FA650' : 'rgba(18,48,59,.1)',
        tap:function(){
          if(!owned){ self.setState({ screen:'dokon' }); return; }
          self.setState(function(st){
            var w = Object.assign({}, st.wear); w[k.key] = !w[k.key];
            return { wear:w, hearts:true, mood:'kulgan', msg:w[k.key] ? 'Menga juda mos keldi!' : 'Yengil boʻldi, rahmat!' };
          });
          clearTimeout(self._reset);
          self._reset = setTimeout(function(){ self.setState({ mood:'xursand', hearts:false }); }, 1600);
        }
      });
    });

    var shop = [
      { key:'chopon', nom:'Adras chopon', izoh:'Sovuq kunlar uchun', narx:60, rang:'repeating-linear-gradient(96deg,#1E7A8C 0 10px,#F5EDDD 10px 14px,#C8452F 14px 24px,#E9A62B 24px 29px)' },
      { key:'sharf', nom:'Qizil belbogʻ', izoh:'Bayramona koʻrinish', narx:40, rang:'repeating-linear-gradient(90deg,#C8452F 0 12px,#E9A62B 12px 20px)' },
      { key:'kozoynak', nom:"Quyoshdan ko'zoynak", izoh:'Yozgi kunlar uchun', narx:55, rang:'linear-gradient(90deg,#12303B 0 30%,rgba(30,122,140,.35) 30% 70%,#12303B 70%)' },
      { key:'gilam', nom:'Yangi gilam', izoh:'Hovlini indigo qiladi', narx:120, rang:'#1E7A8C' }
    ].map(function(it){
      var owned = s.owned[it.key];
      var afford = s.coins >= it.narx;
      return Object.assign({}, it, {
        btn: owned ? 'Olingan' : it.narx + ' tanga',
        btnBg: owned ? 'rgba(127,166,80,.18)' : (afford ? '#E9A62B' : 'rgba(18,48,59,.1)'),
        btnRang: owned ? '#4C6A2C' : (afford ? '#3B2A1E' : 'rgba(18,48,59,.4)'),
        tap:function(){
          if(owned || !afford) return;
          self.setState(function(st){
            var o = Object.assign({}, st.owned), w = Object.assign({}, st.wear);
            o[it.key] = true; if(it.key in w) w[it.key] = true;
            return { owned:o, wear:w, coins:st.coins - it.narx, msg:it.nom + ' menga juda yoqdi!' };
          });
        }
      });
    });

    var tog = function(key, nom, izoh){ return {
      nom:nom, izoh:izoh, tap:function(){ self.setState(function(st){ var o = {}; o[key] = !st[key]; return o; }); },
      trackBg: s[key] ? '#7FA650' : 'rgba(18,48,59,.2)',
      knob: s[key] ? 'translateX(22px)' : 'translateX(0)'
    }; };

    return {
      isMenu: s.screen === 'menu', isHome: s.screen === 'home', isKitchen: s.screen === 'oshxona',
      isWardrobe: s.screen === 'garderob', isGame: s.screen === 'oyin', isShop: s.screen === 'dokon',
      isSettings: s.screen === 'sozlamalar', isHub: s.screen === 'oyinlar', isMemory: s.screen === 'xotira',
      isNight: s.mood === 'uyquda' && !s.bath, isBath: s.bath,
      kun: s.kun, dirt: s.dirt.map(function(d){ return Object.assign({}, d, { tap:self.rubDirt(d.id) }); }),
      dirtLeft: s.dirt.length,
      giftText: s.giftTaken ? 'Bugungi sovgʻa olindi' : 'Kunlik sovgʻa: 30 tanga',
      giftBg: s.giftTaken ? 'rgba(18,48,59,.08)' : '#E9A62B',
      giftRang: s.giftTaken ? 'rgba(18,48,59,.45)' : '#3B2A1E',
      takeGift:function(){ if(!s.giftTaken) self.setState({ giftTaken:true, coins:s.coins + 30, msg:'Sovgʻa uchun rahmat!' }); },
      startBath:function(){ self.startBath(); }, startMemory:function(){ self.startMemory(); },
      goHub: go('oyinlar'),
      moves: s.mMoves, matchedCount: s.mMatched.length,
      memCards: s.mCards.map(function(c){
        var open = s.mOpen.indexOf(c.id) > -1 || s.mMatched.indexOf(c.k) > -1;
        return Object.assign({}, c, {
          tap:self.flip(c),
          yuzBg: open ? c.rang : '#12303B',
          harfOchiq: open ? c.harf : '',
          naqsh: open ? 'none' : 'repeating-conic-gradient(from 45deg at 50% 50%,rgba(233,166,43,.22) 0 25%,transparent 0 50%) 0 0/16px 16px',
          poz: open ? 'scale(1.06)' : 'scale(1)'
        });
      }),
      coins: s.coins, msg: s.msg, mood: s.mood, bubbles: s.bubbles, hearts: s.hearts,
      wearHat: s.wear.dopi, wearChopon: s.wear.chopon, wearScarf: s.wear.sharf,
      hungerW: pct(s.hunger), joyW: pct(s.joy), energyW: pct(s.energy), cleanW: pct(s.clean),
      hungerText: s.hunger > 70 ? "to'q" : s.hunger > 35 ? 'bir oz och' : 'juda och',
      foods: foods, clothes: clothes, shopItems: shop,
      toggles:[
        tog('sound', 'Ovoz effektlari', "Ma'rash, kulgi, qadam tovushi"),
        tog('music', 'Musiqa', "Yumshoq o'zbek kuyi"),
        tog('titrash', 'Titrash', 'Tegilganda telefon titraydi'),
        tog('nazorat', 'Vaqt cheklovi', 'Kuniga 20 daqiqa')
      ],
      score: s.gScore, timeLeft: s.gTime,
      items: s.gItems.map(function(it){ return Object.assign({}, it, { tap:function(){ self.tapItem(it.id); } }); }),
      gameIdle: !s.gActive, gameMood: s.gActive ? 'sakra' : 'xursand',
      gameTitle: s.gOver ? 'Zoʻr! ' + s.gScore + ' ta tutdik' : 'Olma tut!',
      gameBtn: s.gOver ? 'Yana oʻynash' : 'Boshlash',
      startGame:function(){ self.startGame(); },
      nom: s.nom, daraja: s.daraja, xpW: pct(s.xp), levelUp: s.levelUp, kunText: 'Bugun ' + s.kun + '-kun',
      nameOptions: ['Momiq', 'Oqquloq', "Bo'ljon", 'Jonivor'].map(function(n){ return {
        nom:n, tap:function(){ self.setState({ nom:n }); },
        bg: s.nom === n ? '#C8452F' : '#FFF8EA', rang: s.nom === n ? '#FFF6E6' : '#12303B',
        border: s.nom === n ? '#C8452F' : 'rgba(18,48,59,.14)'
      }; }),
      confirmName:function(){ self.setState({ nomSet:true, screen:'home', msg:'Mening ismim ' + s.nom + '. Kel, oʻynaymiz!' }); },
      goAch: go('yutuqlar'), isAch: s.screen === 'yutuqlar', isName: s.screen === 'ism',
      isIngliz: s.screen === 'ingliz', goIngliz: go('ingliz'),
      inglizKartalar: self.inglizSozlar.map(function(w, i){ return Object.assign({}, w, {
        tap:self.pickWord(i),
        bg: s.inglizIndex === i ? '#1E7A8C' : '#FFF8EA',
        rang: s.inglizIndex === i ? '#FFF6E6' : '#12303B'
      }); }),
      joriyEn: self.inglizSozlar[s.inglizIndex].en, joriyUz: self.inglizSozlar[s.inglizIndex].uz,
      fanlar:[
        { key:'matem', nom:'Matem', rang:'#C8452F' },
        { key:'ingliz', nom:'Ingliz', rang:'#1E7A8C' },
        { key:'tabiiy', nom:'Tabiiy', rang:'#7FA650' },
        { key:'savod', nom:'Savod', rang:'#E9A62B' }
      ].map(function(fn){
        var v = s.fanlar[fn.key] || 0;
        return Object.assign({}, fn, {
          qiymat:v,
          halqa:'conic-gradient(' + fn.rang + ' ' + Math.round(v * 3.6) + 'deg, rgba(18,48,59,.12) 0deg)'
        });
      }),
      isTalim: s.screen === 'talim', isHarf: s.screen === 'harf', isSanoq: s.screen === 'sanoq', isRang: s.screen === 'rang',
      goTalim: go('talim'), goHarf: go('harf'), startCount:function(){ self.newCount(); }, startColor:function(){ self.newColor(); },
      harfKartalar: self.harflar.map(function(l, i){ return Object.assign({}, l, {
        tap:self.pickLetter(i),
        bg: s.harfIndex === i ? l.r : '#FFF8EA',
        rang: s.harfIndex === i ? '#FFF6E6' : '#12303B',
        border: s.organgan.indexOf(l.h) > -1 ? '#7FA650' : 'rgba(18,48,59,.12)'
      }); }),
      joriyHarf: self.harflar[s.harfIndex].h, joriySoz: self.harflar[s.harfIndex].s,
      joriyRang: self.harflar[s.harfIndex].r,
      organganSoni: s.organgan.length,
      son: s.son, natija: s.natija,
      sanoqNarsalar: Array.apply(null, { length:s.son }).map(function(x, i){ return { i:i }; }),
      sanoqVariant: s.sanoqVariant.map(function(n){ return { n:n, tap:self.answerCount(n) }; }),
      target: s.target,
      rangVariant: self.ranglar.map(function(r){ return Object.assign({}, r, { tap:self.answerColor(r.nom) }); }),
      wearGlasses: s.wear.kozoynak,
      gilamBg: s.owned.gilam ? '#1E7A8C' : '#B23F2E',
      yutuqlar:[
        { key:'erkalash', nom:'Mehribon doʻst', izoh:'10 marta erkalash', kerak:10, mukofot:20 },
        { key:'ovqat', nom:'Yaxshi oshpaz', izoh:'8 marta ovqatlantirish', kerak:8, mukofot:20 },
        { key:'yuvish', nom:'Toza jun', izoh:'6 dogʻni yuvish', kerak:6, mukofot:25 },
        { key:'oyin', nom:'Oʻyinchi', izoh:'3 marta mini-oʻyin', kerak:3, mukofot:30 }
      ].map(function(a){
        var bor = s.hisob[a.key] || 0;
        var bajarildi = bor >= a.kerak;
        var olindi = s.olingan.indexOf(a.key) > -1;
        return Object.assign({}, a, {
          holat: bor + '/' + a.kerak,
          barW: pct(Math.min(100, Math.round(bor / a.kerak * 100))),
          btn: olindi ? 'Olindi' : (bajarildi ? '+' + a.mukofot + ' tanga' : 'Davom eting'),
          btnBg: olindi ? 'rgba(127,166,80,.18)' : (bajarildi ? '#E9A62B' : 'rgba(18,48,59,.08)'),
          btnRang: olindi ? '#4C6A2C' : (bajarildi ? '#3B2A1E' : 'rgba(18,48,59,.4)'),
          tap:function(){
            if(olindi || !bajarildi) return;
            self.setState(function(st){ return { olingan:st.olingan.concat([a.key]), coins:st.coins + a.mukofot, msg:'Yutuq uchun ' + a.mukofot + ' tanga!' }; });
          }
        });
      }),
      start:function(){ self.setState(function(st){ return { screen: st.nomSet ? 'home' : 'ism', msg:"Keldingmi! Kel, birga o'ynaymiz." }; }); },
      goHome: go('home'), goMenu: go('menu'), goKitchen: go('oshxona'), goWardrobe: go('garderob'),
      goShop: go('dokon'), goSettings: go('sozlamalar'), goGame: go('oyinlar'), goApple: go('oyin'),
      pat:function(){ self.bump('joy', 6); self.setState({ hearts:true }); self.addXp(6, 'erkalash'); self.react('kulgan', 'Ie-he-he, yoqimli!', 1500); },
      tickle:function(){ self.bump('joy', 9); self.addXp(5, 'erkalash'); self.react('kulgan', "Qitiqlamang, kulgim qistayapti!", 1600); },
      poke:function(){ self.bump('joy', -8); self.react('xafa', "Meni turtmang... men yaxshi qo'zichoqman.", 2200); },
      wash:function(){ self.startBath(); },
      sleep:function(){
        if(s.mood === 'uyquda'){ self.react('xursand', 'Yaxshi uxlab oldim, rahmat!', 1800); }
        else { self.react('uyquda', 'Alla-yo, alla... shirin tush koʻraman.'); }
      },
      wake:function(){ self.react('kulgan', 'Xayrli tong! Kuchim toʻldi.', 1800); }
    };
  }
};

/* ---------- Momiq props yordamchisi ---------- */
function mq(v, scale){
  return Momiq({ mood:v.mood, hat:v.wearHat, chopon:v.wearChopon, scarf:v.wearScarf,
    glasses:v.wearGlasses, hearts:v.hearts, bubbles:v.bubbles, scale:scale });
}

/* ---------- Ekranlar (dizayn 1a) ---------- */
var SCREENS = {

menu:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:#EFDDAE;animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#7FC3D2 0%,#A9D8DC 32%,#D8E9DC 56%,#F5EEDA 76%,#EFE0BC 100%)"></div>'
    + '<div style="position:absolute;left:-50px;top:-80px;width:270px;height:270px;border-radius:50%;background:radial-gradient(circle,rgba(255,246,214,.9),rgba(255,246,214,0) 68%);animation:nur 9s ease-in-out infinite"></div>'
    + '<div style="position:absolute;left:26px;top:322px;width:96px;height:28px;border-radius:15px;background:rgba(255,255,255,.7);box-shadow:32px -11px 0 -6px rgba(255,255,255,.58),-20px 4px 0 -10px rgba(255,255,255,.5);animation:bulut 32s linear infinite"></div>'
    + '<div style="position:absolute;left:-70px;bottom:250px;width:290px;height:150px;background:linear-gradient(180deg,#9FB6C0,#87A2AE);clip-path:polygon(0 100%,38% 5%,56% 36%,78% 13%,100% 100%)"></div>'
    + '<div style="position:absolute;left:32px;bottom:358px;width:50px;height:40px;background:rgba(255,255,255,.82);clip-path:polygon(50% 0,100% 100%,0 100%)"></div>'
    + '<div style="position:absolute;right:-56px;bottom:250px;width:240px;height:120px;background:linear-gradient(180deg,#B2C6CD,#9BB3BC);clip-path:polygon(0 100%,34% 10%,62% 42%,84% 18%,100% 100%)"></div>'
    + '<div style="position:absolute;left:0;right:0;bottom:0;height:262px;background:linear-gradient(180deg,#AECB7C 0%,#8FB45E 28%,#7BA24C 64%,#688C3E 100%)"></div>'
    + '<div style="position:absolute;left:0;right:0;bottom:214px;height:48px;background:repeating-linear-gradient(78deg,rgba(255,255,255,.14) 0 2px,transparent 2px 9px);opacity:.7;animation:tebran 5.5s ease-in-out infinite"></div>'
    + '<div style="position:absolute;left:0;right:0;bottom:246px;height:18px;background:linear-gradient(180deg,rgba(104,140,62,.32),transparent)"></div>'
    + '<div style="position:absolute;left:0;right:0;top:88px;text-align:center">'
      + '<div style="display:inline-flex;align-items:center;gap:8px;height:28px;padding:0 14px;border-radius:14px;background:rgba(255,250,240,.82);border:1px solid rgba(18,48,59,.07)">'
        + '<span style="width:6px;height:6px;border-radius:50%;background:#C8452F"></span>'
        + '<span style="font:700 10.5px Nunito;letter-spacing:.26em;color:#A93A28;text-transform:uppercase">Salom, do\'stim</span>'
      + '</div>'
      + '<div style="font:800 66px/1 \'Baloo 2\',system-ui;color:#12303B;margin-top:12px;letter-spacing:-.01em;text-shadow:0 3px 0 rgba(255,255,255,.55)">' + v.nom + '</div>'
      + '<div style="font:600 13px Nunito;color:rgba(18,48,59,.5);margin-top:8px">O\'zbekcha qo\'zichoq — o\'yna, parvarish qil, o\'rgan</div>'
      + '<div style="margin:14px auto 0;width:116px;height:6px;border-radius:3px;background:repeating-linear-gradient(90deg,#E9A62B 0 9px,rgba(233,166,43,.25) 9px 15px)"></div>'
    + '</div>'
    + '<div style="position:absolute;left:50%;bottom:238px;transform:translateX(-50%)"><div style="animation:qalqish 3.6s ease-in-out infinite">' + mq(v) + '</div></div>'
    + '<div style="position:absolute;left:22px;right:22px;bottom:52px;padding:16px 16px 18px;border-radius:28px;background:rgba(255,250,240,.94);border:1px solid rgba(18,48,59,.07);box-shadow:0 16px 40px rgba(18,48,59,.18)">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin:0 4px 14px">'
        + '<div style="display:flex;align-items:center;gap:7px">'
          + '<span style="width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 34% 28%,#F9DE96,#E29B18)"></span>'
          + '<span style="font:800 15px \'Baloo 2\',system-ui;color:#7A4E06">' + v.coins + '</span>'
        + '</div>'
        + '<span style="font:700 10.5px Nunito;letter-spacing:.14em;color:rgba(18,48,59,.42);text-transform:uppercase">' + v.kunText + ' · ' + v.daraja + '-daraja</span>'
      + '</div>'
      + '<div ' + on(v.start) + ' style="height:62px;border-radius:20px;background:linear-gradient(180deg,#D8543D,#C0402B);box-shadow:0 6px 0 #93301F;display:flex;align-items:center;justify-content:center;gap:10px;transition:transform .12s">'
        + '<span style="font:800 23px \'Baloo 2\',system-ui;color:#FFF6E6">O\'ynash</span>'
      + '</div>'
      + '<div ' + on(v.goTalim) + ' style="margin-top:10px;height:54px;border-radius:18px;background:linear-gradient(180deg,#1B4A5A,#12303B);box-shadow:0 5px 0 #0A1E26;display:flex;align-items:center;justify-content:space-between;padding:0 16px 0 18px;transition:transform .12s">'
        + '<span style="font:800 18px \'Baloo 2\',system-ui;color:#FFF6E6">O\'rganamiz</span>'
        + '<span style="width:28px;height:28px;border-radius:14px;background:rgba(233,166,43,.9);animation:jilva 2.8s ease-in-out infinite;display:flex;align-items:center;justify-content:center">'
          + '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3B2A1E" stroke-width="2.6" stroke-linecap="round"><path d="M9.5 5.5 16 12l-6.5 6.5"></path></svg>'
        + '</span>'
      + '</div>'
      + '<div style="display:flex;gap:8px;margin-top:10px">'
        + '<div ' + on(v.goShop) + ' style="flex:1;height:46px;border-radius:16px;background:rgba(18,48,59,.05);display:flex;align-items:center;justify-content:center;font:700 14px \'Baloo 2\',system-ui;color:#12303B">Do\'kon</div>'
        + '<div ' + on(v.goHub) + ' style="flex:1;height:46px;border-radius:16px;background:rgba(18,48,59,.05);display:flex;align-items:center;justify-content:center;font:700 14px \'Baloo 2\',system-ui;color:#12303B">Mini-o\'yin</div>'
        + '<div ' + on(v.goSettings) + ' style="flex:1;height:46px;border-radius:16px;background:rgba(18,48,59,.05);display:flex;align-items:center;justify-content:center;font:700 14px \'Baloo 2\',system-ui;color:#12303B">Sozlash</div>'
      + '</div>'
    + '</div>'
  + '</div>'; },

home:function(v){
  var night = v.isNight ? (''
    + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(9,24,42,.86),rgba(14,39,49,.7));pointer-events:none"></div>'
    + '<div style="position:absolute;left:44px;top:150px;width:4px;height:4px;border-radius:50%;background:#FFF6E6;box-shadow:52px 34px 0 #FFF6E6,120px -18px 0 rgba(255,246,230,.7),210px 46px 0 #FFF6E6,280px 12px 0 rgba(255,246,230,.6),86px 96px 0 rgba(255,246,230,.5),250px 120px 0 #FFF6E6;animation:yulduz 3.2s ease-in-out infinite;pointer-events:none"></div>'
    + '<div style="position:absolute;right:40px;top:104px;width:56px;height:56px;border-radius:50%;background:#F6ECCB;box-shadow:0 0 30px rgba(246,236,203,.5);pointer-events:none"></div>'
    + '<div style="position:absolute;right:26px;top:96px;width:56px;height:56px;border-radius:50%;background:#0E2731;pointer-events:none"></div>'
    + '<div style="position:absolute;left:0;right:0;top:212px;text-align:center;pointer-events:none">'
      + '<div style="font:800 26px \'Baloo 2\',system-ui;color:#FFF6E6">Momiq uxlayapti</div>'
      + '<div style="font:600 13px Nunito;color:rgba(255,246,230,.65);margin-top:6px">Kuch to\'lib boradi — sekin gapiring</div>'
    + '</div>'
    + '<div ' + on(v.wake) + ' style="position:absolute;left:50%;bottom:236px;transform:translateX(-50%);height:52px;padding:0 30px;border-radius:18px;background:#E9A62B;box-shadow:0 5px 0 #B67B14;display:flex;align-items:center;font:800 17px \'Baloo 2\',system-ui;color:#3B2A1E">Uyg\'otish</div>'
  ) : '';
  var bath = v.isBath ? (''
    + '<div style="position:absolute;left:0;right:0;top:0;bottom:0;background:linear-gradient(180deg,rgba(30,122,140,.18) 0 42%,rgba(30,122,140,.42) 42%,rgba(30,122,140,.6));pointer-events:none"></div>'
    + '<div style="position:absolute;left:0;right:0;top:44%;height:16px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.85) 0 18px,rgba(255,255,255,.4) 18px 34px);border-radius:8px;pointer-events:none"></div>'
    + '<div style="position:absolute;left:0;right:0;top:198px;text-align:center;pointer-events:none">'
      + '<div style="display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-radius:18px;background:#FFF8EA;box-shadow:0 4px 0 rgba(18,48,59,.16)">'
        + '<span style="font:700 15px \'Baloo 2\',system-ui;color:#16606F">Kirlarni bosing</span>'
        + '<span style="font:800 15px \'Baloo 2\',system-ui;color:#C8452F">' + v.dirtLeft + '</span>'
      + '</div>'
    + '</div>'
    + v.dirt.map(function(d){ return '<div ' + on(d.tap) + ' style="position:absolute;width:52px;height:52px;border-radius:50%;background:radial-gradient(circle at 40% 34%,#9C8467,#6E5A44);box-shadow:0 3px 8px rgba(0,0,0,.28),inset -4px -4px 8px rgba(0,0,0,.25);animation:gijla 2.2s ease-in-out infinite;left:' + d.left + ';top:' + d.top + '"></div>'; }).join('')
  ) : '';
  var fanCircles = v.fanlar.map(function(fn){ return ''
    + '<div ' + on(v.goTalim) + ' style="display:flex;flex-direction:column;align-items:center;gap:5px;padding:0 4px">'
      + '<div style="position:relative;width:46px;height:46px;border-radius:50%;background:' + fn.halqa + '">'
        + '<div style="position:absolute;inset:5px;border-radius:50%;background:#FFFAF0;display:flex;align-items:center;justify-content:center;font:800 13.5px \'Baloo 2\',system-ui;color:#12303B">' + fn.qiymat + '</div>'
      + '</div>'
      + '<span style="font:700 9px Nunito;letter-spacing:.09em;color:rgba(18,48,59,.55);text-transform:uppercase">' + fn.nom + '</span>'
    + '</div>'; }).join('');
  function careBtn(fn, bg, sw, ico, label, delay){ return ''
    + '<div ' + on(fn) + ' style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px 4px 10px;border-radius:18px;transition:transform .12s">'
      + '<span style="width:40px;height:40px;border-radius:50%;background:' + bg + ';animation:bob 3.4s ease-in-out ' + delay + 's infinite;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 0 rgba(138,90,21,.18)">'
        + '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="' + sw + '" stroke-width="2" stroke-linecap="round">' + ico + '</svg>'
      + '</span>'
      + '<span style="font:700 11.5px \'Baloo 2\',system-ui;color:#12303B">' + label + '</span>'
    + '</div>'; }
  return ''
  + '<div style="position:absolute;inset:0;background:#EFDDAE;animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#7FC3D2 0%,#A9D8DC 34%,#D8E9DC 58%,#F5EEDA 78%,#EFE0BC 100%)"></div>'
    + '<div style="position:absolute;left:-40px;top:-70px;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(255,246,214,.85),rgba(255,246,214,0) 68%);animation:nur 9s ease-in-out infinite"></div>'
    + '<div style="position:absolute;left:24px;top:118px;width:104px;height:30px;border-radius:16px;background:rgba(255,255,255,.72);box-shadow:34px -12px 0 -6px rgba(255,255,255,.6),-22px 4px 0 -10px rgba(255,255,255,.55);animation:bulut 30s linear infinite"></div>'
    + '<div style="position:absolute;left:-70px;bottom:336px;width:290px;height:158px;background:linear-gradient(180deg,#9FB6C0,#87A2AE);clip-path:polygon(0 100%,38% 4%,56% 36%,78% 12%,100% 100%)"></div>'
    + '<div style="position:absolute;right:-56px;bottom:336px;width:246px;height:126px;background:linear-gradient(180deg,#B2C6CD,#9BB3BC);clip-path:polygon(0 100%,34% 10%,62% 42%,84% 18%,100% 100%)"></div>'
    + '<div style="position:absolute;left:0;right:0;bottom:0;height:348px;background:linear-gradient(180deg,#AECB7C 0%,#8FB45E 26%,#7BA24C 62%,#688C3E 100%)"></div>'
    + '<div style="position:absolute;left:0;right:0;bottom:296px;height:52px;background:repeating-linear-gradient(78deg,rgba(255,255,255,.14) 0 2px,transparent 2px 9px);opacity:.7;animation:tebran 5.5s ease-in-out infinite"></div>'
    + '<div style="position:absolute;left:22px;right:22px;bottom:230px;height:126px;border-radius:10px;background:' + v.gilamBg + ';box-shadow:0 14px 26px rgba(59,42,30,.26),inset 0 0 0 1px rgba(0,0,0,.08);overflow:hidden">'
      + '<div style="position:absolute;inset:7px;border:2px solid rgba(255,244,222,.9);border-radius:5px"></div>'
      + '<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:112px;height:70px;border-radius:50%;background:radial-gradient(circle at 42% 34%,#F6EFDC,#E9D9B8);box-shadow:0 0 0 5px rgba(255,244,222,.55),0 0 0 9px rgba(0,0,0,.06)"></div>'
    + '</div>'
    + '<div ' + on(v.pat) + ' style="position:absolute;left:50%;bottom:292px;transform:translateX(-50%)">' + mq(v) + '</div>'
    + '<div style="position:absolute;left:20px;right:20px;top:18px;height:46px;display:flex;align-items:center;gap:10px;padding:0 6px 0 5px;border-radius:23px;background:rgba(255,250,240,.9);border:1px solid rgba(18,48,59,.07);box-shadow:0 6px 18px rgba(18,48,59,.1)">'
      + '<div style="display:flex;align-items:center;gap:7px;height:36px;padding:0 12px 0 5px;border-radius:18px;background:#FFF3D8">'
        + '<span style="width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 34% 28%,#F9DE96,#E29B18);box-shadow:inset 0 -2px 0 rgba(120,74,0,.22)"></span>'
        + '<span style="font:800 15.5px \'Baloo 2\',system-ui;color:#7A4E06">' + v.coins + '</span>'
      + '</div>'
      + '<div style="flex:1;min-width:0">'
        + '<div style="display:flex;align-items:baseline;gap:6px">'
          + '<span style="font:800 14.5px \'Baloo 2\',system-ui;color:#12303B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + v.nom + '</span>'
          + '<span style="font:700 9.5px Nunito;letter-spacing:.1em;color:rgba(18,48,59,.45);text-transform:uppercase;white-space:nowrap">' + v.daraja + '-daraja</span>'
        + '</div>'
        + '<div style="margin-top:4px;height:4px;border-radius:2px;background:rgba(18,48,59,.13);overflow:hidden"><div style="height:100%;border-radius:2px;background:linear-gradient(90deg,#7FA650,#A6C46F);transition:width .5s;width:' + v.xpW + '"></div></div>'
      + '</div>'
      + '<div ' + on(v.goSettings) + ' style="width:36px;height:36px;border-radius:18px;background:rgba(18,48,59,.06);display:flex;align-items:center;justify-content:center">'
        + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#12303B" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="3.2"></circle><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"></path></svg>'
      + '</div>'
    + '</div>'
    + '<div style="position:absolute;left:20px;right:20px;top:74px;padding:11px 6px 10px;border-radius:22px;background:rgba(255,250,240,.9);border:1px solid rgba(18,48,59,.07);box-shadow:0 6px 18px rgba(18,48,59,.1)">'
      + '<div style="display:flex;justify-content:space-around;align-items:center">' + fanCircles + '</div>'
    + '</div>'
    + '<div style="position:absolute;left:50%;top:158px;transform:translateX(-50%);width:286px">'
      + '<div style="position:relative;background:#FFFDF7;border-radius:24px;padding:15px 20px 16px;box-shadow:0 10px 22px rgba(18,48,59,.16),inset 0 0 0 2px rgba(18,48,59,.9);animation:pop .36s cubic-bezier(.2,1.35,.4,1) both">'
        + '<div style="font:700 17px/1.35 \'Baloo 2\',system-ui;color:#12303B;text-align:center">' + v.msg + '</div>'
        + '<div style="position:absolute;left:50%;bottom:-11px;transform:translateX(-50%) rotate(45deg);width:20px;height:20px;background:#FFFDF7;box-shadow:2px 2px 0 0 rgba(18,48,59,.9)"></div>'
      + '</div>'
    + '</div>'
    + '<div style="position:absolute;left:0;right:0;bottom:0;padding:10px 18px 24px;background:linear-gradient(180deg,#FFFAF0,#FFF4E0);border-radius:30px 30px 0 0;box-shadow:0 -14px 34px rgba(18,48,59,.16)">'
      + '<div style="width:44px;height:5px;border-radius:3px;margin:0 auto 12px;background:rgba(18,48,59,.16)"></div>'
      + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'
        + careBtn(v.goKitchen, '#FBE7C3', '#8A5A15', '<path d="M3 11h18c0 5-4 8-9 8s-9-3-9-8Z"></path><path d="M8 8c0-2 1-3 1-3M12 7.5c0-2.5 1-3.5 1-3.5M16 8c0-2 1-3 1-3"></path>', 'Ovqat', 0)
        + careBtn(v.tickle, '#F9DAD2', '#A93A28', '<path d="M12 21c4-3 7-6 7-10a4 4 0 0 0-7-2.6A4 4 0 0 0 5 11c0 4 3 7 7 10Z"></path><path d="M9 12h6"></path>', 'Qitiqlash', .35)
        + careBtn(v.wash, '#CFE6EB', '#16606F', '<path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3Z"></path>', 'Yuvintirish', .7)
        + careBtn(v.sleep, '#D5DDEC', '#2F4468', '<path d="M20 14.5A8 8 0 0 1 9.5 4a8.2 8.2 0 1 0 10.5 10.5Z"></path>', 'Uxlash', 1.05)
        + careBtn(v.goWardrobe, '#DCE7CC', '#4C6A2C', '<path d="M4 17c0-4.5 3.6-8 8-8s8 3.5 8 8H4Z"></path><path d="M8 17V9.5M16 17V9.5"></path>', 'Kiyim', 1.4)
        + careBtn(v.goHub, '#F6DFB6', '#8A5A15', '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.8-5.3-2.9-5.3 2.9 1.1-5.8L3.5 9.7l5.9-.8L12 3.5Z"></path>', 'O\'yin', 1.75)
      + '</div>'
      + '<div ' + on(v.goTalim) + ' style="margin-top:10px;height:50px;border-radius:18px;background:linear-gradient(180deg,#1B4A5A,#12303B);box-shadow:0 5px 0 #0A1E26;display:flex;align-items:center;justify-content:space-between;padding:0 18px 0 20px;transition:transform .12s">'
        + '<span style="font:800 17px \'Baloo 2\',system-ui;color:#FFF6E6">Momiq bilan o\'rganamiz</span>'
        + '<span style="width:30px;height:30px;border-radius:15px;background:rgba(233,166,43,.9);animation:jilva 2.8s ease-in-out infinite;display:flex;align-items:center;justify-content:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B2A1E" stroke-width="2.6" stroke-linecap="round"><path d="M9.5 5.5 16 12l-6.5 6.5"></path></svg></span>'
      + '</div>'
      + '<div ' + on(v.poke) + ' style="margin-top:8px;text-align:center;font:600 11px Nunito;color:rgba(18,48,59,.4)">Momiqni turtib ko\'ring — xafa bo\'ladi</div>'
    + '</div>'
    + night + bath
  + '</div>'; },

ism:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:radial-gradient(120% 80% at 50% 0%,#9AD2DC,#DDEAEC 46%,#FBF3E4 74%);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:96px;text-align:center;padding:0 34px">'
      + '<div style="font:700 12px Nunito;letter-spacing:.3em;color:#C8452F;text-transform:uppercase">Tanishuv</div>'
      + '<div style="font:800 32px/1.15 \'Baloo 2\',system-ui;color:#12303B;margin-top:8px">Qo\'zichog\'imizga qanday ism qo\'yamiz?</div>'
    + '</div>'
    + '<div style="position:absolute;left:50%;top:250px;transform:translateX(-50%)">' + Momiq({ mood:'kulgan', hat:v.wearHat, scale:1.06 }) + '</div>'
    + '<div style="position:absolute;left:26px;right:26px;top:534px;display:grid;grid-template-columns:1fr 1fr;gap:12px">'
      + v.nameOptions.map(function(n){ return '<div ' + on(n.tap) + ' style="height:62px;border-radius:20px;display:flex;align-items:center;justify-content:center;font:800 18px \'Baloo 2\',system-ui;box-shadow:0 4px 0 rgba(18,48,59,.1);background:' + n.bg + ';color:' + n.rang + ';border:2px solid ' + n.border + '">' + n.nom + '</div>'; }).join('')
    + '</div>'
    + '<div ' + on(v.confirmName) + ' style="position:absolute;left:26px;right:26px;bottom:70px;height:66px;border-radius:22px;background:#C8452F;box-shadow:0 6px 0 #9C3122;display:flex;align-items:center;justify-content:center;font:800 22px \'Baloo 2\',system-ui;color:#FFF6E6">Davom etish</div>'
  + '</div>'; },

talim:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#E4EEE6,#FBF3E4 40%);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:88px;display:flex;align-items:center;gap:14px;padding:0 22px">'
      + backBtn(v.goHome, '#12303B', 'rgba(255,250,240,.94)')
      + '<div><div style="font:800 26px/1 \'Baloo 2\',system-ui;color:#12303B">O\'rganamiz</div>'
      + '<div style="font:600 12px Nunito;color:rgba(18,48,59,.55);margin-top:2px">' + v.nom + ' bilan birga · ' + v.organganSoni + ' harf o\'rganildi</div></div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:120px;display:flex;flex-direction:column;gap:14px">'
      + '<div ' + on(v.goHarf) + ' style="position:relative;height:118px;border-radius:28px;overflow:hidden;background:#FFF8EA;border:2px solid rgba(18,48,59,.1);box-shadow:0 5px 0 rgba(18,48,59,.1)">'
        + '<div style="position:absolute;right:18px;top:14px;display:flex;gap:8px;align-items:flex-start"><span style="font:800 62px/1 \'Baloo 2\',system-ui;color:rgba(200,69,47,.9)">A</span><span style="font:800 44px/1 \'Baloo 2\',system-ui;color:rgba(30,122,140,.55)">B</span><span style="font:800 32px/1 \'Baloo 2\',system-ui;color:rgba(233,166,43,.6)">D</span></div>'
        + '<div style="position:absolute;left:20px;bottom:18px"><div style="font:800 24px \'Baloo 2\',system-ui;color:#12303B">Harflar</div><div style="font:600 12px Nunito;color:rgba(18,48,59,.55)">Harfni bosing — Momiq so\'zini aytadi</div></div>'
      + '</div>'
      + '<div ' + on(v.startCount) + ' style="position:relative;height:118px;border-radius:28px;overflow:hidden;background:#12303B;box-shadow:0 5px 0 rgba(0,0,0,.2)">'
        + '<div style="position:absolute;right:20px;top:20px;display:flex;gap:8px"><span style="width:26px;height:26px;border-radius:50%;background:#C8452F"></span><span style="width:26px;height:26px;border-radius:50%;background:#E9A62B"></span><span style="width:26px;height:26px;border-radius:50%;background:#7FA650"></span></div>'
        + '<div style="position:absolute;left:20px;bottom:18px"><div style="font:800 24px \'Baloo 2\',system-ui;color:#FFF6E6">Sanoq 1–5</div><div style="font:600 12px Nunito;color:rgba(255,246,230,.7)">Olmalarni sanab, sonni tanlang</div></div>'
      + '</div>'
      + '<div ' + on(v.goIngliz) + ' style="position:relative;height:118px;border-radius:28px;overflow:hidden;background:#1E7A8C;box-shadow:0 5px 0 #145866">'
        + '<div style="position:absolute;right:20px;top:18px;font:800 40px/1 \'Baloo 2\',system-ui;color:rgba(255,246,230,.5)">ABC</div>'
        + '<div style="position:absolute;left:20px;bottom:18px"><div style="font:800 24px \'Baloo 2\',system-ui;color:#FFF6E6">Ingliz tili</div><div style="font:600 12px Nunito;color:rgba(255,246,230,.75)">So\'z va tarjimasi — 8 ta so\'z</div></div>'
      + '</div>'
      + '<div ' + on(v.startColor) + ' style="position:relative;height:118px;border-radius:28px;overflow:hidden;background:#FFF8EA;border:2px solid rgba(18,48,59,.1);box-shadow:0 5px 0 rgba(18,48,59,.1)">'
        + '<div style="position:absolute;right:0;top:0;bottom:0;width:130px;display:grid;grid-template-columns:1fr 1fr"><div style="background:#C8452F"></div><div style="background:#1E7A8C"></div><div style="background:#7FA650"></div><div style="background:#E9A62B"></div></div>'
        + '<div style="position:absolute;left:20px;bottom:18px"><div style="font:800 24px \'Baloo 2\',system-ui;color:#12303B">Ranglar</div><div style="font:600 12px Nunito;color:rgba(18,48,59,.55)">To\'g\'ri rangni toping</div></div>'
      + '</div>'
    + '</div>'
  + '</div>'; },

harf:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#E4EEE6,#FBF3E4 34%);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 22px">'
      + backBtn(v.goTalim, '#12303B', 'rgba(255,250,240,.94)')
      + '<div style="font:800 22px \'Baloo 2\',system-ui;color:#12303B">Harflar</div>'
      + '<div style="height:36px;padding:0 12px;border-radius:18px;background:#FFF8EA;display:flex;align-items:center;font:800 14px \'Baloo 2\',system-ui;color:#7FA650">' + v.organganSoni + '/12</div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:100px;height:230px;border-radius:26px;background:#FFFAF0;border:1px solid rgba(18,48,59,.08);overflow:hidden">'
      + '<div style="position:absolute;left:20px;top:16px;font:800 130px/1 \'Baloo 2\',system-ui;color:' + v.joriyRang + ';opacity:.9">' + v.joriyHarf + '</div>'
      + '<div style="position:absolute;right:16px;bottom:6px">' + mq(v, 0.62) + '</div>'
      + '<div style="position:absolute;left:22px;bottom:20px;font:800 30px \'Baloo 2\',system-ui;color:#12303B">' + v.joriySoz + '</div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:354px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px">'
      + v.harfKartalar.map(function(l){ return '<div ' + on(l.tap) + ' style="height:66px;border-radius:18px;display:flex;align-items:center;justify-content:center;font:800 30px \'Baloo 2\',system-ui;box-shadow:0 3px 0 rgba(18,48,59,.1);background:' + l.bg + ';color:' + l.rang + ';border:2px solid ' + l.border + '">' + l.h + '</div>'; }).join('')
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;bottom:44px;text-align:center;font:600 12.5px/1.5 Nunito;color:rgba(18,48,59,.5)">Yashil chegara — o\'rganilgan harflar</div>'
  + '</div>'; },

ingliz:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#D9E9EC,#FBF3E4 34%);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 22px">'
      + backBtn(v.goTalim, '#12303B', 'rgba(255,250,240,.94)')
      + '<div style="font:800 22px \'Baloo 2\',system-ui;color:#12303B">Ingliz tili</div><div style="width:40px"></div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:100px;height:200px;border-radius:28px;background:#1E7A8C;overflow:hidden;box-shadow:0 5px 0 #145866">'
      + '<div style="position:absolute;left:24px;top:34px;font:800 46px/1.05 \'Baloo 2\',system-ui;color:#FFF6E6">' + v.joriyEn + '</div>'
      + '<div style="position:absolute;left:24px;top:96px;font:700 22px \'Baloo 2\',system-ui;color:rgba(255,246,230,.75)">' + v.joriyUz + '</div>'
      + '<div style="position:absolute;right:10px;bottom:4px">' + mq(v, 0.6) + '</div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:324px;display:grid;grid-template-columns:1fr 1fr;gap:12px">'
      + v.inglizKartalar.map(function(w){ return '<div ' + on(w.tap) + ' style="height:64px;border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 3px 0 rgba(18,48,59,.12);border:2px solid rgba(18,48,59,.1);background:' + w.bg + ';color:' + w.rang + '"><span style="font:800 18px \'Baloo 2\',system-ui">' + w.en + '</span><span style="font:600 11px Nunito;opacity:.7">' + w.uz + '</span></div>'; }).join('')
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;bottom:36px;text-align:center;font:600 12.5px/1.5 Nunito;color:rgba(18,48,59,.5)">So\'zni bosing — Momiq tarjimasini aytadi</div>'
  + '</div>'; },

sanoq:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#0E2731 0 300px,#FBF3E4 300px);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 22px">'
      + backBtn(v.goTalim, '#FFF6E6', 'rgba(255,246,230,.14)')
      + '<div style="font:800 22px \'Baloo 2\',system-ui;color:#FFF6E6">Nechta olma?</div><div style="width:40px"></div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:108px;height:170px;border-radius:26px;background:rgba(255,246,230,.08);border:1px solid rgba(255,246,230,.18);display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:14px;padding:18px">'
      + v.sanoqNarsalar.map(function(){ return '<div style="width:54px;height:54px;border-radius:50%;background:radial-gradient(circle at 36% 30%,#E4655C,#B23F2E);box-shadow:0 4px 10px rgba(0,0,0,.28)"><div style="position:relative;left:26px;top:-6px;width:4px;height:14px;border-radius:2px;background:#5C4436"></div></div>'; }).join('')
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:310px;display:flex;gap:12px">'
      + v.sanoqVariant.map(function(o){ return '<div ' + on(o.tap) + ' style="flex:1;height:96px;border-radius:24px;background:#FFF8EA;border:2px solid rgba(18,48,59,.12);box-shadow:0 5px 0 rgba(18,48,59,.12);display:flex;align-items:center;justify-content:center;font:800 44px \'Baloo 2\',system-ui;color:#12303B">' + o.n + '</div>'; }).join('')
    + '</div>'
    + '<div style="position:absolute;left:0;right:0;top:420px;text-align:center;font:800 20px \'Baloo 2\',system-ui;color:#7FA650;min-height:26px">' + v.natija + '</div>'
    + '<div style="position:absolute;left:50%;bottom:24px;transform:translateX(-50%)">' + mq(v, 0.86) + '</div>'
  + '</div>'; },

rang:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#E4EEE6,#FBF3E4 36%);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 22px">'
      + backBtn(v.goTalim, '#12303B', 'rgba(255,250,240,.94)')
      + '<div style="font:800 22px \'Baloo 2\',system-ui;color:#12303B">Ranglar</div><div style="width:40px"></div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:102px;padding:20px;border-radius:24px;background:#FFFAF0;border:1px solid rgba(18,48,59,.08);text-align:center">'
      + '<div style="font:600 13px Nunito;color:rgba(18,48,59,.55)">Momiq so\'radi:</div>'
      + '<div style="font:800 30px \'Baloo 2\',system-ui;color:#12303B;margin-top:4px">' + v.target + ' rangni top</div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:226px;display:grid;grid-template-columns:1fr 1fr;gap:14px">'
      + v.rangVariant.map(function(r){ return '<div ' + on(r.tap) + ' style="height:110px;border-radius:26px;box-shadow:0 5px 0 rgba(18,48,59,.16);display:flex;align-items:flex-end;padding:12px;background:' + r.kod + '"><span style="font:800 16px \'Baloo 2\',system-ui;color:#FFF6E6;text-shadow:0 1px 3px rgba(0,0,0,.35)">' + r.nom + '</span></div>'; }).join('')
    + '</div>'
    + '<div style="position:absolute;left:0;right:0;top:494px;text-align:center;font:800 20px \'Baloo 2\',system-ui;color:#7FA650;min-height:26px">' + v.natija + '</div>'
    + '<div style="position:absolute;left:50%;bottom:20px;transform:translateX(-50%)">' + mq(v, 0.8) + '</div>'
  + '</div>'; },

yutuqlar:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#F3E2C4,#FBF3E4 36%);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:88px;display:flex;align-items:center;gap:14px;padding:0 22px">'
      + backBtn(v.goHub, '#12303B', 'rgba(255,250,240,.94)')
      + '<div><div style="font:800 26px/1 \'Baloo 2\',system-ui;color:#12303B">Yutuqlar</div><div style="font:600 12px Nunito;color:rgba(18,48,59,.55);margin-top:2px">' + v.daraja + '-daraja · ' + v.kunText + '</div></div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:120px;display:flex;flex-direction:column;gap:12px">'
      + v.yutuqlar.map(function(y){ return '<div style="padding:16px;border-radius:20px;background:#FFFAF0;border:1px solid rgba(18,48,59,.08);box-shadow:0 3px 12px rgba(18,48,59,.07);animation:kort .4s ease-out both">'
        + '<div style="display:flex;align-items:center;gap:12px"><div style="flex:1"><div style="font:700 18px \'Baloo 2\',system-ui;color:#12303B">' + y.nom + '</div><div style="font:600 12px Nunito;color:rgba(18,48,59,.55)">' + y.izoh + ' · ' + y.holat + '</div></div>'
        + '<div ' + on(y.tap) + ' style="height:40px;padding:0 16px;border-radius:14px;display:flex;align-items:center;font:800 13px \'Baloo 2\',system-ui;background:' + y.btnBg + ';color:' + y.btnRang + '">' + y.btn + '</div></div>'
        + '<div style="margin-top:10px;height:8px;border-radius:4px;background:rgba(18,48,59,.12);overflow:hidden"><div style="height:100%;border-radius:4px;background:#E9A62B;transition:width .4s;width:' + y.barW + '"></div></div>'
      + '</div>'; }).join('')
    + '</div>'
  + '</div>'; },

oyinlar:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#DDEAEC,#FBF3E4 42%);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:88px;display:flex;align-items:center;gap:14px;padding:0 22px">'
      + backBtn(v.goHome, '#12303B', 'rgba(255,250,240,.94)')
      + '<div><div style="font:800 26px/1 \'Baloo 2\',system-ui;color:#12303B">Mini-o\'yinlar</div><div style="font:600 12px Nunito;color:rgba(18,48,59,.55);margin-top:2px">Tanga yig\'ib kiyim sotib olamiz</div></div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:120px;display:flex;flex-direction:column;gap:14px">'
      + '<div ' + on(v.goApple) + ' style="position:relative;height:172px;border-radius:28px;overflow:hidden;background:linear-gradient(180deg,#9AD2DC,#A2C371 62%,#7FA650);box-shadow:0 6px 0 rgba(18,48,59,.14)">'
        + '<div style="position:absolute;left:24px;top:26px;width:54px;height:54px;border-radius:50%;background:#C8452F;box-shadow:0 4px 10px rgba(0,0,0,.18)"></div><div style="position:absolute;left:110px;top:60px;width:40px;height:40px;border-radius:50%;background:#E9A62B"></div><div style="position:absolute;right:34px;top:22px;width:34px;height:34px;border-radius:50%;background:#1E7A8C"></div>'
        + '<div style="position:absolute;left:0;right:0;bottom:0;padding:16px 20px;background:linear-gradient(180deg,transparent,rgba(18,48,59,.72))"><div style="font:800 24px \'Baloo 2\',system-ui;color:#FFF6E6">Olma tut</div><div style="font:600 12px Nunito;color:rgba(255,246,230,.8)">20 soniya · har olma 2 tanga</div></div>'
      + '</div>'
      + '<div ' + on(v.startMemory) + ' style="position:relative;height:172px;border-radius:28px;overflow:hidden;background:#12303B;box-shadow:0 6px 0 rgba(0,0,0,.2)">'
        + '<div style="position:absolute;inset:0;background:repeating-conic-gradient(from 45deg at 50% 50%,rgba(233,166,43,.16) 0 25%,transparent 0 50%);background-size:30px 30px"></div>'
        + '<div style="position:absolute;left:24px;top:26px;display:flex;gap:8px"><div style="width:40px;height:54px;border-radius:10px;background:#C8452F"></div><div style="width:40px;height:54px;border-radius:10px;background:rgba(255,246,230,.16)"></div><div style="width:40px;height:54px;border-radius:10px;background:#7FA650"></div><div style="width:40px;height:54px;border-radius:10px;background:rgba(255,246,230,.16)"></div></div>'
        + '<div style="position:absolute;left:0;right:0;bottom:0;padding:16px 20px"><div style="font:800 24px \'Baloo 2\',system-ui;color:#FFF6E6">Juftini top</div><div style="font:600 12px Nunito;color:rgba(255,246,230,.7)">Xotira o\'yini · juft topilsa 5 tanga</div></div>'
      + '</div>'
      + '<div ' + on(v.goAch) + ' style="height:56px;border-radius:20px;display:flex;align-items:center;justify-content:center;background:#12303B"><span style="font:800 16px \'Baloo 2\',system-ui;color:#FFF6E6">Yutuqlar</span></div>'
      + '<div ' + on(v.takeGift) + ' style="height:56px;border-radius:20px;display:flex;align-items:center;justify-content:center;gap:10px;background:' + v.giftBg + '"><span style="width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#F6CF6A,#E9A62B);box-shadow:inset 0 0 0 2px rgba(255,255,255,.5)"></span><span style="font:800 16px \'Baloo 2\',system-ui;color:' + v.giftRang + '">' + v.giftText + '</span></div>'
    + '</div>'
  + '</div>'; },

xotira:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:#0E2731;animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;inset:0;background:repeating-conic-gradient(from 45deg at 50% 50%,rgba(233,166,43,.06) 0 25%,transparent 0 50%);background-size:44px 44px"></div>'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 22px">'
      + backBtn(v.goHub, '#FFF6E6', 'rgba(255,246,230,.14)')
      + '<div style="font:800 22px \'Baloo 2\',system-ui;color:#FFF6E6">Juftini top</div>'
      + '<div style="display:flex;gap:8px"><div style="height:36px;padding:0 12px;border-radius:18px;background:rgba(255,246,230,.14);display:flex;align-items:center;font:800 14px \'Baloo 2\',system-ui;color:#E9A62B">' + v.matchedCount + '/4</div><div style="height:36px;padding:0 12px;border-radius:18px;background:rgba(255,246,230,.14);display:flex;align-items:center;font:800 14px \'Baloo 2\',system-ui;color:#FFF6E6">' + v.moves + '</div></div>'
    + '</div>'
    + '<div style="position:absolute;left:26px;right:26px;top:110px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px">'
      + v.memCards.map(function(c){ return '<div ' + on(c.tap) + ' style="position:relative;overflow:hidden;height:104px;border-radius:16px;display:flex;align-items:center;justify-content:center;font:800 26px \'Baloo 2\',system-ui;color:#FFF6E6;transition:background .25s,transform .25s cubic-bezier(.2,1.4,.4,1);transform:' + c.poz + ';border:2px solid rgba(255,246,230,.18);background:' + c.yuzBg + '"><span style="position:absolute;width:70px;height:100px;border-radius:14px;background:' + c.naqsh + '"></span><span style="position:relative">' + c.harfOchiq + '</span></div>'; }).join('')
    + '</div>'
    + '<div style="position:absolute;left:50%;bottom:110px;transform:translateX(-50%)">' + mq(v, 0.72) + '</div>'
    + '<div style="position:absolute;left:0;right:0;bottom:36px;text-align:center;font:600 13px Nunito;color:rgba(255,246,230,.6)">Bir xil harflarni juftlab toping</div>'
  + '</div>'; },

oshxona:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#F3E2C4,#FBF3E4 40%);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:88px;display:flex;align-items:center;gap:14px;padding:0 22px">'
      + backBtn(v.goHome, '#12303B', 'rgba(255,250,240,.94)')
      + '<div><div style="font:800 26px/1 \'Baloo 2\',system-ui;color:#12303B">Oshxona</div><div style="font:600 12px Nunito;color:rgba(18,48,59,.55);margin-top:2px">Momiqning qorni: ' + v.hungerText + '</div></div>'
    + '</div>'
    + '<div style="position:absolute;left:0;right:0;top:120px;height:230px;display:flex;align-items:flex-end;justify-content:center;background:radial-gradient(70% 60% at 50% 90%,#F7E7C6,transparent)">'
      + '<div style="position:absolute;left:50%;bottom:26px;transform:translateX(-50%);width:230px;height:14px;border-radius:8px;background:#B23F2E"></div>'
      + '<div style="margin-bottom:24px">' + mq(v, 0.86) + '</div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:366px">'
      + '<div style="font:700 12px Nunito;letter-spacing:.14em;color:rgba(18,48,59,.5);text-transform:uppercase;margin-bottom:12px">Nima beramiz?</div>'
      + '<div style="display:flex;flex-direction:column;gap:12px">'
        + v.foods.map(function(f){ return '<div ' + on(f.tap) + ' style="display:flex;align-items:center;gap:14px;padding:14px;border-radius:20px;background:#FFFAF0;border:1px solid rgba(18,48,59,.08);box-shadow:0 4px 0 rgba(18,48,59,.1)"><div style="width:52px;height:52px;border-radius:16px;display:flex;align-items:center;justify-content:center;font:800 22px \'Baloo 2\',system-ui;color:#fff;background:' + f.rang + '">' + f.harf + '</div><div style="flex:1"><div style="font:700 19px \'Baloo 2\',system-ui;color:#12303B">' + f.nom + '</div><div style="font:600 12px Nunito;color:rgba(18,48,59,.55)">' + f.izoh + '</div></div><div style="font:800 14px \'Baloo 2\',system-ui;color:#7FA650">+' + f.quvvat + '</div></div>'; }).join('')
      + '</div>'
    + '</div>'
  + '</div>'; },

garderob:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#E7EEF0,#FBF3E4 45%);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:88px;display:flex;align-items:center;gap:14px;padding:0 22px">'
      + backBtn(v.goHome, '#12303B', 'rgba(255,250,240,.94)')
      + '<div><div style="font:800 26px/1 \'Baloo 2\',system-ui;color:#12303B">Kiyintirish</div><div style="font:600 12px Nunito;color:rgba(18,48,59,.55);margin-top:2px">Bosib kiydiring yoki yechiring</div></div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:116px;height:270px;border-radius:30px;background:#FFF8EA;border:2px solid rgba(18,48,59,.1);overflow:hidden">'
      + '<div style="position:absolute;inset:0;background:repeating-conic-gradient(from 45deg at 50% 50%,rgba(30,122,140,.1) 0 25%,transparent 0 50%);background-size:36px 36px"></div>'
      + '<div style="position:absolute;left:50%;bottom:8px;transform:translateX(-50%)">' + mq(v) + '</div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:406px">'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'
        + v.clothes.map(function(c){ return '<div ' + on(c.tap) + ' style="padding:14px;border-radius:22px;background:' + c.bg + ';border:2px solid ' + c.border + '"><div style="height:56px;border-radius:14px;background:' + c.rang + ';margin-bottom:10px"></div><div style="font:700 17px \'Baloo 2\',system-ui;color:#12303B">' + c.nom + '</div><div style="font:700 12px Nunito;color:' + c.holatRang + '">' + c.holat + '</div></div>'; }).join('')
      + '</div>'
      + '<div ' + on(v.goShop) + ' style="margin-top:14px;height:52px;border-radius:20px;background:#12303B;display:flex;align-items:center;justify-content:center;font:700 16px \'Baloo 2\',system-ui;color:#FFF6E6">Do\'konga — yangi kiyimlar</div>'
    + '</div>'
  + '</div>'; },

oyin:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#9AD2DC,#C8E5E1 40%,#A2C371 62%,#7FA650);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 22px;z-index:5">'
      + backBtn(v.goHome, '#12303B', 'rgba(255,250,240,.94)')
      + '<div style="font:800 22px \'Baloo 2\',system-ui;color:#12303B">Olma tut!</div>'
      + '<div style="display:flex;gap:8px"><div style="height:38px;padding:0 12px;border-radius:19px;background:#FFF8EA;display:flex;align-items:center;font:800 15px \'Baloo 2\',system-ui;color:#C8452F"><span id="g-score">' + v.score + '</span></div><div style="height:38px;padding:0 12px;border-radius:19px;background:#12303B;display:flex;align-items:center;font:800 15px \'Baloo 2\',system-ui;color:#FFF6E6"><span id="g-time">' + v.timeLeft + 's</span></div></div>'
    + '</div>'
    + '<div style="position:absolute;left:0;right:0;top:100px;bottom:0;overflow:hidden">'
      + '<div id="g-items" style="position:absolute;inset:0"></div>'
      + '<div style="position:absolute;left:50%;bottom:34px;transform:translateX(-50%)">' + Momiq({ mood:v.gameMood, hat:v.wearHat, chopon:v.wearChopon, scarf:v.wearScarf, glasses:v.wearGlasses, scale:0.8 }) + '</div>'
      + '<div id="g-idle" style="position:absolute;inset:0;background:rgba(18,48,59,.55);display:' + (v.gameIdle ? 'flex' : 'none') + ';flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:0 40px;text-align:center">'
        + '<div id="g-title" style="font:800 30px/1.2 \'Baloo 2\',system-ui;color:#FFF6E6">' + v.gameTitle + '</div>'
        + '<div style="font:600 14px/1.5 Nunito;color:rgba(255,246,230,.8);max-width:250px">Tushayotgan olma va sabzilarni bosib Momiqqa tutib bering. Har biri 2 tanga.</div>'
        + '<div id="g-btn" ' + on(v.startGame) + ' style="height:58px;padding:0 34px;border-radius:20px;background:#E9A62B;box-shadow:0 6px 0 #B67B14;display:flex;align-items:center;font:800 20px \'Baloo 2\',system-ui;color:#3B2A1E">' + v.gameBtn + '</div>'
      + '</div>'
    + '</div>'
  + '</div>'; },

dokon:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:linear-gradient(180deg,#12303B 0 180px,#FBF3E4 180px);animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:76px;display:flex;align-items:center;gap:14px;padding:0 22px">'
      + backBtn(v.goHome, '#FFF6E6', 'rgba(255,248,234,.16)')
      + '<div style="font:800 26px \'Baloo 2\',system-ui;color:#FFF6E6">Do\'kon</div>'
      + '<div style="margin-left:auto;display:flex;align-items:center;gap:7px;height:38px;padding:0 14px 0 8px;border-radius:19px;background:rgba(255,248,234,.16)"><span style="width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 34% 30%,#F6CF6A,#E9A62B)"></span><span style="font:800 16px \'Baloo 2\',system-ui;color:#FFF6E6">' + v.coins + '</span></div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:100px;padding:16px 18px;border-radius:24px;background:rgba(255,248,234,.1);border:1px solid rgba(255,246,230,.2)"><div style="font:700 13px/1.5 Nunito;color:rgba(255,246,230,.85)">Tanga mini-o\'yinlarda va Momiqni parvarish qilganda yig\'iladi. Haqiqiy pul talab qilinmaydi.</div></div>'
    + '<div style="position:absolute;left:22px;right:22px;top:210px;display:flex;flex-direction:column;gap:12px">'
      + v.shopItems.map(function(s){ return '<div style="display:flex;align-items:center;gap:14px;padding:14px;border-radius:20px;background:#FFFAF0;border:1px solid rgba(18,48,59,.08);box-shadow:0 3px 12px rgba(18,48,59,.07);animation:kort .4s ease-out both"><div style="width:54px;height:54px;border-radius:16px;background:' + s.rang + '"></div><div style="flex:1"><div style="font:700 19px \'Baloo 2\',system-ui;color:#12303B">' + s.nom + '</div><div style="font:600 12px Nunito;color:rgba(18,48,59,.55)">' + s.izoh + '</div></div><div ' + on(s.tap) + ' style="height:42px;padding:0 18px;border-radius:16px;display:flex;align-items:center;font:800 14px \'Baloo 2\',system-ui;color:' + s.btnRang + ';background:' + s.btnBg + '">' + s.btn + '</div></div>'; }).join('')
    + '</div>'
  + '</div>'; },

sozlamalar:function(v){ return ''
  + '<div style="position:absolute;inset:0;background:#FBF3E4;animation:ekranKir .34s cubic-bezier(.2,.85,.25,1) both">'
    + '<div style="position:absolute;left:0;right:0;top:16px;height:76px;display:flex;align-items:center;gap:14px;padding:0 22px">'
      + backBtn(v.goHome, '#12303B', 'rgba(255,250,240,.94)')
      + '<div style="font:800 26px \'Baloo 2\',system-ui;color:#12303B">Sozlamalar</div>'
    + '</div>'
    + '<div style="position:absolute;left:22px;right:22px;top:110px;display:flex;flex-direction:column;gap:12px">'
      + v.toggles.map(function(t){ return '<div ' + on(t.tap) + ' style="display:flex;align-items:center;gap:14px;padding:16px;border-radius:20px;background:#FFFAF0;border:1px solid rgba(18,48,59,.08);box-shadow:0 3px 12px rgba(18,48,59,.07)"><div style="flex:1"><div style="font:700 17px \'Baloo 2\',system-ui;color:#12303B">' + t.nom + '</div><div style="font:600 11.5px Nunito;color:rgba(18,48,59,.5)">' + t.izoh + '</div></div><div style="width:52px;height:30px;border-radius:15px;padding:3px;transition:background .2s;background:' + t.trackBg + '"><div style="width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 2px 4px rgba(0,0,0,.2);transition:transform .2s;transform:' + t.knob + '"></div></div></div>'; }).join('')
      + '<div style="margin-top:8px;padding:18px;border-radius:22px;background:rgba(30,122,140,.09);border:1px dashed rgba(30,122,140,.4)"><div style="font:700 14px \'Baloo 2\',system-ui;color:#16606F;margin-bottom:4px">Ota-onalar uchun</div><div style="font:600 12px/1.6 Nunito;color:rgba(18,48,59,.6)">Reklama yo\'q, xarid yo\'q. O\'yin vaqtini kuniga 20 daqiqa qilib belgilash mumkin.</div></div>'
      + '<div ' + on(v.goMenu) + ' style="margin-top:6px;height:52px;border-radius:20px;background:#FFF8EA;border:2px solid rgba(18,48,59,.14);display:flex;align-items:center;justify-content:center;font:700 15px \'Baloo 2\',system-ui;color:#12303B">Bosh menyuga</div>'
    + '</div>'
  + '</div>'; }

};

function backBtn(fn, stroke, bg){ return '<div ' + on(fn) + ' style="width:40px;height:40px;border-radius:20px;background:' + bg + ';display:flex;align-items:center;justify-content:center;flex:none"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="' + stroke + '" stroke-width="2.4" stroke-linecap="round"><path d="M14.5 5.5 8 12l6.5 6.5"></path></svg></div>'; }

function levelUpOverlay(v){ return ''
  + '<div style="position:absolute;inset:0;z-index:20;background:rgba(18,48,59,.55);display:flex;align-items:center;justify-content:center;pointer-events:none">'
    + '<div style="position:relative;width:280px;padding:26px 24px;border-radius:28px;background:#FFF8EA;border:4px solid #E9A62B;box-shadow:0 14px 34px rgba(0,0,0,.3);text-align:center;animation:pop .5s cubic-bezier(.2,1.5,.4,1) both">'
      + '<div style="position:absolute;left:50%;top:50%;width:330px;height:330px;margin:-165px 0 0 -165px;border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(233,166,43,.22) 0 3deg,transparent 3deg 26deg);animation:aylan 16s linear infinite;pointer-events:none"></div>'
      + '<div style="font:700 11px Nunito;letter-spacing:.28em;color:#C8452F;text-transform:uppercase">Yangi daraja</div>'
      + '<div style="font:800 46px/1 \'Baloo 2\',system-ui;color:#12303B;margin:8px 0 4px">' + v.daraja + '</div>'
      + '<div style="font:600 13px Nunito;color:rgba(18,48,59,.6)">' + v.nom + ' kattaroq bo\'ldi · +20 tanga</div>'
    + '</div>'
  + '</div>'; }

/* ---------- Render ---------- */
var stage = document.getElementById('stage');
var mountedScreen = null;

function attach(){
  var els = stage.querySelectorAll('[data-a]');
  for(var i = 0; i < els.length; i++){
    (function(el){
      var fn = H[+el.getAttribute('data-a')];
      if(fn) el.addEventListener('click', function(e){ e.stopPropagation(); haptic(); fn(); });
    })(els[i]);
  }
}

function render(){
  var v = G.renderVals();
  H = [];
  var fn = SCREENS[G.state.screen] || SCREENS.menu;
  var html = fn(v);
  if(v.levelUp) html += levelUpOverlay(v);
  stage.innerHTML = html;
  attach();
}

function itemHTML(it){
  return '<div data-id="' + it.id + '" style="position:absolute;top:-70px;width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 15px \'Baloo 2\',system-ui;color:#fff;cursor:pointer;box-shadow:0 4px 10px rgba(18,48,59,.2);animation:tush 3s linear forwards;left:' + it.left + '%;background:' + it.rang + ';animation-duration:' + it.dur + '">' + it.harf + '</div>';
}

function renderGameLive(){
  var v = G.renderVals();
  var sc = document.getElementById('g-score'); if(sc) sc.textContent = v.score;
  var tm = document.getElementById('g-time'); if(tm) tm.textContent = v.timeLeft + 's';
  var layer = document.getElementById('g-items');
  if(layer){
    var want = {}; G.state.gItems.forEach(function(it){ want[it.id] = it; });
    var kids = Array.prototype.slice.call(layer.children);
    kids.forEach(function(c){ if(!want[c.getAttribute('data-id')]) c.remove(); });
    var have = {}; Array.prototype.slice.call(layer.children).forEach(function(c){ have[c.getAttribute('data-id')] = 1; });
    G.state.gItems.forEach(function(it){
      if(!have[it.id]){
        layer.insertAdjacentHTML('beforeend', itemHTML(it));
        var el = layer.querySelector('[data-id="' + it.id + '"]');
        if(el) el.addEventListener('click', function(e){ e.stopPropagation(); haptic(); G.tapItem(it.id); });
      }
    });
  }
  var idle = document.getElementById('g-idle');
  if(idle){
    idle.style.display = v.gameIdle ? 'flex' : 'none';
    if(v.gameIdle){
      var t = document.getElementById('g-title'); if(t) t.textContent = v.gameTitle;
      var b = document.getElementById('g-btn');
      if(b){ b.textContent = v.gameBtn; b.onclick = function(){ haptic(); v.startGame(); }; }
    }
  }
  if(v.levelUp && !document.getElementById('lvlup')){
    var d = document.createElement('div'); d.id = 'lvlup'; d.innerHTML = levelUpOverlay(v); stage.appendChild(d.firstChild);
  }
}

function update(){
  var scr = G.state.screen;
  if(scr !== mountedScreen){ G.stopGameIfLeaving(scr); render(); mountedScreen = scr; return; }
  if(scr === 'oyin'){ renderGameLive(); return; }
  render();
}
G.stopGameIfLeaving = function(next){ if(mountedScreen === 'oyin' && next !== 'oyin') this.stopGame(); };

/* ---------- Haptic (Telegram) ---------- */
var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
function haptic(){
  if(G.state.titrash && tg && tg.HapticFeedback){ try{ tg.HapticFeedback.impactOccurred('light'); }catch(e){} }
}

/* ---------- Saqlash (localStorage + Telegram CloudStorage) ---------- */
var SAVE_KEYS = ['coins','hunger','joy','energy','clean','wear','owned','sound','music','titrash','nazorat','giftTaken','kun','nom','nomSet','xp','daraja','harfIndex','organgan','inglizIndex','fanlar','hisob','olingan'];
var _saveT = null;
function snapshot(){ var o = { _v:1, _t:Date.now() }; SAVE_KEYS.forEach(function(k){ o[k] = G.state[k]; }); return o; }
function applySnap(o){ if(!o) return; SAVE_KEYS.forEach(function(k){ if(o[k] !== undefined) G.state[k] = o[k]; }); }
function save(){
  clearTimeout(_saveT);
  _saveT = setTimeout(function(){
    var json = JSON.stringify(snapshot());
    try{ localStorage.setItem('momiq', json); }catch(e){}
    if(tg && tg.CloudStorage){ try{ tg.CloudStorage.setItem('momiq', json, function(){}); }catch(e){} }
  }, 700);
}
function loadLocal(){ try{ var j = localStorage.getItem('momiq'); if(j) applySnap(JSON.parse(j)); }catch(e){} }

/* ---------- Ekranga moslash (scale) ---------- */
function fit(){
  var w = window.innerWidth, h = window.innerHeight;
  var s = Math.min(w / 390, h / 844);
  stage.style.transform = 'translate(-50%,-50%) scale(' + s + ')';
}

/* ---------- Ishga tushirish ---------- */
function boot(){
  loadLocal();
  if(tg){
    try{ tg.ready(); tg.expand(); tg.setHeaderColor && tg.setHeaderColor('#7FC3D2'); tg.setBackgroundColor && tg.setBackgroundColor('#12303B'); }catch(e){}
    if(tg.CloudStorage){
      try{ tg.CloudStorage.getItem('momiq', function(err, val){
        if(!err && val){ try{ var cloud = JSON.parse(val); var loc = null; try{ loc = JSON.parse(localStorage.getItem('momiq')); }catch(e){}
          if(!loc || (cloud._t || 0) >= (loc._t || 0)){ applySnap(cloud); if(G.state.screen==='menu') render(); } }catch(e){} }
      }); }catch(e){}
    }
  }
  fit();
  render();
  mountedScreen = G.state.screen;
  G.mount();
}
window.addEventListener('resize', fit);
window.addEventListener('orientationchange', fit);
boot();
