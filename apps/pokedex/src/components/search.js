import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
    const [text, setText] = useState('');

    const handleChangeText = (newText) => {
        setText(newText);
    };

    const handlePress = () => {
        onSearch(text);
    };

    return (
        <View style={styles.inputs}>
            <TextInput
                onChangeText={handleChangeText}
                placeholder='Search a Pokemon!'
            />
            <Button
                onPress={handlePress}
                title='Search'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputs: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default SearchBar;
