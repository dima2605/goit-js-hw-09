const t={body:document.querySelector("body"),startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let e=null;t.startBtn.addEventListener("click",(function(){e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.startBtn.disabled=!0})),t.stopBtn.addEventListener("click",(function(){t.startBtn.disabled=!1,clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.27829f90.js.map