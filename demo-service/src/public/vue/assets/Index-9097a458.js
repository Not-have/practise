import{e as a,j as m,k as d,o as u,c,l as f,g as r,t as x,m as l,w as g,v as h,n as v,F as i,b as V,h as _}from"./index-e20f5daa.js";const R={ref:"el"},T=a({__name:"SetupProps",setup(n){const e=m({count:0}),t=d(e);return e.count++,console.log(t.count),(o,s)=>(u(),c("div",R," API 的基础使用 ",512))}});function k(n,e=200){let t=null;return f((o,s)=>({get(){return o(),n},set(p){clearTimeout(t),t=setTimeout(()=>{n=p,s()},e)}}))}const y=r("p",null," 此文本仅在您停止输入后 1 秒更新： ",-1),B=a({__name:"CustomRef",setup(n){const e=k("hello",1e3);return(t,o)=>(u(),c(i,null,[y,r("p",null,x(l(e)),1),g(r("input",{"onUpdate:modelValue":o[0]||(o[0]=s=>v(e)?e.value=s:null)},null,512),[[h,l(e)]])],64))}}),D=a({__name:"Index",setup(n){return(e,t)=>(u(),c(i,null,[V(" Vue3 Composition(组合式) API使用 "),_(T),_(B)],64))}});export{D as default};
