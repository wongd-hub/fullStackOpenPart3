(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{24:function(e,n,t){},44:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t.n(r),o=t(18),u=t.n(o),s=(t(24),t(19)),a=t(3),l=t(5),i=t.n(l),d="/api/persons",b=function(){return i.a.get(d).then((function(e){return e.data}))},j=function(e){return i.a.post(d,e).then((function(e){return e.data}))},m=function(e){return i.a.delete("".concat(d,"/").concat(e))},f=t(0),h=function(e){return Object(f.jsxs)("form",{children:["filter shown with: ",Object(f.jsx)("input",{value:e.filter,onChange:e.changeFilterHandler})]})},g=function(e){return Object(f.jsxs)("form",{onSubmit:e.submitHandler,children:[Object(f.jsx)("h2",{children:"Add a new contact"}),Object(f.jsxs)("div",{children:["name: ",Object(f.jsx)("input",{value:e.newName,onChange:e.changeHandler}),Object(f.jsx)("br",{}),"number: ",Object(f.jsx)("input",{value:e.newNumber,onChange:e.changeNumberHandler})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"add"})})]})},O=function(e){var n=e.message,t=e.style;return null===n?null:Object(f.jsx)("div",{style:t,children:Object(f.jsx)("p",{children:n})})},p=function(){var e=Object(r.useState)([{name:"Arto Hellas",number:"040-1234567"}]),n=Object(a.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)(""),u=Object(a.a)(o,2),l=u[0],i=u[1],d=Object(r.useState)(""),p=Object(a.a)(d,2),x=p[0],w=p[1],y=Object(r.useState)(""),v=Object(a.a)(y,2),C=v[0],H=v[1],S=Object(r.useState)({message:null,style:null}),k=Object(a.a)(S,2),N=k[0],B=k[1];Object(r.useEffect)((function(){b().then((function(e){c(e)}))}),[]);var F=[];return F=""===C?t:t.filter((function(e){return e.name.toLowerCase().includes(C.toLowerCase())})),Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(O,{message:N.message,style:N.style}),Object(f.jsx)(h,{filter:C,changeFilterHandler:function(e){return H(e.target.value)}}),Object(f.jsx)(g,{submitHandler:function(e){if((e.preventDefault(),t.map((function(e){return e.name})).filter((function(e){return e.toLowerCase()===l.toLowerCase()})))&&!window.confirm("".concat(l," is already in the phonebook, replace the old number with a new one?")))return i(""),w(""),null;j({name:l,number:x}).then((function(e){c([].concat(Object(s.a)(t),[e]))})).then((function(e){B({message:"Added successfully",style:{border:"3px solid green",color:"green",marginBottom:"30px"}}),setTimeout((function(){B({message:null,style:null})}),5e3)})).catch((function(e){B({message:"Unsuccessful in adding",style:{border:"3px solid red",color:"red",marginBottom:"30px"}}),setTimeout((function(){B({message:null,style:null})}),5e3)})),i(""),w("")},newName:l,changeHandler:function(e){return i(e.target.value)},newNumber:x,changeNumberHandler:function(e){return w(e.target.value)}}),Object(f.jsx)("h2",{children:"Numbers"}),F.map((function(e){return Object(f.jsxs)("p",{children:[e.name," ",e.number," ",Object(f.jsx)("button",{onClick:function(){return n=e.id,void(window.confirm("Do you really want to delete person ".concat(n,"?"))&&m(n).then((function(){b().then((function(e){c(e)}))})).then((function(e){B({message:"Deleted successfully",style:{border:"3px solid green",color:"green",marginBottom:"30px"}}),setTimeout((function(){B({message:null,style:null})}),5e3)})).catch((function(e){B({message:"Unsuccessful in deleting",style:{border:"3px solid red",color:"red",marginBottom:"30px"}}),setTimeout((function(){B({message:null,style:null})}),5e3)})));var n},children:"Delete"})]},e.name+e.number)}))]})},x=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,45)).then((function(n){var t=n.getCLS,r=n.getFID,c=n.getFCP,o=n.getLCP,u=n.getTTFB;t(e),r(e),c(e),o(e),u(e)}))};u.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(p,{})}),document.getElementById("root")),x()}},[[44,1,2]]]);
//# sourceMappingURL=main.b4eda0b5.chunk.js.map