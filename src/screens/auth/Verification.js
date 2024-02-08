import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gradient from '../../components/Gradient';
import Loader from '../../components/Loader';
import CustomModal from '../../components/CustomModal';



export default function Verification({ route }) {
    const { sendVerificationEmail } = route.params;

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState('');
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '']);
    const [inputErrors, setInputErrors] = useState([false, false, false, false, false]);
    const [verificationStatusError, setVerificationStatusError] = useState();

    const digitInputs = useRef([]);
    const handleOtpChange = (index, value) => {
        if (/^[0-9]*$/.test(value) && value.length <= 1) {
            const newOtpDigits = [...otpDigits];
            newOtpDigits[index] = value;
            setOtpDigits(newOtpDigits);
            setInputErrors([...inputErrors.slice(0, index), false, ...inputErrors.slice(index + 1)]);
            // Move focus to the next input after entering a digit
            if (index < digitInputs.current.length - 1 && value !== '') {
                digitInputs.current[index + 1].focus();
            }
        }
    };
    const verifyOTP = async () => {
        const user_email = await AsyncStorage.getItem('user_email');
        console.log(user_email);
        // Check for empty digits and set input errors
        const newInputErrors = otpDigits.map(digit => digit === '');
        setInputErrors(newInputErrors);

        // Proceed if no input errors and all OTP digits are filled
        if (!newInputErrors.includes(true) && otpDigits.every(digit => digit !== '')) {
            try {
                setLoading(true);
                // Join OTP digits into a single code
                const otpCode = otpDigits.join('');
                const headers = {
                    'Content-Type': 'application/json',
                };
                const response = await axios.post(
                    'https://custom3.mystagingserver.site/certifires/public/api/otp_verification',
                    { otp: otpCode, email: user_email },
                    { headers }
                );
                setLoading(false);
                if (response.data.status == true) {
                    console.log(response.data.message);
                    const opt_code = response.data.data.code ;
                    await AsyncStorage.setItem('otpCode', opt_code);
                    console.log(opt_code);
                    navigation.navigate('reset-password');
                
                }
                else {
                    console.log(response.data.message);
                    // setVerificationStatusError(response.data.msg);
                }

            } catch (error) {
                setLoading(false);
                console.error('Error verifying OTP:', error);
            } finally {
                // Clear the OTP digits after verification attempt
                setOtpDigits(['', '', '', '', '']);
            }
        }
    };
    const handleResendCode = () => {
        sendVerificationEmail();
    };
    const closeModal = () =>{
        setShowModal(false);
    }
    return (

        <SafeAreaView style={styles.container}>
            <Loader loading={loading} />
            <CustomModal visible={showModal} error={message} onClose={closeModal} />
            <View>
                <Text style={{ fontSize: 16, marginBottom: 15, textAlign: 'left', color: "#292929", fontFamily: 'Poppins-Regular' }}>We send you a code to verify your {'\n'} email address</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20, textAlign: 'left', color: "#292929", fontFamily: 'Poppins-Regular' }}>Enter your OTP code here</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15, justifyContent: 'center' }}>
                {otpDigits.map((digit, index) => (
                    <TextInput
                        key={index}
                        
                        ref={(input) => (digitInputs.current[index] = input)}
                        style={{
                            borderWidth: 1,
                            borderColor: '#272727',
                            width: 50,
                            height: 50,
                            margin: 5,
                            borderRadius: 5,
                            textAlign: 'center',
                            color: "#292929",
                            borderColor: inputErrors[index] ? 'red' : '#292929',
                        }}
                        placeholder='0'
                        placeholderTextColor="#292929"
                        value={digit}
                        onChangeText={(text) => handleOtpChange(index, text)}
                        keyboardType="numeric"
                        maxLength={1}
                        onSubmitEditing={() => digitInputs.current[index + 1]?.focus()}
                    />
                ))}
            </View>
            <Text>{verificationStatusError}</Text>
            {inputErrors.includes(true) && <Text style={{ color: 'red' }}>Please fill in all fields.</Text>}
            <TouchableOpacity style={{ width: '100%' }} onPress={verifyOTP} >
                <Gradient gradientUse={styles.button}>
                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Submit</Text>
                </Gradient>
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 14, marginBottom: 5, textAlign: 'center', color: "#292929", fontFamily: 'Poppins-Regular' }}>Don’t received a code</Text>
                <TouchableOpacity onPress={handleResendCode}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 15, textAlign: 'center', color: "#292929", fontFamily: 'Poppins-Regular' }}>Resend</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    button: {
        width: "100%",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 15,
        padding: 12,
        backgroundColor: "#EEC217",
        borderColor: "#292929",
    },
    loginText: {
        color: '#393939',
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    }

});