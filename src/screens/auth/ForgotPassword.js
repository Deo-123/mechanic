import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ellipse from '../../../assets/images/ellipse-right.png';
import Gradient from '../../components/Gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import CustomModal from '../../components/CustomModal';


export default function ForgotPassword() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [email, setInputEmail] = useState();
    const [message, setMessage] = useState('');

    const sendVerificationEmail = async () => {
        try {
            setLoading(true);
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.post(
                'https://custom3.mystagingserver.site/certifires/public/api/forgot_password',
                { email: email },
                { headers }
            );
            setLoading(false);
            if (response.data.status == true) {
                console.log(response.data.message);
                navigation.navigate('verification', { sendVerificationEmail});
                const usere_mail = response.data.data.email ;
                await AsyncStorage.setItem('user_email', usere_mail);
                console.log(usere_mail);
            }
            else {
                
                setShowModal(true);
                setMessage(response.data.message);
                console.log(response.data.message);
            }

           
        } catch (error) {
            setLoading(false);
            console.error('Error sending verification email:', error);
        }
    };
    const closeModal = () =>{
        setShowModal(false);
    }
    return (
        <SafeAreaView style={styles.container}>
                 <Loader loading={loading} />
                 <CustomModal visible={showModal} error={message} onClose={closeModal}/>
            <StatusBar
                barStyle={'dark-content'}
                hidden={false}
                translucent={true}
                backgroundColor="transparent"
            />
            <View>
                <Text style={{ fontSize: 16, marginBottom: 15, textAlign: 'left', color: "#292929", fontFamily: 'Poppins-Regular' }}>Enter email address assciated with your account for verification</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20, textAlign: 'left', color: "#292929", fontFamily: 'Poppins-Regular' }}>Enter your email address here</Text>
            </View>
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#292929"
                onChangeText={email => setInputEmail(email)}
                value={email}
                keyboardType="email-address"
            />
            <TouchableOpacity style={{ width: '100%' }} onPress={sendVerificationEmail}>
                <Gradient gradientUse={styles.button}>
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Continue</Text>
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
        alignItems:'center',
        justifyContent:'center'
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
})