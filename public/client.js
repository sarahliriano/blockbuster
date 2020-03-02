window.addEventListener('load', function(){
var button = document.getElementById('generateBtn');

button.addEventListener("click", async function(){

    console.log("You Clicked");
    const response = await fetch("/characters");
    const characters = await response.json();

    console.log(characters);

});

});