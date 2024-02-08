import { View, Text, StyleSheet, ScrollView, StatusBar, Image, TouchableOpacity, Pressable, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import camera from '../../../assets/images/profile-cam.png';
import { launchImageLibrary } from 'react-native-image-picker';
import Gradient from '../../components/Gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppContext } from '../../context/Context';

export default function UserProfile() {
    const navigation = useNavigation();
    const { userData, setUserDate } = useAppContext();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <TouchableOpacity {...props} onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
                    <Icon name='arrow-back' size={20} color={'#fff'} />
                </TouchableOpacity>
            ),
            headerTitle: (props) => (
                <TouchableOpacity {...props} >
                    <Text style={{ fontSize: 19, color: '#fff', fontWeight: '600' }}>{userData?.first_name}{" "}{userData?.last_name}</Text>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#fff',
            },
        });
    }, [navigation, userData]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [experience, setExperience] = useState('');
    const [ssn, setSsn] = useState('');
    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get('https://custom3.mystagingserver.site/certifires/public/api/mechanic/view-profile', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setUserDate(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const updateData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            console.log(token);
            const formData = new FormData();
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('email', email);
            formData.append('city', city);
            formData.append('state', state);
            formData.append('zip_code', zipCode);
            formData.append('years_of_exp', experience);
            formData.append('ssn', ssn);
            const response = await axios.post('https://custom3.mystagingserver.site/certifires/public/api/mechanic/mechanic-detail-add-update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            updateImage();
            fetchData();
            console.log(response.data)
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    const [selectedImage, setSelectedImage] = useState({ uri: null });

    const openImagePicker = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'mixed', quality: 10 });

            if (result.assets && result.assets.length > 0) {
                setSelectedImage({ uri: result.assets[0].uri });
                console.log('Selected Image:', result.assets[0]);
            }
        } catch (error) {
            console.error('Error opening image picker:', error);
        }
    };

    const updateImage = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!selectedImage.uri) {
                console.log('Please select an image first.');
                return;
            }
            const formData = new FormData();
            formData.append('image', {
                uri: selectedImage.uri,
                name: 'image.jpg',
                type: 'image/jpeg',
            });
            const response = await fetch('https://custom3.mystagingserver.site/certifires/public/api/mechanic/image-upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },

            });
            console.log("fd", formData);


            console.log('Image update result:', response.data);

            setSelectedImage({ uri: null });
        } catch (error) {
            console.error('Error updating image:', error);

        }
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                    backgroundColor="transparent"
                />
                <View style={styles.profile}>
                    {selectedImage.uri ? (
                        <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
                    ) : (
                        <Image
                            source={{ uri: `https://custom3.mystagingserver.site/certifires/public/${userData?.image}` }}
                            style={styles.profileImage}
                        />
                    )}

                    <Pressable onPress={openImagePicker} style={styles.profileCam}>
                        <Image source={camera} />
                    </Pressable>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextInput
                        style={styles.halfInput}
                        placeholder="First Name"
                        placeholderTextColor="#292929"
                        defaultValue={userData?.first_name}
                        onChange={(e) => setFirstName(e.nativeEvent.text)}
                    />
                    <TextInput
                        style={styles.halfInput}
                        placeholder="Last Name"
                        placeholderTextColor="#292929"
                        value={userData?.last_name}
                        onChange={(e) => setLastName(e.nativeEvent.text)}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                }}>
                    <TextInput
                        style={styles.halfInput}
                        placeholder="City"
                        placeholderTextColor="#292929"
                        defaultValue={userData?.city}
                        onChange={(e) => setCity(e.nativeEvent.text)}
                    />
                    <TextInput
                        style={styles.halfInput}
                        placeholder="State"
                        placeholderTextColor="#292929"
                        value={userData?.state}
                        onChange={(e) => setState(e.nativeEvent.text)}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <TextInput
                        style={styles.halfInput}
                        placeholder="Zip code"
                        placeholderTextColor="#292929"
                        defaultValue={userData?.zip_code}
                        onChange={(e) => setZipCode(e.nativeEvent.text)}
                    />
                    <TextInput
                        style={styles.halfInput}
                        placeholder="SSN"
                        placeholderTextColor="#292929"
                        value={userData?.ssn}
                        onChange={(e) => setSsn(e.nativeEvent.text)}
                    />
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Experience"
                    placeholderTextColor="#292929"
                    defaultValue={userData?.years_of_exp}
                    onChange={(e) => setExperience(e.nativeEvent.text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#292929"
                    defaultValue={userData?.email}
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                />
                <TouchableOpacity style={{ width: '100%' }} onPress={updateData}>
                    <Gradient gradientUse={styles.Button}>
                        <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Save Changes</Text>
                    </Gradient>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        borderWidth: 3,
        borderColor: '#C63A2E',
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        position: 'relative',
        marginBottom: 50
    },
    profileCam: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    profileImage: {
        width: '100%',
        height: "100%",
        borderRadius: 100,
    }
    ,
    textInput: {
        padding: 8,
        paddingLeft: 20,
        width: "100%",
        marginBottom: 15,
        color: "#292929",
        borderWidth: 1,
        borderColor: '#292929',
        borderRadius: 100,
    },
    halfInput: {
        padding: 8,
        paddingLeft: 20,
        width: "48%",
        marginBottom: 15,
        color: "#292929",
        borderWidth: 1,
        borderColor: '#292929',
        borderRadius: 100,
    },
    Button: {
        borderRadius: 100,
        width: "100%",
        padding: 10,
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },


});