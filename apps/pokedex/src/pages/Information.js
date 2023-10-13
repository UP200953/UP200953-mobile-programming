import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Link, useParams } from 'react-router-native';
import { getPokemonById } from '../services/pokeapi';
import styles from '../components/spritepokemon';

function Information() {
    const [pokemon, setPokemon] = useState(null);
    const { pokemonid } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const pokeInformation = await getPokemonById(pokemonid);
                setPokemon(pokeInformation);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [pokemonid]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pokemon Information</Text>
            {pokemon && (
                <View>
                    <Text style={styles.text}>ID: {pokemon.id}</Text>
                    <Text style={styles.text}>Name: {pokemon.name}</Text>
                    <Text style={styles.text}>Type: {pokemon.types[0].type.name}</Text>
                    <Text style={styles.text}>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</Text>
                    <Text style={styles.text}>Moves: {pokemon.moves.map(move => move.move.name).join(', ')}</Text>
                    <Text style={styles.text}>Weight: {pokemon.weight}</Text>
                    <Text style={styles.text}>Height: {pokemon.height}</Text>
                    <Text style={styles.text}>Stats:{pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</Text>
                    <Text style={styles.text}>Experience: {pokemon.base_experience}</Text>
                    <Text style={styles.text}>Pokemon:</Text>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
                    </View>
                </View>
            )}
            <Link to='/' style={styles.link}>
                <Text style={styles.linkText}>Go Home!!</Text>
            </Link>
        </View>
    );
}

export default Information;

