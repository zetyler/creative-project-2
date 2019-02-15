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
            let newText = "";
            newText += JSON.stringify(myJson);
            let responseDiv = document.querySelector('#searchResponse');
            responseDiv.innerHTML = newText;
        }).catch((error) => { console.log("Invalid Pokémon."); });
});