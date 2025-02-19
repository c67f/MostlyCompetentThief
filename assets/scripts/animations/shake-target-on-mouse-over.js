import { Animatable, animate, createAnimatable, createTimeline, utils, stagger } from "../anime-beta-master/lib/anime.min.esm.js";

const shakeOtherArray = document.getElementsByClassName("shake-other-mouse-over")


for (let i = 0; i < shakeOtherArray.length; i++) {
    let shook = false;
    const shakeOther = shakeOtherArray[i];
    function animateShake(animTarget){
        console.log("animateShake");
        const t1 = createTimeline({
            loop:3
        })
        t1.add(animTarget, {
            translateX: 20,
            translateY: 10,
            duration: 40
        }).add(animTarget, {
            translateX: 20,
            translateY: -10,
            duration: 40
        }).add(animTarget, {
            translateX: -20,
            translateY: 0,
            duration: 40
        }).add(animTarget, {
            translateX: -20,
            translateY: 20,
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
            console.log(shakeTarget);
            console.log("shaking");
            animateShake(shakeTarget);
        }
        shook = true;
    })
}