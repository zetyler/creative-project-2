let jsonResult;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.querySelector('#searchButton').addEventListener('click', function(event) {
    event.preventDefault();
    const inputValue = document.querySelector('#pokemonInput').value.toLowerCase();
    if(inputValue === "")
        return;

    const url = 'https://pokeapi.co/api/v2/pokemon/' + inputValue;
    fetch(url)
        .then((response) => { return response.json(); })
        .then((myJson) => { 
            console.log(myJson);
            jsonResult = myJson;
            let flexBoxes = document.querySelectorAll('.flex-item');
            flexBoxes[0].innerText = capitalizeFirstLetter(jsonResult.name);
            flexBoxes[1].innerText = '#' + jsonResult.id;
            flexBoxes[2].querySelector('#sprite').innerHTML = '<img src="' + jsonResult.sprites.front_default + '">';
            document.querySelector('.flex-container').style.backgroundColor = 'hsla(var(--' + jsonResult.types[0].type.name + '), 50%)';
            document.querySelector('.flex-container').style.borderColor = 'hsla(var(--' + jsonResult.types[0].type.name + '), 100%)';
            for(let box of flexBoxes) {
                box.style.borderColor = 'hsla(var(--' + jsonResult.types[0].type.name + '), 100%)';
            }
        }).catch((error) => { console.log("Invalid Pokémon."); });
});

function getImgName(shiny, front) {
    return ((front) ? "front" : "back") + "_" + ((shiny) ? "shiny" : "default");
}

function setSprite(shiny, front) {
    document.querySelector('#sprite').innerHTML = '<img src="' + jsonResult.sprites[getImgName(shiny, front)] + '">';
}

let shinyButton = document.querySelector('#shinyButton');
let shiny = false;
let front = true;
shinyButton.addEventListener('click', function(event) {
    if (jsonResult) {
        shinyButton.value = (shinyButton.value === "Not Shiny") ? "Shiny" : "Not Shiny";
        shiny = !shiny;
        setSprite(shiny, front);
    }
});

document.querySelector('#frontButton').addEventListener('click', function(event) {
    if (jsonResult) {
        if(!front) {
            front = true;
            setSprite(shiny, front);
        }
    }
});

document.querySelector('#backButton').addEventListener('click', function(event) {
    if (jsonResult) {
        if (front) {
            front = false;
            setSprite(shiny, front);
        }
    }
});