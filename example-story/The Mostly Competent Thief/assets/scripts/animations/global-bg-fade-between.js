import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.min.js';

const bodyTagsArray = document.getElementsByTagName("body");
//console.log(bodyTagsArray);

for (let i = 0; i < bodyTagsArray.length; i++) {
    const bodyTag = bodyTagsArray[i];
    console.log(bodyTag);
    console.log(bodyTag.style.backgroundColor)
    //bodyTag.style.backgroundColor = "white";
    createTimeline({
        defaults: {
            duration:5000,
            easing: "linear",
        }
    }).add(bodyTag, {
        backgroundColor: ["#000000", "#FFFFFF"],
    });
}
