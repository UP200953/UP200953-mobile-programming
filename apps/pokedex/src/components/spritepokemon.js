import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    image: {
        marginRight: 15,
        height: 100,
        width: 100,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#87CEEB',
    },
    linkText: {
        textAlign: 'center',
        color: '#2E8B57',
        fontSize: 13,
        fontFamily: 'Arial',
    },
    text: {
        color: '#2E8B57',
        fontFamily: 'Arial',
        marginBottom: 10,
        fontSize: 13,
    },
    imageContainer: {
        justifyContent: 'center',
        marginBottom: 15,
        flexDirection: 'row',
    },
    link: {
        borderRadius: 15,
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: '#0000FF',
        marginTop: 40,
    },
});

export default styles;


