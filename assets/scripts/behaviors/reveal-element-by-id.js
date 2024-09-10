let elementsRevealOtherArray = document.getElementsByClassName("reveal-other"); //does work with divs, apparently!

for (let i = 0; i < elementsRevealOtherArray.length; i++) {
    const elementRevealOther = elementsRevealOtherArray[i];
    elementRevealOther.style.color = '#0000AA';
    console.log(elementRevealOther);
    elementRevealOther.addEventListener("click", (event) => {
        console.log("shown");
        elementRevealOther.style.color = '#EEEEEE'
        let revealTarget = document.getElementById(elementRevealOther.dataset.revealTarget);
        revealTarget.style.display = "block";
    });
}