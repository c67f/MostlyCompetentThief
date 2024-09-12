const frame = document.getElementById('demo-frame')
const buttons = document.getElementsByClassName('demo-button')

// function demoButtonClick(button){
        

// }

for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];

    button.addEventListener('click', (event) => {
        const buttonLink = button.dataset.link;
        console.log(buttonLink);
        frame.src = buttonLink;
        
        /*let codeText; //in progress

        $.ajax('./assets/scripts/behaviors/spoiler-text.js', function(data, status){
            codeText = data;
            alert("Data: " + data + "\nStatus: " + status);
        })
        console.log(codeText);*/
    })
}

//export default demoButtonClick;