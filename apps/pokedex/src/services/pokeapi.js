const BASE_URL = new URL('https://pokeapi.co/api/v2/');

async function getPokemonData(endpoint) {
    const URI = new URL(endpoint, BASE_URL);

    try {
        const resp = await fetch(URI.href);

        if (!resp.ok) {
            return Promise.reject(resp.json());
        }

        const pokemonData = await resp.json();

        const { id, name: pokemonName, sprites } = pokemonData;

        const pokemonWithAdditionalInfo = {
            id,
            name: pokemonName,
            sprites,
            ...pokemonData
        };

        return pokemonWithAdditionalInfo;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return Promise.reject(error);
    }
}

export function getPokemonByName(name) {
    if (!name || name.trim() === '') {
        return Promise.reject({ error: 'El nombre del Pokémon no puede estar en blanco.' });
    }

    return getPokemonData(`pokemon/${name.toLowerCase()}`);
}

export function getPokemonById(id) {
    return getPokemonData(`pokemon/${id}`);
}
