const t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),body:document.body};let n=null;t.btnStart.addEventListener("click",(function(){n=setInterval((()=>{t.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`,t.btnStart.disabled=!0,t.btnStop.disabled=!1}),1e3)})),t.btnStop.addEventListener("click",(function(){clearInterval(n),t.btnStart.disabled=!1,t.btnStop.disabled=!0})),t.btnStop.disabled=!0;
//# sourceMappingURL=01-color-switcher.1a238d75.js.map