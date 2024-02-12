import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, TouchableOpacity, Button, Switch, Vibration, TextInput, Alert } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ellipse from '../../../assets/images/ellipse.png';
import Icon from 'react-native-vector-icons/Ionicons';
import uploadIcon from '../../../assets/images/camera.png';
import ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import Banner from '../../components/Banner';
import Gradient from '../../components/Gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dollar from '../../../assets/images/dollar.png';
import dummyUser from '../../../assets/images/dummy-user.png';
import user1 from '../../../assets/images/user1.jpg';
import user3 from '../../../assets/images/user3.png';
import user4 from '../../../assets/images/user4.png';
import sub_dollar from '../../../assets/images/sub-dollar.png';
import axios from 'axios';
import Loader from '../../components/Loader';
import { useAppContext } from '../../context/Context';


export default function Order() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('newOrder');
    const { userData } = useAppContext();
    // const [orderData, setOrderData] = useState([]);
    const [order, setOrder] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <TouchableOpacity {...props} onPress={() => navigation.openDrawer()}>
                    <Icon name='menu' size={30} style={[styles.menuIcon, { marginLeft: 16 }]} />
                </TouchableOpacity>
            ),
            headerRight: (props) => (
                <TouchableOpacity {...props} onPress={() => navigation.navigate('user-profile')}>
                    <Image
                        source={{ uri: `https://custom3.mystagingserver.site/certifires/public/${userData?.image}` }}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 100,
                            marginRight: 15,
                        }}
                    />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: 'transparent',
            },
        });
    }, [navigation, userData]);

    // const dummyCompleteOrderData = [
    //   {
    //     id: 1,
    //     name: 'Michael Stefan',
    //     profileStatus: 'Approved',
    //     ordersCompleted: 17,
    //     totalEarnings: 534,
    //     profileImage: user1,
    //     status: 'true'
    //   },
    //   {
    //     id: 2,
    //     name: 'Emma Watson',
    //     profileStatus: 'Pending',
    //     ordersCompleted: 10,
    //     totalEarnings: 900,
    //     profileImage: user3,
    //     status: 'true'
    //   },
    //   {
    //     id: 3,
    //     name: 'John Doe',
    //     profileStatus: 'Approved',
    //     ordersCompleted: 25,
    //     totalEarnings: 1200,
    //     profileImage: user1,
    //     status: 'true'
    //   },
    //   {
    //     id: 4,
    //     name: 'Jane Smith',
    //     profileStatus: 'Approved',
    //     ordersCompleted: 15,
    //     totalEarnings: 800,
    //     profileImage: user1,
    //     status: 'true'
    //   },

    // ];

    const handleNewOrder = () => {
        setOrder(order);
        fetchData();
        setActiveButton('newOrder');
    };
    const handleCompleteOrder = () => {
        setOrder([]);
        setActiveButton('completeOrder');
    };
    const fetchData = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get('https://custom3.mystagingserver.site/certifires/public/api/my-request-inspection-list', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setLoading(false);
            setOrder(response.data.data);
        } catch (error) {
            setLoading(false);
            console.error('Error:', error.message);
        }
    };
    useFocusEffect(
        useCallback(() => {
            fetchData();
            console.log(userData);
            return () => {
            };
        }, [])
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{ flex: 1 }} >
                    <View style={styles.orderList}>
                        {order.map((data, index) => (
                            <View key={data.id}>
                                <View style={styles.profile}>
                                    <View>
                                        <Image source={{ uri: `https://custom3.mystagingserver.site/certifires/public/${data?.user_detail?.image}` }} style={styles.profileImage} />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 15, }}>
                                        <Text style={styles.title}>{data?.user_detail?.first_name + " " + data?.user_detail?.last_name}</Text>
                                        <Text style={styles.text}><Icon name='location' size={20} style={{ color: '#C63A2E' }} /> <Text>{data?.address}</Text></Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
                                            <Image source={sub_dollar} style={{ width: 25, height: 25 }} />
                                            <Text style={styles.text}>Order Amount: <Text style={{ color: '#C63A2E', fontWeight: '700' }}>${data?.amount}</Text></Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 16 }}>
                                            {/* { "true" == "true" && (
                        <TouchableOpacity style={{
                          backgroundColor: '#4caf50', borderRadius: 100,
                          paddingHorizontal: 16,
                          paddingVertical: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 16,
                        }}>
                          <Text style={{ color: '#fff', fontSize: 12 }}>Verified</Text>
                        </TouchableOpacity>
                      )} */}
                                            <TouchableOpacity onPress={() => navigation.navigate('product-detail', { id: data?.id })}>
                                                <Gradient gradientUse={[styles.button]}>
                                                    <Text style={{ color: '#fff', fontSize: 12 }}>Details</Text>
                                                </Gradient>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 90,
    },
    Image: {
        resizeMode: 'contain',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    profile: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        marginBottom: 16,

    },

    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    title: {
        color: '#0B0B0B',
        fontSize: 16,
        fontWeight: '700',
    },
    text: {
        color: '#0B0B0B',
        fontSize: 13,
        marginTop: 3
    },
    button: {
        borderRadius: 100,
        paddingHorizontal: 16,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

});
