import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import user from '../../assets/images/user1.jpg';
import dummyUser from '../../assets/images/dummy-user.png';
import { Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Pressable } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gradient from './Gradient';
import { useAppContext } from '../context/Context';
import suitcaseColorIcon from '../../assets/images/suitcase-color.png';

export default CustomDrawer = (props) => {
    const navigation = useNavigation();
    const { userData, setUserDate } = useAppContext();



    useFocusEffect(
        useCallback(() => {
        }, [userData]),
    );

    async function logoutMyToken() {
        try {
            await AsyncStorage.removeItem('userToken');
            navigation.replace('auth');
            setUserDate(null);
        } catch (e) {
            await AsyncStorage.removeItem('userToken');
            navigation.replace('auth');
        }
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            <View style={styles.drawerItems}>
                <Gradient gradientUse={styles.drawerHeader}>
                    <Pressable onPress={() => navigation.navigate('user-profile')} >
                        <View style={styles.userProfile}>
                            <Image
                                source={{ uri: `https://custom3.mystagingserver.site/certifires/public/${userData?.image}` }}
                                style={styles.userProfileImage}
                            />
                            <View style={styles.userProfileInfo}>
                                <Text style={styles.userText}>{userData?.first_name}{" "}{userData?.last_name}</Text>
                                <Text style={{ color: '#ddd' }}>View Profile</Text>
                            </View>
                        </View>
                    </Pressable>
                </Gradient>
                <TouchableOpacity style={styles.drawerItem}
                    onPress={() => {
                        navigation.navigate('home')
                    }}>
                    <Icon name="home" style={styles.Icon} />
                    <Text style={{ color: '#1D1D1D', fontSize: 16, fontWeight: '600' }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem}
                    onPress={() => {
                        navigation.navigate('my-order')
                    }}>
                    {/* <Icon name="view-list" style={styles.Icon} /> */}
                    <Image source={suitcaseColorIcon} style={{ width: 18, height: 18, marginRight: 15, }} />
                    <Text style={{ color: '#1D1D1D', fontSize: 16, fontWeight: '600' }}>In progress jobs</Text>
                </TouchableOpacity>
            </View>
            <Gradient gradientUse={styles.drawerFooter}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    marginVertical: 16,
                }} onPress={() => { logoutMyToken(); }}>
                    <AntDesign name="logout" style={styles.drawerIcon} />
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', fontFamily: 'Poppins-Regular', }}>Sign Out</Text>
                </TouchableOpacity>
            </Gradient>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingTop: 0,
    },
    drawerHeader: {
        backgroundColor: '#F8F8F8',
        padding: 16,
        paddingVertical: 40
    },
    userProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userProfileImage: {
        width: 70,
        height: 70,
        borderWidth: 2,
        borderRadius: 100,
    },
    userProfileInfo: {
        marginLeft: 10,
    },
    userText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    drawerItems: {
        justifyContent: 'flex-start'
    },
    drawerFooter: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 10,
    }
    ,
    Icon: {
        color: "#C63A2E",
        fontSize: 20,
        fontWeight: "700",
        paddingRight: 10,
    },
    drawerIcon: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
        paddingRight: 10,
    }
});