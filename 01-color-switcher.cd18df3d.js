!function(){var t,e=document.querySelector("body"),r=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");a.setAttribute("disabled",""),r.addEventListener("click",(function(r){r.target.setAttribute("disabled",""),a.removeAttribute("disabled"),t=setInterval((function(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),a.addEventListener("click",(function(e){e.target.setAttribute("disabled",""),r.removeAttribute("disabled"),clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.cd18df3d.js.map
