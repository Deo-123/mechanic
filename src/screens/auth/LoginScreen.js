import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, StatusBar, Pressable } from 'react-native';
import ellipse from '../../../assets/images/ellipse-right.png';
import Icon from 'react-native-vector-icons/Ionicons';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gradient from '../../components/Gradient';
import Loader from '../../components/Loader';
import CustomModal from '../../components/CustomModal';
import { useAppContext } from '../../context/Context';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { setUserDate } = useAppContext();


    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async () => {
        try {
            // Reset error messages
            setErrorMessages({
                email: '',
                password: '',
            });

            // Validate email and password
            if (!email) {
                setErrorMessages((prev) => ({ ...prev, email: 'Please enter your email.' }));
                return;
            }

            if (!password) {
                setErrorMessages((prev) => ({ ...prev, password: 'Please enter your password.' }));
                return;
            }

            setLoading(true);

            const response = await axios.post(
                'https://custom3.mystagingserver.site/certifires/public/api/mechanic-login',
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const token = response.data.data.token;
            // Store the token in AsyncStorage
            await storeToken(token);
            console.log(token);
            setLoading(false);
            navigation.navigate("drawer");
            setShowModal(true);
            setError(response.data.message);
            console.log(response.data);
            await fetchUserData(token);

        } catch (error) {
            setLoading(false);
            if (error.response) {
                if (error.response.status === 401) {
                    setError(error.response.data.message);
                    console.error(error.response.data.message);
                    console.error(error.response.data)
                    setShowModal(true);
                } else {
                    setError('Unexpected error. Please try again later.');
                }
            } else if (error.request) {
                setError('No response received from the server');
            } else {
                setError(`Error setting up the request: ${error.message}`);
            }
        }
    };
    
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('https://custom3.mystagingserver.site/certifires/public/api/mechanic/view-profile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update user data in the app context or state
      setUserDate(response.data.data);

    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Handle error when fetching user data
    }
  };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('userToken', token);
            console.log('Token stored successfully:', token);
        } catch (e) {
            console.error('Error storing token:', e);
        }
    };
    return (
        <View style={styles.container}>
            <CustomModal visible={showModal} error={error} onClose={closeModal} />
            <Loader loading={loading} />
            <Image source={ellipse} style={styles.Image} />
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                translucent={true}
                backgroundColor="transparent"
            />
            <SafeAreaView style={styles.safeArea}>
                <Text style={styles.Heading}>Sign In</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#292929"
                    value={email}
                    onChangeText={setEmail}
                />
                {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: "#fff",
                    width: "90%",
                    marginTop: 15,
                    marginBottom: 15,
                    color: "#292929",
                    borderWidth: 1,
                    borderColor: '#292929',
                    borderRadius: 100,
                }}>
                    <TextInput
                        style={{ flex: 1, padding: 8, paddingLeft: 20 }}
                        placeholder="Password"
                        placeholderTextColor="#292929"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={toggleShowPassword}>
                        <Icon style={styles.eyeIcon} name={showPassword ? 'eye-off' : 'eye'} />
                    </TouchableOpacity>
                </View>
                {errorMessages.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}
                <View style={{ width: '90%' }}>
                    <TouchableOpacity onPress={handleLogin} >
                        <Gradient gradientUse={styles.button}>
                            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Sign In</Text>
                        </Gradient>
                    </TouchableOpacity>
                </View>
                <Pressable onPress={() => navigation.navigate('forgot-pass')}>
                    <Text style={styles.Text}>Forgot your password?</Text>
                </Pressable>
                <View style={styles.lineContainer}>
                    <View style={styles.horizontalLine} />
                    <Text style={{ fontWeight: '700', color: '#1D1D1D', }}>Or</Text>
                    <View style={styles.horizontalLine} />
                </View>
                <View style={{ width: '90%' }}>
                    <TouchableOpacity>
                        <Gradient gradientUse={styles.socialButton}>
                            <Image source={require('../../../assets/images/google.png')} style={styles.icon} />
                            <Text style={{ color: 'white', fontSize: 14, paddingLeft: 10, fontFamily: 'Poppins-Regular', }}>Continue With Google</Text>
                        </Gradient>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ width: '90%' }}>
                    <TouchableOpacity>
                        <Gradient gradientUse={styles.socialButton}>
                            <Image source={require('../../assets/images/apple.png')} style={styles.icon} />
                            <Text style={{ color: 'white', fontSize: 14, paddingLeft: 10, fontFamily: 'Poppins-Regular', }}>Continue With Apple</Text>
                        </Gradient>
                    </TouchableOpacity>
                </View> */}
                <Text style={{ color: '#303030', fontSize: 16, textAlign: 'center', marginTop: 15, marginBottom: 15 }}> Don’t have an account? <Text style={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('register')}> Sign Up</Text> </Text>

            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16
    },
    Image: {
        resizeMode: 'contain',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    Heading: {
        fontSize: 28,
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontWeight: '700'
    },
    Text: {
        fontSize: 14,
        color: '#292929',
        fontFamily: 'Poppins-Regular',
        marginTop: 10
    },
    textInput: {
        backgroundColor: "#fff",
        padding: 8,
        paddingLeft: 20,
        width: "90%",
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
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    horizontalLine: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#303030',
        marginHorizontal: 5,
    },
    socialButton: {
        flexDirection: 'row',
        borderRadius: 100,
        width: "100%",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        marginTop: 10,
        marginBottom: 10,
    },

    icon: {
        width: 20,
        height: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
    },
});
