import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    ActivityIndicator
} from 'react-native';
import { getWetherByName } from './src/services/wether';
import { useState } from 'react';
import BackgroundImage from './src/components/BackgroundImage';
import CustomButton from './src/components/CustomButton'; 


export default function App() {
    console.log(process.env.EXPO_PUBLIC_API_KEY);

    const [city, setCity] = useState("");
    const [wether, setWether] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onPressHanddle = async () => {
        setLoading(true);
        const regex = /^[A-Za-z\s]+$/;
    
        if (!city) {
            setError("Ciudad no puede estar vacía");
            setLoading(false);
            return;
        } else if (!regex.test(city)) {
            setError("No se aceptan caracteres especiales");
            setLoading(false);
            return;
        }
    
        setError(false);
        
        try {
            const resp = await getWetherByName(city);
            const errorExist = Boolean(resp.error);
            setError(errorExist);
            setWether(resp);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
            setCity(""); // Limpia el campo de texto después de la búsqueda
        }
    }    

    const handdleChangeText = (e) => {
        setCity(e);
    }

    return (

        <View style={styles.container}>
            <BackgroundImage>
            <Text style={styles.mainTitle}>Weather App</Text>
            <View>
                <Text style={[styles.whiteText, styles.text]}>Write a City</Text>

                <TextInput
                    placeholder='City'
                    style={styles.input}
                    value={city}
                    onChangeText={handdleChangeText}
                />
                <CustomButton title="Search" onPress={onPressHanddle} />

            </View>
            {
                loading && <ActivityIndicator size="large" color="#0800FF" />
            }
            {
                error && <Text>{error}</Text>
            }
            {
                !error && !loading && wether && (
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Text>Country: {wether.location.country}</Text>
                            <Text>Region: {wether.location.region}</Text>
                            <Text>City: {wether.location.name}</Text>
                            <Text>Temp: {wether.current.temp_c}</Text>
                            <Text>Condition: {wether.current.condition.text}</Text>
                        </View>
                        <Image
                            style={{
                                width: 64,
                                height: 64
                            }}
                            source={{
                                uri: 'https:' + wether.current.condition.icon
                            }}
                        />
                    </>
                )
            }
            </BackgroundImage>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainTitle: {
        fontSize: 30,
        color: "#0800FF"
    },
    input: {
        width: 250,
        marginVertical: 10,
        color: '#0800FF',
    },
    whiteText: {
        color: '#0800FF',
    },
});