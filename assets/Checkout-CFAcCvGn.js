import{u as b,p as A,a as S,r as d,j as s,H as N,F as o,m as w,q as y,e as C}from"./index-mFqidmet.js";import{B as D}from"./ButtonToolbar-BXLyu6co.js";import{g as c,d as k}from"./actions-Dx1m2xZR.js";import{u as E}from"./useDispatch-BmuRceBY.js";const T=()=>{const r=E(),l=b(),i=A().state,a=S(e=>e.addressReducer.addressData),[M,h]=d.useState(!1),[P,u]=d.useState(!1),[_,x]=d.useState({name:"",mobile:"",fullAddress:"",pincode:"",city:"",state:"",id:0}),[n,j]=d.useState(a.length>0?a[0].id:0);d.useEffect(()=>{r(c())},[]);const p=e=>{r(k(e)),r(c())},m=e=>{j(parseInt(e.target.value))},f=()=>{const e=a.filter(t=>{if(t.id===n)return t})[0];l("/payment",{state:{paymentData:i,filteredAddress:e}})},v=e=>{x(e),u(!0)};return s.jsxs("div",{id:"page-container",children:[s.jsx(N,{}),s.jsxs("div",{className:"small-container cart-page",id:"content-wrap",children:[s.jsxs("div",{className:"row row-2-address",children:[s.jsx("h3",{children:a.length!==0?"Select Address":"Please add your address"}),s.jsx(D,{children:s.jsx("button",{className:"btn1",onClick:()=>{h(!0)},children:"Add Address"})})]}),s.jsx("div",{children:a.map((e,t)=>s.jsxs("div",{onChange:g=>{m(g)},className:n===e.id?"card-border radio-btn":"radio-btn",children:[s.jsx("div",{children:s.jsx("input",{type:"radio",id:e.id.toString(),name:"address",value:e.id,defaultChecked:t===0,className:"margin20"})}),s.jsxs("label",{htmlFor:e.id.toString(),className:"cursor",children:[s.jsx("div",{children:s.jsxs("div",{children:[s.jsxs("div",{children:[s.jsx("span",{children:s.jsxs("strong",{children:[e.name,"  "," ",e.mobile]})}),s.jsxs("span",{className:"btn-remove cursor",onClick:()=>{p(e.id)},children:["   ",s.jsx(o,{icon:w})]}),s.jsx("span",{className:"btn-remove cursor",onClick:()=>{v(e)},children:s.jsx(o,{icon:y})})]}),s.jsxs("div",{children:[e.fullAddress," , ",e.city]}),s.jsxs("div",{children:[e.state," -"," ",s.jsx("strong",{children:e.pincode})]})]})}),s.jsx("hr",{})]})]},e.id))}),s.jsx("button",{className:"btn1",onClick:()=>{f()},disabled:a.length===0,children:"Go to Payment"})]}),s.jsx(C,{})]})};export{T as default};
