import { Animatable, animate, createAnimatable, createTimeline, utils, stagger } from "../anime-beta-master/lib/anime.esm.min.js";

const shakeOtherArray = document.getElementsByClassName("shake-other-mouse-over")


for (let i = 0; i < shakeOtherArray.length; i++) {
    let shook = false;
    const shakeOther = shakeOtherArray[i];
    function animateShake(animTarget, shakeMult){
        console.log("animateShake");
        let m = shakeMult;
        const t1 = createTimeline({
            loop:3
        })
        t1.add(animTarget, {
            translateX: 2*m,
            translateY: 1*m,
            duration: 40
        }).add(animTarget, {
            translateX: 2*m,
            translateY: -1*m,
            duration: 40
        }).add(animTarget, {
            translateX: -2*m,
            translateY: 0,
            duration: 40
        }).add(animTarget, {
            translateX: -2*m,
            translateY: 2*m,
            duration: 40
        }).add(animTarget, {
            translateX: 0, //coordinates are absolute
            translateY: 0,
            duration: 40
        })
    }
    shakeOther.addEventListener("mouseenter", (e) => {
        if (!shook){
            console.log(shakeOther.dataset.shakeTarget);
            const shakeTarget = document.getElementById(shakeOther.dataset.shakeTarget);
            const shakeMult = Number(shakeOther.dataset.shakeMultiplier);
            console.log("shaking");
            animateShake(shakeTarget, shakeMult);
        }
        shook = true;
    })
}