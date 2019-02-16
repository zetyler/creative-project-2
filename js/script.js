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
            flexBoxes[2].innerHTML = '<img src="' + jsonResult.sprites.front_default + '">';
            document.querySelector('.flex-container').style.backgroundColor = 'hsla(var(--' + jsonResult.types[0].type.name + '), 60%)';
            document.querySelector('.flex-container').style.borderColor = 'hsla(var(--' + jsonResult.types[0].type.name + '), 100%)';
            for(let box of flexBoxes) {
                box.style.borderColor = 'hsla(var(--' + jsonResult.types[0].type.name + '), 100%)';
            }
        }).catch((error) => { console.log("Invalid Pokémon."); });
});