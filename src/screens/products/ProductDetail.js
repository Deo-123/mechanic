import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import bnImage from '../../../assets/images/banner.png';
import user1 from '../../../assets/images/user1.jpg';
import carRepairIcon from '../../../assets/images/car-repair-icon.png';
import BannerSlider from '../../components/BannerSlider';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import transmission from '../../../assets/images/manual-transmission.png'
import fuel from '../../../assets/images/gas-station.png'
import speedometer from '../../../assets/images/speedometer.png'
import engine from '../../../assets/images/car-engine.png'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gradient from '../../components/Gradient';
import CustomModal from '../../components/CustomModal';
import Loader from '../../components/Loader';


export default function ProductDetail() {
    const route = useRoute()
    const { id } = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [orderDetail, setOrderDetail] = useState([]);


    const fetchData = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get(`https://custom3.mystagingserver.site/certifires/public/api/view-request-inspection/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setLoading(false);
            setOrderDetail(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoading(false);
            console.error('Error:', error.message);
        }
    };
    useEffect(() => {
        console.log(id);
        fetchData();
    }, [id]);

    const closeModal = () => {
        setShowModal(false);
        setShowSuccessModal(false);
    };
    const openModal = () => {
        setShowModal(true);
    };
    const ProductBuy = () => (
        <View style={{ padding: 8 }}>
            <Text style={styles.modelHeading}>Seller Details</Text>
            <View style={{ marginBottom: 10 }}>
                <Text style={styles.modelLabel}>Seller Name</Text>
                <Text style={styles.modelText}>Michael Williamson</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={styles.modelLabel}>Email</Text>
                <Text style={styles.modelText}>Michael91W@gmail.com</Text>
            </View>

            <View style={{ marginBottom: 10 }}>
                <Text style={styles.modelLabel}>Phone No</Text>
                <Text style={styles.modelText}>+1 4545 5455</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity >
                    <Gradient gradientUse={styles.modelButton}>
                        <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Chat</Text>
                    </Gradient>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Gradient gradientUse={styles.modelButton}>
                        <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Call</Text>
                    </Gradient>
                </TouchableOpacity>

            </View>
            <TouchableOpacity onPress={closeModal}>
                <Text style={styles.modelCancel}>Cancel</Text>
            </TouchableOpacity>

        </View>
    );
    const handleOrder = async () => {
        // console.log("id", id);
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.post(
                `https://custom3.mystagingserver.site/certifires/public/api/mechanic/request-inspection-pick/${id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setLoading(false);
            setSuccess(response.data.msg)
            fetchData();
            setShowSuccessModal(true);
            console.log(response.data);
        } catch (error) {
            setLoading(false);
            console.error('Error:', error.message);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Loader loading={loading} />
            <CustomModal visible={showSuccessModal} onClose={closeModal} success={success}/>
            <CustomModal visible={showModal} onClose={closeModal} content={<ProductBuy />} />
            <SafeAreaView style={styles.container}>
                <View style={styles.profile}>
                    <View>
                        <Image source={{ uri: `https://custom3.mystagingserver.site/certifires/public/${orderDetail?.user_detail?.image}` }} style={styles.profileImage} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 15, }}>
                        <Text style={styles.title}>{orderDetail?.user_detail?.first_name}{" "}{orderDetail?.user_detail?.last_name}</Text>
                        <Text style={{ color: '#1B1B1B', marginTop: 5, fontFamily: 'Poppins-Regular', fontSize: 13 }}>{orderDetail?.location}</Text>
                    </View>

                </View>
                <View style={{ marginBottom: 20, flex: 1, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                        <Icon name='location' size={25} style={{ color: '#C63A2E' }} />
                        <Text style={{ color: '#1B1B1B', fontFamily: 'Poppins-Regular', fontSize: 14, paddingLeft: 8 }}>{orderDetail?.address}</Text>
                    </View>
                </View>
                <Swiper autoplay={false}
                    height={210}
                    dotStyle={styles.dot}
                    activeDotStyle={styles.activeDot}>
                    {/* {Array.isArray(orderData) && orderData.map((slide, index) => ( */}
                    <View style={styles.slide} >
                        <Image source={{ uri: `https://custom3.mystagingserver.site/certifires/public/${orderDetail?.car_detail?.image}` }} style={styles.image} />
                    </View>
                    {/* ))} */}

                </Swiper>
                <View style={styles.proDetail}>
                    <Text style={styles.proTitle}>{orderDetail?.car_detail?.name}</Text>
                    <Text style={styles.proPrice}>${orderDetail?.car_detail?.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ backgroundColor: '#F4F4F4', borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: 80, height: 80 }}>
                        <Image source={speedometer} style={{ width: 20, height: 20 }} />
                        <Text style={{ marginTop: 6, color: '#1D1D1D', fontFamily: 'Poppins-Regular', fontSize: 12 }}>{orderDetail?.car_detail?.mileage}</Text>
                    </View>
                    <View style={{ backgroundColor: '#F4F4F4', borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: 80, height: 80 }}>
                        <Image source={transmission} style={{ width: 20, height: 20 }} />
                        <Text style={{ marginTop: 6, color: '#1D1D1D', fontFamily: 'Poppins-Regular', fontSize: 12 }}>{orderDetail?.car_detail?.trnasmission}</Text>
                    </View>
                    <View style={{ backgroundColor: '#F4F4F4', borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: 80, height: 80 }}>
                        <Image source={fuel} style={{ width: 20, height: 20 }} />
                        <Text style={{ marginTop: 6, color: '#1D1D1D', fontFamily: 'Poppins-Regular', fontSize: 12 }}>{orderDetail?.car_detail?.fuel}</Text>
                    </View>
                    <View style={{ backgroundColor: '#F4F4F4', borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: 80, height: 80 }}>
                        <Image source={engine} style={{ width: 30, height: 30 }} />
                        <Text style={{ marginTop: 6, color: '#1D1D1D', fontFamily: 'Poppins-Regular', fontSize: 12 }}>{orderDetail?.car_detail?.model}</Text>
                    </View>
                </View>
                <View style={styles.proDetailops}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
                        <Text style={styles.label}>Company</Text>
                        <Text style={styles.text}>{orderDetail?.car_detail?.make}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
                        <Text style={styles.label} >Model</Text>
                        <Text style={styles.text}>{orderDetail?.car_detail?.model}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
                        <Text style={styles.label}>Year</Text>
                        <Text style={styles.text} >{orderDetail?.car_detail?.year}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
                        <Text style={styles.label}>Car documents</Text>
                        <Text style={styles.text}>{orderDetail?.car_detail?.documents}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
                        <Text style={styles.label}>Color</Text>
                        <Text style={styles.text} >{orderDetail?.car_detail?.color}</Text>
                    </View>
                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.decription}>{orderDetail?.car_detail?.description}</Text>
                </View>

                <View style={{ padding: 8, }}>
                    <Text style={styles.modelHeading}>Schedule Inspection</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.modelLabel}>Inspection Date</Text>
                            <Text style={styles.modelText}>{orderDetail?.inspection_date}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.modelLabel}>Inspection time</Text>
                            <Text style={styles.modelText}>{orderDetail?.inspection_time}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.modelLabel}>Location</Text>
                            <Text style={styles.modelText}>{orderDetail?.location}</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.modelLabel}>Contact number</Text>
                            <Text style={styles.modelText}>{orderDetail?.user_detail?.phone}</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.modelLabel}>Address</Text>
                        <Text style={styles.modelText}>{orderDetail?.address}</Text>
                    </View>
                    <Text style={styles.heading}>Services</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                            {Array.isArray(orderDetail?.services) && orderDetail?.services.map((service, index) => (
                                <View key={index} style={{ height: 70, backgroundColor: '#F4F4F4', borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: 150, flexDirection: 'row', padding: 10, marginRight: 10, }}>
                                    <Image source={carRepairIcon} style={{ width: 25, height: 25 }} />
                                    <Text style={{ marginTop: 6, color: '#1D1D1D', fontFamily: 'Poppins-Regular', fontSize: 12, marginLeft: 10, flex: 1, }}>{service?.name}</Text>
                                </View>
                            ))}

                        </View>
                    </ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                        {/* <TouchableOpacity >
                            <Gradient gradientUse={styles.modelButton}>
                                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Chat</Text>
                            </Gradient>
                        </TouchableOpacity> */}
                        <TouchableOpacity >
                            <View style={styles.modelButton}>
                                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Call</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Text style={styles.heading}>Services</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                        {Array.isArray(orderDetail?.services) && orderDetail?.services.map((service, index) => (
                            <View key={index} style={{ height: 60, backgroundColor: '#F4F4F4', borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: 150, flexDirection: 'row', padding: 8, marginRight: 10, }}>
                                <Image source={carRepairIcon} style={{ width: 25, height: 25 }} />
                                <Text style={{ marginTop: 6, color: '#1D1D1D', fontFamily: 'Poppins-Regular', fontSize: 12, marginLeft: 10, flex: 1, }}>{service?.name}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView> */}


                {orderDetail?.status === "in progress" ?
                    (<TouchableOpacity onPress={() => navigation.navigate('inspection-report')}>
                        <Gradient gradientUse={styles.handleButton}>
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Create inspection report</Text>
                        </Gradient>
                    </TouchableOpacity>) : (
                        <View style={{
                            flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderRadius: 100,
                            padding: 8,
                            marginTop: 15,
                            marginBottom: 15,
                            backgroundColor: '#F4F4F4'

                        }}>
                            <Text style={styles.price}>Order amount: <Text>${orderDetail?.amount}</Text></Text>
                            <TouchableOpacity onPress={handleOrder} >
                                <Gradient gradientUse={styles.button}>
                                    <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Poppins-Regular', fontWeight: '700' }}>Accept</Text>
                                </Gradient>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </SafeAreaView>
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    dot: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#F5DF31',
        width: 8,
        height: 8,
        borderRadius: 6,
        marginHorizontal: 5,
    },
    proDetail: {
        padding: 8,
    },
    proTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',

    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        paddingLeft: 15,
    },
    proPrice: {
        color: '#C63A2E',
        fontFamily: 'Poppins-Regular',
        marginTop: 5
    }
    ,
    proDetailops: {
        padding: 10,
        borderRadius: 10,
        marginTop: 15,
    },
    slide: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        color: '#C63A2E',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    label: {
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',

        fontSize: 14,
        fontWeight: '700',
    },
    decription: {
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        marginTop: 10,
    },
    handleButton: {
        borderRadius: 25,
        padding: 10,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderRadius: 25,
        width: 100,
        padding: 8,
        backgroundColor: '#C63A2E',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modelButton: {
        width: 120,
        padding: 8,
        borderRadius: 100,
        justifyContent: 'center',
        backgroundColor: '#C63A2E',
        alignItems: 'center',
    },
    heading: {
        color: '#C63A2E',
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 10,
    },
    modelHeading: {
        color: '#C63A2E',
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 15,
    },
    modelLabel: {
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 5
    },
    modelText: {
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    modelCancel: {
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 15,
    },
    profile: {
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
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
        fontFamily: 'Poppins-Regular',
    },


})