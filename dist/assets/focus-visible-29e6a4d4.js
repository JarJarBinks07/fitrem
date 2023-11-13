var __defProp=Object.defineProperty;var __name=(target,value)=>__defProp(target,"name",{value,configurable:!0});/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const ION_FOCUSED="ion-focused",ION_FOCUSABLE="ion-focusable",FOCUS_KEYS=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],startFocusVisible=__name(rootEl=>{let currentFocus=[],keyboardMode=!0;const ref=rootEl?rootEl.shadowRoot:document,root=rootEl||document.body,setFocus=__name(elements=>{currentFocus.forEach(el=>el.classList.remove(ION_FOCUSED)),elements.forEach(el=>el.classList.add(ION_FOCUSED)),currentFocus=elements},"setFocus"),pointerDown=__name(()=>{keyboardMode=!1,setFocus([])},"pointerDown"),onKeydown=__name(ev=>{keyboardMode=FOCUS_KEYS.includes(ev.key),keyboardMode||setFocus([])},"onKeydown"),onFocusin=__name(ev=>{if(keyboardMode&&ev.composedPath!==void 0){const toFocus=ev.composedPath().filter(el=>el.classList?el.classList.contains(ION_FOCUSABLE):!1);setFocus(toFocus)}},"onFocusin"),onFocusout=__name(()=>{ref.activeElement===root&&setFocus([])},"onFocusout");return ref.addEventListener("keydown",onKeydown),ref.addEventListener("focusin",onFocusin),ref.addEventListener("focusout",onFocusout),ref.addEventListener("touchstart",pointerDown,{passive:!0}),ref.addEventListener("mousedown",pointerDown),{destroy:__name(()=>{ref.removeEventListener("keydown",onKeydown),ref.removeEventListener("focusin",onFocusin),ref.removeEventListener("focusout",onFocusout),ref.removeEventListener("touchstart",pointerDown),ref.removeEventListener("mousedown",pointerDown)},"destroy"),setFocus}},"startFocusVisible");export{startFocusVisible};