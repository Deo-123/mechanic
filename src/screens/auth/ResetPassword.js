import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ellipse from '../../../assets/images/ellipse-right.png';
import Gradient from '../../components/Gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function ResetPassword() {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [changePassword, setChangePassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState('');
    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false,
    });
    const handleResetPassword = async () => {

        if (password !== changePassword) {
            setPasswordsMatch("Passwords do not match");
            console.log("Passwords do not match");
            return; // Exit the function early if passwords don't match
        }

        try {
            const user_email = await AsyncStorage.getItem('user_email');
            const otpCode = await AsyncStorage.getItem('otpCode');
            console.log("dsds",otpCode);
            const response = await axios.post(
                'https://custom3.mystagingserver.site/certifires/public/api/reset_password',
                {
                    email: user_email,
                    otp: otpCode,
                    password: password,
                    password_confirmation: changePassword,
                }
            );
            if (response.data.status == true) {
                navigation.navigate('login');
                console.log('Success', response.data.message);
            } else {
                console.log('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            Alert.alert('Error', 'Failed to reset password.');
        }
    };
    const toggleShowPassword = (field) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Loader loading={loading} />
            <StatusBar
                barStyle={'dark-content'}
                hidden={false}
                translucent={true}
                backgroundColor="transparent"
            />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: "#fff",
                width: "100%",
                marginTop: 15,
                marginBottom: 15,
                color: "#292929",
                borderWidth: 1,
                borderColor: '#292929',
                borderRadius: 100,
            }}>
                <TextInput
                    style={{ flex: 1, padding: 8, paddingLeft: 20 }}
                    placeholder="New Password"
                    placeholderTextColor="#292929"
                    secureTextEntry={!showPassword.new}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => toggleShowPassword('new')}>
                    <Icon style={styles.eyeIcon} name={showPassword.new ? 'eye-off' : 'eye'} />
                </TouchableOpacity>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: "#fff",
                width: "100%",
                marginTop: 15,
                marginBottom: 15,
                color: "#292929",
                borderWidth: 1,
                borderColor: '#292929',
                borderRadius: 100,
            }}>
                <TextInput
                    style={{ flex: 1, padding: 8, paddingLeft: 20 }}
                    placeholder="Confirm Password"
                    placeholderTextColor="#292929"
                    secureTextEntry={!showPassword.confirm}
                    value={changePassword}
                    onChangeText={setChangePassword}
                />
                <TouchableOpacity onPress={() => toggleShowPassword('confirm')}>
                    <Icon style={styles.eyeIcon} name={showPassword.confirm ? 'eye-off' : 'eye'} />
                </TouchableOpacity>
            </View>
            {passwordsMatch && <Text style={styles.errorText}>{passwordsMatch}</Text>}
            <TouchableOpacity style={{ width: '100%' }} onPress={handleResetPassword}>
                <Gradient gradientUse={styles.button}>
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Reset</Text>
                </Gradient>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: 28,
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontWeight: '700'
    },
    textInput: {
        backgroundColor: "#fff",
        padding: 8,
        paddingLeft: 20,
        width: "100%",
        marginTop: 15,
        marginBottom: 10,
        color: "#292929",
        borderWidth: 1,
        borderColor: '#292929',
        borderRadius: 100,
    },
    button: {
        borderRadius: 100,
        width: "100%",
        padding: 12,
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eyeIcon: {
        padding: 8,
        color: '#303030',
        fontSize: 25
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
})