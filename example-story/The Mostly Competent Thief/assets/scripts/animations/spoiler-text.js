import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

let spoileredElements = document.getElementsByClassName("spoiler");
//console.log(clickedTextElements[0]);

for (let i = 0; i < spoileredElements.length; i++) {
    const spoiler = spoileredElements[i];
    spoiler.style.position = 'relative'
    const spoilerBox = document.createElement('div');
    spoiler.appendChild(spoilerBox);
    //spoilerBox.className = 'fixed-size';
    spoilerBox.style.position = 'absolute';
    spoilerBox.style.margin = '0px';
    spoilerBox.style.borderRadius = '0.2em'
    spoilerBox.innerText = spoiler.innerText;

    spoilerBox.style.background = spoiler.dataset.spoilerColor;
    spoilerBox.style.left = 0;
    spoilerBox.style.top = 0;

    console.log(spoilerBox.getBoundingClientRect().right);
    console.log(spoilerBox.getBoundingClientRect().left);
    spoilerBox.style.width = ((spoilerBox.getBoundingClientRect().right + (spoilerBox.getBoundingClientRect().right * 0.12) - spoilerBox.getBoundingClientRect().left)) + 'px'; //HACKY: For some reason using getBoundingClientRect().right minus left results in a width which is less than the actual width (this also occurs if using getBoundingClientRect().width). For now just adding 30px.
    spoilerBox.style.height = ((spoiler.getBoundingClientRect().bottom - spoiler.getBoundingClientRect().top) + 'px')
    spoilerBox.innerText = '';

    console.log(spoilerBox.style.height);
    console.log(spoilerBox.style.width);
    console.log(spoilerBox.getBoundingClientRect().top);
    console.log(spoiler.getBoundingClientRect().right);
    console.log(spoilerBox);
    
    
    //spoiler.className = 'spoiler-css';

    spoiler.addEventListener("click", (event) => {
        let t1 = createTimeline({});
        t1.add(spoilerBox, {
            opacity: [1, 0],
            duration: 800,
            onComplete: () => {
                spoilerBox.remove();
            }
        })
    });
}