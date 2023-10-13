import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

function Navbar() {
    return (
        <View style={styles.navbar}>
            <Text style={styles.navbarText}>PokéDex ISC</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        marginTop: Constants.statusBarHeight,
        padding: 20,
        backgroundColor: '#E53939'
    },
    navbarText: {
        color: 'white',
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: 'bold'
    }
});

export default Navbar;