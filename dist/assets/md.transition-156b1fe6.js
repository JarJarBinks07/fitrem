var __defProp=Object.defineProperty;var __name=(target,value)=>__defProp(target,"name",{value,configurable:!0});import{o as getIonPageElement,m as createAnimation}from"./index-1329dee8.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const mdTransitionAnimation=__name((_,opts)=>{var _a,_b,_c;const OFF_BOTTOM="40px",CENTER="0px",backDirection=opts.direction==="back",enteringEl=opts.enteringEl,leavingEl=opts.leavingEl,ionPageElement=getIonPageElement(enteringEl),enteringToolbarEle=ionPageElement.querySelector("ion-toolbar"),rootTransition=createAnimation();if(rootTransition.addElement(ionPageElement).fill("both").beforeRemoveClass("ion-page-invisible"),backDirection?rootTransition.duration(((_a=opts.duration)!==null&&_a!==void 0?_a:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)"):rootTransition.duration(((_b=opts.duration)!==null&&_b!==void 0?_b:0)||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY(".concat(OFF_BOTTOM,")"),"translateY(".concat(CENTER,")")).fromTo("opacity",.01,1),enteringToolbarEle){const enteringToolBar=createAnimation();enteringToolBar.addElement(enteringToolbarEle),rootTransition.addAnimation(enteringToolBar)}if(leavingEl&&backDirection){rootTransition.duration(((_c=opts.duration)!==null&&_c!==void 0?_c:0)||200).easing("cubic-bezier(0.47,0,0.745,0.715)");const leavingPage=createAnimation();leavingPage.addElement(getIonPageElement(leavingEl)).onFinish(currentStep=>{currentStep===1&&leavingPage.elements.length>0&&leavingPage.elements[0].style.setProperty("display","none")}).fromTo("transform","translateY(".concat(CENTER,")"),"translateY(".concat(OFF_BOTTOM,")")).fromTo("opacity",1,0),rootTransition.addAnimation(leavingPage)}return rootTransition},"mdTransitionAnimation");export{mdTransitionAnimation};