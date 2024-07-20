import{P as x,r,j as o,s as f,t as h,v as J,w as K,p as Q,a as X,x as Y,y as Z,u as P,H as ee,F as se,c as te,C as L,e as ae,k as oe}from"./index-mFqidmet.js";import{s as ne}from"./sweetalert.min-Zd7JIkGb.js";import{p as le}from"./actions-BjvnXCut.js";import{b as re}from"./actions-BdD-Ejgg.js";import{u as ce}from"./useDispatch-BmuRceBY.js";const ie={type:x.string,tooltip:x.bool,as:x.elementType},$=r.forwardRef(({as:e="div",className:s,type:t="valid",tooltip:a=!1,...n},l)=>o.jsx(e,{...n,ref:l,className:f(s,`${t}-${a?"tooltip":"feedback"}`)}));$.displayName="Feedback";$.propTypes=ie;const j=r.createContext({}),R=r.forwardRef(({id:e,bsPrefix:s,className:t,type:a="checkbox",isValid:n=!1,isInvalid:l=!1,as:c="input",...m},p)=>{const{controlId:i}=r.useContext(j);return s=h(s,"form-check-input"),o.jsx(c,{...m,ref:p,type:a,id:e||i,className:f(t,s,n&&"is-valid",l&&"is-invalid")})});R.displayName="FormCheckInput";const v=r.forwardRef(({bsPrefix:e,className:s,htmlFor:t,...a},n)=>{const{controlId:l}=r.useContext(j);return e=h(e,"form-check-label"),o.jsx("label",{...a,ref:n,htmlFor:t||l,className:f(s,e)})});v.displayName="FormCheckLabel";function de(e,s){return r.Children.toArray(e).some(t=>r.isValidElement(t)&&t.type===s)}const T=r.forwardRef(({id:e,bsPrefix:s,bsSwitchPrefix:t,inline:a=!1,reverse:n=!1,disabled:l=!1,isValid:c=!1,isInvalid:m=!1,feedbackTooltip:p=!1,feedback:i,feedbackType:u,className:y,style:F,title:d="",type:C="checkbox",label:g,children:N,as:_="input",...z},U)=>{s=h(s,"form-check"),t=h(t,"form-switch");const{controlId:S}=r.useContext(j),W=r.useMemo(()=>({controlId:e||S}),[S,e]),B=!N&&g!=null&&g!==!1||de(N,v),q=o.jsx(R,{...z,type:C==="switch"?"checkbox":C,ref:U,isValid:c,isInvalid:m,disabled:l,as:_});return o.jsx(j.Provider,{value:W,children:o.jsx("div",{style:F,className:f(y,B&&s,a&&`${s}-inline`,n&&`${s}-reverse`,C==="switch"&&t),children:N||o.jsxs(o.Fragment,{children:[q,B&&o.jsx(v,{title:d,children:g}),i&&o.jsx($,{type:u,tooltip:p,children:i})]})})})});T.displayName="FormCheck";const w=Object.assign(T,{Input:R,Label:v}),E=r.forwardRef(({bsPrefix:e,type:s,size:t,htmlSize:a,id:n,className:l,isValid:c=!1,isInvalid:m=!1,plaintext:p,readOnly:i,as:u="input",...y},F)=>{const{controlId:d}=r.useContext(j);return e=h(e,"form-control"),o.jsx(u,{...y,type:s,size:a,ref:F,readOnly:i,id:n||d,className:f(l,p?`${e}-plaintext`:e,t&&`${e}-${t}`,s==="color"&&`${e}-color`,c&&"is-valid",m&&"is-invalid")})});E.displayName="FormControl";const me=Object.assign(E,{Feedback:$}),O=r.forwardRef(({className:e,bsPrefix:s,as:t="div",...a},n)=>(s=h(s,"form-floating"),o.jsx(t,{ref:n,className:f(e,s),...a})));O.displayName="FormFloating";const k=r.forwardRef(({controlId:e,as:s="div",...t},a)=>{const n=r.useMemo(()=>({controlId:e}),[e]);return o.jsx(j.Provider,{value:n,children:o.jsx(s,{...t,ref:a})})});k.displayName="FormGroup";function pe({as:e,bsPrefix:s,className:t,...a}){s=h(s,"col");const n=J(),l=K(),c=[],m=[];return n.forEach(p=>{const i=a[p];delete a[p];let u,y,F;typeof i=="object"&&i!=null?{span:u,offset:y,order:F}=i:u=i;const d=p!==l?`-${p}`:"";u&&c.push(u===!0?`${s}${d}`:`${s}${d}-${u}`),F!=null&&m.push(`order${d}-${F}`),y!=null&&m.push(`offset${d}-${y}`)}),[{...a,className:f(t,...c,...m)},{as:e,bsPrefix:s,spans:c}]}const D=r.forwardRef((e,s)=>{const[{className:t,...a},{as:n="div",bsPrefix:l,spans:c}]=pe(e);return o.jsx(n,{...a,ref:s,className:f(t,!c.length&&l)})});D.displayName="Col";const A=r.forwardRef(({as:e="label",bsPrefix:s,column:t=!1,visuallyHidden:a=!1,className:n,htmlFor:l,...c},m)=>{const{controlId:p}=r.useContext(j);s=h(s,"form-label");let i="col-form-label";typeof t=="string"&&(i=`${i} ${i}-${t}`);const u=f(n,s,a&&"visually-hidden",t&&i);return l=l||p,t?o.jsx(D,{ref:m,as:"label",className:u,htmlFor:l,...c}):o.jsx(e,{ref:m,className:u,htmlFor:l,...c})});A.displayName="FormLabel";const b=r.forwardRef(({bsPrefix:e,className:s,id:t,...a},n)=>{const{controlId:l}=r.useContext(j);return e=h(e,"form-range"),o.jsx("input",{...a,type:"range",ref:n,className:f(s,e),id:t||l})});b.displayName="FormRange";const M=r.forwardRef(({bsPrefix:e,size:s,htmlSize:t,className:a,isValid:n=!1,isInvalid:l=!1,id:c,...m},p)=>{const{controlId:i}=r.useContext(j);return e=h(e,"form-select"),o.jsx("select",{...m,size:t,ref:p,className:f(a,e,s&&`${e}-${s}`,n&&"is-valid",l&&"is-invalid"),id:c||i})});M.displayName="FormSelect";const G=r.forwardRef(({bsPrefix:e,className:s,as:t="small",muted:a,...n},l)=>(e=h(e,"form-text"),o.jsx(t,{...n,ref:l,className:f(s,e,a&&"text-muted")})));G.displayName="FormText";const V=r.forwardRef((e,s)=>o.jsx(w,{...e,ref:s,type:"switch"}));V.displayName="Switch";const ue=Object.assign(V,{Input:w.Input,Label:w.Label}),H=r.forwardRef(({bsPrefix:e,className:s,children:t,controlId:a,label:n,...l},c)=>(e=h(e,"form-floating"),o.jsxs(k,{ref:c,className:f(s,e),controlId:a,...l,children:[t,o.jsx("label",{htmlFor:a,children:n})]})));H.displayName="FloatingLabel";const fe={_ref:x.any,validated:x.bool,as:x.elementType},I=r.forwardRef(({className:e,validated:s,as:t="form",...a},n)=>o.jsx(t,{...a,ref:n,className:f(e,s&&"was-validated")}));I.displayName="Form";I.propTypes=fe;const he=Object.assign(I,{Group:k,Control:me,Floating:O,Check:w,Switch:ue,Label:A,Text:G,Range:b,Select:M,FloatingLabel:H}),xe=()=>{const e=Q(),s=ce(),t=X(d=>d.cartReducer1.cartData),a=e.state.filteredAddress,n=e.state.paymentData,l=(Math.round(n.total*100)/100).toFixed(2),[,c]=r.useState(!1),m=Y(),p=Z(),i=P(),u={iconStyle:"solid",style:{base:{iconColor:"#03BFB9",color:"black",fontWeight:500,fontFamily:"Roboto, Open Sans, Segoe UI, sans-serif",fontSize:"16px",fontSmoothing:"antialiased",":-webkit-autofill":{color:"#03BFB9"},"::placeholder":{color:"#03BFB9"}},invalid:{iconColor:"red",color:"red"}}},y=[];t.forEach(d=>{d.id&&y.push(d.id)});const F=async d=>{d.preventDefault();const{error:C}=await m.createPaymentMethod({type:"card",card:p.getElement(L)});if(C)console.log(C.message);else{const g={amount:parseInt(l)*100};oe.post("http://localhost:4000/payment",g).then(N=>{N.data.success&&(ne({title:"Payment Successful!",icon:"success"}),s(le(n.cartData,a)),s(re(y)),i("/orders",{state:{cartData:t,address:a}}),c(!0))}).catch(N=>{console.log("Error",N)})}};return o.jsxs("div",{id:"page-container",children:[o.jsx(ee,{}),o.jsx("div",{id:"content-wrap",children:o.jsx("div",{className:"small-container",id:"content-wrap",children:o.jsxs(he,{onSubmit:d=>{F(d)},children:[o.jsxs("div",{children:[o.jsxs("p",{children:["Amount: ",o.jsx(se,{icon:te})," ",parseInt(l)]}),o.jsx(L,{options:u})]}),o.jsx("button",{className:"btn1",children:"Pay"})]})})}),o.jsx(ae,{})]})};export{xe as default};
