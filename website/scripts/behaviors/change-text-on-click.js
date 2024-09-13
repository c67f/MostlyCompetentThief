import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

let clickedTextElements = document.getElementsByClassName("click-change");
//console.log(clickedTextElements[0]);

for (let i = 0; i < clickedTextElements.length; i++) {

    const clickedText = clickedTextElements[i];
    /*Uncomment to add "link" styling to text (blue and underlined when not clicked)
    clickedText.style.color = '#0000AA';
    clickedText.style.textDecoration = 'underline';*/

    clickedText.addEventListener("click", (event) => {
        console.log('clicked');
        let t1 = createTimeline({
            duration: 500, //duration doesn't actually work with textContent, it seems
        });
        t1.add(clickedText, {
            /*Part of the above-mentioned "link" styling - uncomment this as well to have the new text have no underline and be colored black
            textDecorationLine: 'none',
            color: '#FFFFFF',*/
            textContent: clickedText.dataset.newText,
        })
    });
}
