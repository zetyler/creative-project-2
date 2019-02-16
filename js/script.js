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
            document.querySelector('.flex-container').style.backgroundColor = 'hsla(var(--' + jsonResult.types[0].type.name + '), 70%)';
            document.querySelector('.flex-container').style.borderColor = 'hsla(var(--' + jsonResult.types[0].type.name + '), 100%)';
            for (let box of flexBoxes) {
                box.style.borderColor = 'hsla(var(--' + jsonResult.types[0].type.name + '), 100%)';
            }

            flexBoxes[0].innerText = capitalizeFirstLetter(jsonResult.name);
            flexBoxes[1].innerText = '#' + jsonResult.id;
            flexBoxes[2].querySelector('#sprite').innerHTML = '<img src="' + jsonResult.sprites.front_default + '">';

            let typeBoxes = flexBoxes[3].querySelectorAll('.pkType');
            let typeNum = 0;
            for (; typeNum < jsonResult.types.length; ++typeNum) {
                let typeName = jsonResult.types[typeNum].type.name;
                typeBoxes[typeNum].innerText = typeName;
                typeBoxes[typeNum].style.visibility = 'visible';
                typeBoxes[typeNum].style.backgroundColor = 'hsla(var(--' + typeName + '), 70%)';
            }
            for (; typeNum < 2; ++typeNum) {
                typeBoxes[typeNum].style.visibility = 'hidden';
            }

            let abCount = 0;
            let abBoxes = flexBoxes[4].querySelectorAll('.pkAbility');
            for(let abNum = 0; abNum < jsonResult.abilities.length; ++abNum) {
                let abilityJSON = jsonResult.abilities[abNum];
                if (abilityJSON.is_hidden) {
                    abBoxes[2].style.visibility = 'visible';
                    abBoxes[2].innerText = abilityJSON.ability.name;
                }
                else {
                    abBoxes[abCount].style.visibility = 'visible';
                    abBoxes[abCount++].innerText = abilityJSON.ability.name;
                }
            }
            if(abCount < 2) {
                abBoxes[1].style.visibility = 'hidden';
            }

            let sizeBoxes = flexBoxes[5].querySelectorAll('.pkSize');
            let height = jsonResult.height / 10;
            sizeBoxes[0].innerText = height + " m";
            let weight = jsonResult.weight / 10;
            sizeBoxes[1].innerText = weight + " kg";

            flexBoxes[6].querySelector('.moves-holder').innerHTML = null; 
            let result = "<div class='moves'>";
            for(let moveData of jsonResult.moves) {
                result += '<div class="pkMove">' + moveData.move.name + '</div>';
            }
            result += "</div>";
            flexBoxes[6].querySelector('.moves-holder').innerHTML = result; 
        }).catch((error) => { console.log("Invalid Pokémon."); });
});

function getImgName(shiny, front) {
    return ((front) ? "front" : "back") + "_" + ((shiny) ? "shiny" : "default");
}

function setSprite(shiny, front) {
    if (jsonResult.sprites[getImgName(shiny, front)]) {
        document.querySelector('#sprite').innerHTML = '<img src="' + jsonResult.sprites[getImgName(shiny, front)] + '">';
    }
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