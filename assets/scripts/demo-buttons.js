const frame = document.getElementById('demo-frame')

function demoButtonClick(button, event){
    const buttonLink = button.dataset.link;
    console.log(buttonLink);
    frame.src = buttonLink;
}