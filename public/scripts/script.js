let pokemonList = [];

fetch("https://pokeapi.co/api/v2/pokemon?limit=100000")
.then(res => res.json())
.then(data => {
    pokemonList = data.results.map(p => p.name);
});

const input = document.querySelector(".text-input");
const ghost = document.querySelector(".ghost");

input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    const match = pokemonList.find(name => name.startsWith(value));

    if (match && value !== "") {
        ghost.textContent = match;
    } else {
        ghost.textContent = "";
    }
});

input.addEventListener("keydown", e => {
    // tekan TAB buat accept suggestion
    if (e.key === "Tab" && ghost.textContent) {
        e.preventDefault();
        input.value = ghost.textContent;
        ghost.textContent = "";
    }
});
