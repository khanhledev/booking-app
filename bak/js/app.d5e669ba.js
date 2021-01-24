(function(t){function e(e){for(var o,s,a=e[0],l=e[1],c=e[2],u=0,f=[];u<a.length;u++)s=a[u],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(o=!1)}o&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},r={app:0},i=[];function s(t){return a.p+"js/"+({about:"about"}[t]||t)+"."+{about:"0d12400f"}[t]+".js"}function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(t){var e=[],n=r[t];if(0!==n)if(n)e.push(n[2]);else{var o=new Promise((function(e,o){n=r[t]=[e,o]}));e.push(n[2]=o);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,a.nc&&l.setAttribute("nonce",a.nc),l.src=s(t);var c=new Error;i=function(e){l.onerror=l.onload=null,clearTimeout(u);var n=r[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",c.name="ChunkLoadError",c.type=o,c.request=i,n[1](c)}r[t]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(e)},a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/",a.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"1f68":function(t,e,n){},3443:function(t,e,n){"use strict";n("ccd6")},"56d7":function(t,e,n){"use strict";n.r(e);n("1951"),n("450d");var o=n("eedf"),r=n.n(o),i=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),s=(n("1f68"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)}),a=[],l=(n("034f"),n("2877")),c={},u=Object(l["a"])(c,s,a,!1,null,null,null),d=u.exports,f=(n("d3b7"),n("8c4f")),m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.fetching?t._e():n("div",{staticClass:"container my-12 mx-auto px-4 md:px-12"},[n("h1",{staticClass:"text-center font-bold text-5xl mb-8"},[t._v("Booking Meeting Room")]),n("div",{staticClass:"flex flex-wrap -mx-1 lg:-mx-4"},t._l(t.listMeetings,(function(e,o){return n("div",{key:o,staticClass:"my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"},[n("article",{staticClass:"overflow-hidden rounded-lg shadow-md mb-8 transition hover:shadow-lg"},[n("div",{staticClass:"card-image bg-gray-200"},[n("img",{staticClass:"block h-auto w-full",attrs:{alt:"Placeholder",src:"https://picsum.photos/600/400/?random="+o}})]),n("header",{staticClass:"flex items-center justify-center leading-tight p-2 md:p-4"},[n("h1",{staticClass:"text-lg text-black font-bold"},[t._v(" "+t._s(0!==o?o+3+"th Floor":o+3+"rd Floor")+" ")])]),n("div",{staticClass:"list p-x2 md:px-4"},t._l(e.list,(function(e,o){return n("div",{key:e.id,staticClass:"list-item flex justify-between items-center mb-2 md:mb-4"},[n("div",{staticClass:"owner flex items-center"},[n("img",{staticClass:"block rounded-full",attrs:{alt:"Placeholder",src:"https://picsum.photos/32/32/?random="+o}}),n("span",{staticClass:"font-medium ml-2"},[t._v(t._s(e.user))])]),n("div",{staticClass:"time text-white font-medium bg-gray-400 p-2 rounded-lg"},[t._v(t._s(e.time_start)+" - "+t._s(e.time_end)+" ")])])})),0),n("footer",{staticClass:"flex items-center leading-none p-2 md:p-4"},[n("button",{staticClass:"bg-blue-500 text-white font-medium p-3 rounded-lg w-full",on:{click:function(e){return t.onClick(o)}}},[t._v("Booking")])])])])})),0),t.visible?n("ModalCreate",{attrs:{visible:t.visible,"room-id":t.floor},on:{"update:visible":function(e){t.visible=e}}}):t._e()],1)},p=[],b=(n("96cf"),n("1da1")),v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"antialiased bg-gray-200 bg-opacity-75 text-gray-900 font-sans overflow-x-hidden fixed top-0 left-0 w-full"},[n("div",{staticClass:"relative px-4 min-h-screen md:flex md:items-center md:justify-center"},[n("div",{staticClass:"modal-overlay w-full h-full absolute z-10 inset-0",on:{click:t.onClose}}),n("div",{staticClass:"bg-white rounded-lg w-full md:max-w-screen-sm md:mx-auto p-8 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative"},[n("h2",{staticClass:"text-center font-semibold text-2xl mb-6"},[t._v("Finish booking meeting room - "+t._s(0!==t.roomId?t.roomId+3+"th Floor":t.roomId+3+"rd Floor")+" ")]),n("div",{staticClass:"md:flex items-center"},[n("form",{staticClass:"contact-form w-full",attrs:{autocomplete:"off"}},[t._m(0),t._m(1),n("div",{staticClass:"contact-form-group mb-6"},[n("p",{staticClass:"font-semibold mb-2"},[t._v("Start time:")]),n("div",{staticClass:"flex-shrink w-full inline-block relative"},[t._m(2),n("div",{staticClass:"pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600"},[n("svg",{staticClass:"fill-current h-4 w-4",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])]),n("div",{staticClass:"contact-form-group mb-6"},[n("p",{staticClass:"font-semibold mb-2"},[t._v("End time:")]),n("div",{staticClass:"flex-shrink w-full inline-block relative"},[t._m(3),n("div",{staticClass:"pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600"},[n("svg",{staticClass:"fill-current h-4 w-4",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])])])]),n("div",{staticClass:"text-center md:text-right mt-4 md:flex md:justify-end"},[n("button",{staticClass:"block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-blue-500 text-white rounded-lg font-bold text-sm md:ml-2 md:order-2"},[t._v("Complete")]),n("button",{staticClass:"block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4\n        md:mt-0 md:order-1",on:{click:t.onClose}},[t._v("Cancel")])])])])])},g=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"contact-form-group mb-6"},[n("p",{staticClass:"font-semibold mb-2"},[t._v("Your name:")]),n("input",{staticClass:"py-2 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full border border-gray-400 transition focus:outline-none focus:ring-1 focus:ring-blue-600",attrs:{id:"name",type:"text",required:""}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"contact-form-group mb-6"},[n("p",{staticClass:"font-semibold mb-2"},[t._v("Meeting goal:")]),n("input",{staticClass:"py-2 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full border border-gray-400 transition focus:outline-none focus:ring-1 focus:ring-blue-600",attrs:{id:"goal",type:"text",required:""}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("select",{staticClass:"block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"},[n("option",[t._v("Please choose one...")]),n("option",[t._v("English")]),n("option",[t._v("France")]),n("option",[t._v("Spanish")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("select",{staticClass:"block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded"},[n("option",[t._v("Please choose one...")]),n("option",[t._v("English")]),n("option",[t._v("France")]),n("option",[t._v("Spanish")])])}],h=(n("a9e3"),{name:"ModalCreate",props:{visible:{type:Boolean,default:!1},roomId:{type:Number,default:0}},methods:{onClose:function(){this.$emit("update:visible",!this.visible)}}}),x=h,w=(n("ef08"),Object(l["a"])(x,v,g,!1,null,"42c0eed7",null)),y=w.exports,C={name:"Home",components:{ModalCreate:y},data:function(){return{visible:!1,floor:0,listMeetings:[],fetching:!0}},created:function(){var t=this;return Object(b["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://62730c53787c9fa535c0418067b788c7.m.pipedream.net/").then((function(e){e.json().then((function(e){t.listMeetings=e.data,t.fetching=!1}))}));case 2:case"end":return e.stop()}}),e)})))()},methods:{onClick:function(t){this.visible=!0,this.floor=t}}},_=C,k=(n("3443"),Object(l["a"])(_,m,p,!1,null,"03e723f7",null)),j=k.exports;i["a"].use(f["a"]);var M=[{path:"/",name:"Home",component:j,meta:{title:"Booking Meeting Room"}},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],O=new f["a"]({mode:"history",base:"/",routes:M}),E=O,P=n("2f62");i["a"].use(P["a"]);var S=new P["a"].Store({state:{},mutations:{},actions:{},modules:{}});i["a"].config.productionTip=!1,i["a"].use(r.a),new i["a"]({router:E,store:S,render:function(t){return t(d)}}).$mount("#app")},"85ec":function(t,e,n){},ccd6:function(t,e,n){},ef08:function(t,e,n){"use strict";n("f057")},f057:function(t,e,n){}});
//# sourceMappingURL=app.d5e669ba.js.map