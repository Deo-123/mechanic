import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, TouchableOpacity, Button, Switch, Vibration, TextInput, Alert, FlatList } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ellipse from '../../../assets/images/ellipse-right.png';
import Icon from 'react-native-vector-icons/Ionicons';
import uploadIcon from '../../../assets/images/camera.png';
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';



import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import Loader from '../../components/Loader';
import Gradient from '../../components/Gradient';

export default function Products() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <TouchableOpacity {...props} onPress={() => navigation.openDrawer()}>
                    <Icon name='menu' size={30} style={[styles.menuIcon, { marginLeft: 16 }]} />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: 'transparent',
            },
        });
    }, [navigation]);

    const [loading, setLoading] = useState(false);
    const [carData, setCarData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = await AsyncStorage.getItem('userToken');
                const response = await axios.get('https://custom3.mystagingserver.site/certifires/public/api/all-cars', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setLoading(false);
                setCarData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('product-detail', { id: item.id })} style={{alignItems:'center'}}>
            <Gradient gradientUse={styles.card}>
                <Image source={{ uri: `https://custom3.mystagingserver.site/certifires/public/${item.image}` }} style={styles.cardImage} />
                <View style={styles.cardDetail}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardModel}>{item.model}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='location' size={16} style={styles.locationIcon} />
                        <Text style={styles.cardLocation}>
                            {item.address && item.address.length > 15 ? `${item.address.substring(0, 15)}...` : item.address}
                        </Text>
                    </View>
                </View>
            </Gradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <Image source={ellipse} style={styles.Image} />
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                translucent={true}
                backgroundColor="transparent"
            />
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <SafeAreaView style={{ flex: 1 }} >
                <TextInput
                  style={styles.textInput}
                  placeholder="Search chats..."
                  placeholderTextColor="#292929"
                />
                    {/* <Text style={[styles.heading, { textAlign: 'left' }]}>All Cars</Text> */}
                    <FlatList
                        data={carData.data}
                        numColumns={2}
                       showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        // contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8, width: '100%' }}
                    />
                </SafeAreaView>
            {/* </ScrollView> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 80,
    },

    Image: {
        resizeMode: 'contain',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    headerContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    menuIcon: {
        color: '#1D1D1D'
    },
    card: {
        width: '95%',
        marginBottom: 10,
        borderRadius: 10,
    },
    cardImage: {
        height: 110,
        borderRadius: 10,

    },
    cardDetail: {
        padding: 10

    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    cardModel: {
        marginTop: 2,
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        
    },
    locationIcon: {
        paddingRight: 2,
        color: '#fff'
    },
    cardLocation: {
        color: '#fff',
        fontSize: 14
    },

    heading: {
        fontSize: 20,
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 15
    },
    textInput: {
        padding: 5,
        paddingLeft: 20,
        width: "100%",
        color: "#292929",
        borderWidth: 1,
        borderColor: '#292929',
        borderRadius: 100,
        marginBottom: 15,
    },

});
