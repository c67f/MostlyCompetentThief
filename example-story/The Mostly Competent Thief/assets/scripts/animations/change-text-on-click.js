import { animate, createTimeline, defaults, utils } from '../anime-beta-master/lib/anime.esm.js';

let clickedTextElements = document.getElementsByClassName("click-change");
//console.log(clickedTextElements[0]);

for (let i = 0; i < clickedTextElements.length; i++) {
    const clickedText = clickedTextElements[i];
    console.log(clickedText.style.color);
    clickedText.style.color = '#0000AA';
    clickedText.style.textDecoration = 'underline';
    console.log(clickedText.style.color);
    //console.log(clickedText);
    clickedText.addEventListener("click", (event) => {
        //console.log(clickedText);
        //console.log(clickedText.dataset.timer);
        //console.log(clickedText.dataset.newText);
        
        //without anime.js:
        //clickedText.style.textDecorationLine = 'none';
        //clickedText.style.color = '#EEEEEE';
        //clickedText.textContent = clickedText.dataset.newText;
        let t1 = createTimeline({
            duration: 500, //duration doesn't actually work with textContent, it seems
        });
        t1.add(clickedText, {
            textDecorationLine: 'none',
            color: '#EEEEEE',
            textContent: clickedText.dataset.newText,
        })
    });
}



/*function changeText(evt){
    
}*/