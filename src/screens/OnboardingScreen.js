import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ImageBackground, StatusBar, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import Gradient from '../components/Gradient';
import onb1 from '../../assets/images/onb1.png';
import onb2 from '../../assets/images/onb2.png';
import onb3 from '../../assets/images/onb3.png';
import ellipse from '../../assets/images/ellipse.png'
import { useNavigation } from '@react-navigation/native';

const Dots = ({ selected }) => {
    return (
        <View
            style={{
                width: selected ? 30 : 8,
                height: 8,
                marginHorizontal: 3,
                backgroundColor: selected ? '#C63A2E' : '#cfcece',
                borderRadius: 100,
                marginBottom: 100
            }}
        />
    );
};
const Skip = ({ ...props }) => (
    <TouchableOpacity style={{
        backgroundColor: '#979797',
        borderRadius: 100,
        width: 100,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 20
    }} {...props}>
        <Text style={{ fontSize: 14, color: '#272727', fontFamily: 'Poppins-Regular' }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        {...props}
    >
        <Gradient gradientUse={{
            borderRadius: 100,
            width: 100,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
            marginBottom: 20
        }} >
            <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Poppins-Regular' }}>Next</Text>
        </Gradient>
    </TouchableOpacity>
);
const Done = ({ ...props }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          width: 200,
          marginRight:95,
          height: 35,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...props}
      >
        <Gradient
          gradientUse={{
            borderRadius: 100,
            width: '100%', 
            
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Poppins-Regular' }}>
            Get Started
          </Text>
        </Gradient>
      </TouchableOpacity>
    </View>
  );
  
  
  const Onboarding1 = () => {
    const slideAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(
        slideAnim,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    }, [slideAnim]);
  
    const translateY = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });
  
    return (
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Image source={onb1} />
      </Animated.View>
    );
  };
  

export default function OnboardingScreen() {
    const navigation = useNavigation();
 
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                translucent={true}
                backgroundColor="transparent"
            />
            <Onboarding
                bottomBarColor={'#FFFFFF'}
                DotComponent={Dots}
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                onDone={() => navigation.navigate('login')}
                onSkip={() => navigation.navigate('login')}


                pages={[

                    {
                        backgroundColor: '#fff',
                        image: <Onboarding1/>,
                        title: <Text style={styles.onTitle}>Gather Documentation</Text>,
                        subtitle: <Text style={styles.onSubTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>,
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={onb2} style={{ width: '100%' }} />,
                        title: <Text style={styles.onTitle}>Determine the Car's Value</Text>,
                        subtitle: <Text style={styles.onSubTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>,
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image source={onb3} style={{ width: '100%' }} />,
                        title: <Text style={styles.onTitle}>Earn By Providing Your Expertise</Text>,
                        subtitle: <Text style={styles.onSubTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>,
                    },

                ]}
            />
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    rightImage: {
        position: 'absolute',
        right: 0,
        top: -50
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',


        alignItems: 'center'
    },

    onTitle: {
        fontSize: 20,
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        marginBottom: 10,
    },
    onSubTitle: {
        fontSize: 14,
        width: '80%',
        color: '#292929',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        marginBottom: 20
    },
});


