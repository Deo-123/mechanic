import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import CustomDrawer from './CustomDrawer';



const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
    return (

        <Drawer.Navigator drawerContent={(props) => <CustomDrawer{...props} />}>
            <Drawer.Screen name="Home" component={BottomTabs} options={{ headerShown: false,  drawerActiveBackgroundColor:"transparent" ,drawerActiveTintColor:"#000" }} />
        </Drawer.Navigator>
    )
}