import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/Home';
import Gradient from './Gradient';
import UserProfile from '../screens/profile/UserProfile';
import suitcase from '../../assets/images/suitcase.png';
import suitcaseColorIcon from '../../assets/images/suitcase-color.png';
import ChatList from '../screens/chat/ChatList';
import Products from '../screens/products/Products';
import LinearGradient from 'react-native-linear-gradient';
import MYOrder from '../screens/order/Order';
import Order from '../screens/order/Order';




const Tab = createBottomTabNavigator();

export default function BottomTabs() {

    return (

        <Tab.Navigator
            initialRouteName='Home'
            activeTintColor='#fff'
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarBackground: () => (
                    <Gradient gradientUse={{
                        flex: 1, borderRadius: 20, borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,

                    }} />
                ),
                tabBarStyle: {
                    height: 50,
                    backgroundColor: 'transparent',

                },
                tabBarShowLabel: true,
                headerShown: true,
            })} >

            <Tab.Screen name="home" component={Home}
                options={{
                    title: false,
                    headerShown: true,
                    headerTransparent: true,

                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: '#fff', paddingBottom: 1, fontSize: 12 }}>Home</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View style={{ backgroundColor: focused ? '#fff' : 'transparent', borderRadius: focused ? 100 : 0, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', position: focused ? 'absolute' : 'relative', top: focused ? -25 : 0, elevation: focused ? 12 : 0 }}>
                            <MaterialIcons name="home" size={25} style={{ color: focused ? '#C63A2E' : '#fff' }} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen name="my-order" component={Order} options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                tabBarLabel: ({ focused }) => (
                    <Text style={{ color: '#fff', paddingBottom: 1, fontSize: 12 }}>In progress</Text>
                ),
                tabBarIcon: ({ focused }) => (
                    <View style={{ backgroundColor: focused ? '#fff' : 'transparent', borderRadius: focused ? 100 : 0, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', position: focused ? 'absolute' : 'relative', top: focused ? -25 : 0, elevation: focused ? 12 : 0 }}>
                        {/* <CommunityIcon name="progress-wrench" size={25} style={{ color: focused ? '#C63A2E' : '#fff' }} /> */}
                        {focused ?
                            (<Image source={suitcaseColorIcon} style={{ width: 22, height: 22 }} />) :
                            (<Image source={suitcase} style={{ width: 22, height: 22 }} />)
                        }
                    </View>
                ),
            }} />
            <Tab.Screen name="chat-list" component={Home} options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                // headerShadowVisible: false,
                tabBarLabel: ({ focused }) => (
                    <Text style={{ color: '#fff', paddingBottom: 1, fontSize: 12 }}>Message</Text>
                ),
                tabBarIcon: ({ focused }) => (
                    <View style={{ backgroundColor: focused ? '#fff' : 'transparent', borderRadius: focused ? 100 : 0, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', position: focused ? 'absolute' : 'relative', top: focused ? -25 : 0, elevation: focused ? 12 : 0 }}>
                        <Icon name="chatbubble-ellipses" size={25} style={{ color: focused ? '#C63A2E' : '#fff' }} />
                    </View>
                ),
            }} />
            <Tab.Screen name="user-profile" component={UserProfile} options={{
                headerShown: true,
                headerShadowVisible: false,
                // headerTransparent: true,
                // headerTitle: 'Jane Ssmit',
                headerBackground: () => (
                    <LinearGradient
                        colors={['#C63A2E', '#F5DF31']}
                        style={{ flex: 1 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />
                ),
                headerTintColor: '#fff',
                tabBarLabel: ({ focused }) => (
                    <Text style={{ color: '#fff', paddingBottom: 1, fontSize: 12 }}>Profile</Text>
                ),
                tabBarIcon: ({ focused }) => (
                    <View style={{ backgroundColor: focused ? '#fff' : 'transparent', borderRadius: focused ? 100 : 0, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', position: focused ? 'absolute' : 'relative', top: focused ? -25 : 0, elevation: focused ? 12 : 0 }}>
                        <FontAwesomeIcon name="user" size={25} style={{ color: focused ? '#C63A2E' : '#fff' }} />
                    </View>
                ),
            }} />
        </Tab.Navigator>
    )
}