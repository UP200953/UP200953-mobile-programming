import { Button, StyleSheet, Text, View, Image, TextInput, ActivityIndicator } from 'react-native';
import { Link } from 'react-router-native';
import ListaPokemon from '../components/listapokemon'
import SearchBar from '../components/search';
// Services
import { getPokemonByName } from '../services/pokeapi';
import { useState } from 'react';

function Home() {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemon, setPokemon] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handdleChangeText = (namePokemon) => setPokemonName(namePokemon);

    const handdlePress = async () => {
        setLoading(true);
        try {
            const pokeInformation = await getPokemonByName(pokemonName);
            setPokemon(pokeInformation);
            console.log('Error:', error);
        } catch (error) {
            setError(!!error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <View style={styles.main}>
                {
                    loading && <ActivityIndicator style={{ width: 'auto', height: 250 }} size='large' color='#E53939' />
                }
                {
                    !loading && pokemon && (
                        <Link to={`/information/${pokemon.id}`}>
                            <Image
                                style={{ height: 250, width: 250 }}
                                source={
                                    {
                                        uri: pokemon?.sprites?.front_default
                                    }
                                }
                            />
                        </Link>
                    )
                }
                {
                    (error || !pokemon && !loading) && <Image
                        style={{ height: 250 }}
                        source={require('../../assets/pokebola.png')} />
                }
                <View style={styles.inputs}>
                    <SearchBar></SearchBar>
                </View>
                <View>
                    <Text>Filters!!!</Text>
                </View>
                {
                error && <Text>Pokemon not found</Text> 
                }
            </View>
            <View>
                <Text>List of pokemons</Text>
                <ListaPokemon></ListaPokemon>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputs: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default Home;
