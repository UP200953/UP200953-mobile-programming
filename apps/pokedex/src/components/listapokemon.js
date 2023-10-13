import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { getPokemonByName } from '../services/pokeapi'; 

function listapokemon() {
    const [listapokemon, setlistapokemon] = useState([]);
    const [nextPageURL, setNextPageURL] = useState(null);

    const fetchPokemonData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setNextPageURL(data.next);
            const detailedlistapokemon = await Promise.all(data.results.map(async (pokemon) => {
                const detailedPokemon = await getPokemonByName(pokemon.name);
                return detailedPokemon;
            }));
            setlistapokemon(prevList => [...prevList, ...detailedlistapokemon]);
        } catch (error) {
            console.error("Error fetching Pokemon data: ", error);
        }
    };

    useEffect(() => {
        fetchPokemonData("https://pokeapi.co/api/v2/pokemon?offset=30&limit=40");
    }, []);

    const loadMorePokemon = () => {
        if (nextPageURL) {
            fetchPokemonData(nextPageURL);
        }
    };

    const renderPokemonItem = ({ item }) => (
        <TouchableOpacity>
            <Link to={`/information/${item.id}`}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <Image source={{ uri: item.sprites.front_default }} style={{ width: 50, height: 50, marginRight: 10 }} />
                    <Text>{item.name}</Text>
                </View>
            </Link>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={listapokemon}
                renderItem={renderPokemonItem}
                keyExtractor={(item) => item.id.toString()} 
                onEndReached={loadMorePokemon}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
}

export default listapokemon;
