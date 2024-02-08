import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import React, { useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/images/logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
    const navigation = useNavigation();


    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem('userToken').then((value) =>
            navigation.replace(value === null ? 'auth' : 'drawer'),
            );
        }, 1000);
    }, []);

 

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            <Image source={logo} style={styles.logo} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    logo: {
        width: '50%',
        resizeMode: 'contain',
        margin: 30,
    },
    themeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
