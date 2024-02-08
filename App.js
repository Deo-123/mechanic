import * as React from 'react';
import { View, Button, Text, Animated } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/screens/Home';
import Dummy from './Dummy';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import DrawerNavigator from './src/components/DrawerNavigator';
import ProductDetail from './src/screens/products/ProductDetail';
import store from './src/store/store';
import { Provider } from 'react-redux';
import Chat from './src/screens/chat/Chat';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import Verification from './src/screens/auth/Verification';
import ResetPassword from './src/screens/auth/ResetPassword';
import InspectionReport from './src/screens/inspection/InspectionReport';
import { AppContextProvider } from './src/context/Context';
import MYOrder from './src/screens/order/Order';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="onboarding-screen">
      <Stack.Screen name="onboarding-screen" component={OnboardingScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="register" component={RegisterScreen} options={{ headerTitle: '' , headerTransparent: true, }} />
      <Stack.Screen name="forgot-pass" component={ForgotPassword} options={{
        headerShown: true,
        headerTitle: 'Forgot Password',
        headerShadowVisible: false,
      }} />
      <Stack.Screen name="verification" component={Verification} options={{
        headerShadowVisible: false,
        headerShown: true,
        headerTitle: 'Verification',
      }} />
            <Stack.Screen name="reset-password" component={ResetPassword} options={{
        headerShadowVisible: false,
        headerShown: true,
        headerTitle: 'Reset Password',
      }} />
    </Stack.Navigator>
  );
};

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {

      ...DefaultTheme.colors,
      background: 'rgb(242, 242, 242)',
    },
  };
  return (
    <AppContextProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="splash-screen">
          <Stack.Screen name="splash-screen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="auth" component={Auth} options={{ headerShown: false }} />
          {/* <Stack.Screen name="home" component={Home} /> */}
          <Stack.Screen name="drawer" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="product-detail" component={ProductDetail} options={{
            headerTitle: 'Inspection Order Detail',
            // headerShadowVisible: false,
            // headerTitleAlign: 'center',
          }} />
                 <Stack.Screen name="inspection-report" component={InspectionReport} options={{
            headerTitle: 'Create inspection report',
            // headerShadowVisible: false,
            // headerTitleAlign: 'center',
          }} />
                 {/* <Stack.Screen name="my-order" component={MYOrder} options={{
            headerTitle: 'Create inspection report',
            // headerShadowVisible: false,
            // headerTitleAlign: 'center',
          }} /> */}
          <Stack.Screen name="chat" component={Chat} options={{ headerTitle: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}
