let elementsRevealOtherArray = document.getElementsByClassName("reveal-other"); //does work with divs, apparently!

for (let i = 0; i < elementsRevealOtherArray.length; i++) {
    const elementRevealOther = elementsRevealOtherArray[i];
    console.log(elementRevealOther);
    elementRevealOther.addEventListener("click", (event) => {
        console.log("shown");
        let revealTarget = document.getElementById(elementRevealOther.dataset.revealTarget);
        revealTarget.style.display = "block";
    });
}