import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import BannerSlider from './BannerSlider';
import bnImage from '../../assets/images/banner.png'


export default function Banner() {
    const slidesData = [
        {
          title: '2018 BMW X1 Xdrive 20d',
          decription:'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          imageSource: bnImage, // Example image source
          buttonText: 'Learn More',
        },
        {
          title: 'Slide 2',
          imageSource: bnImage,
          decription:'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          buttonText: 'Explore',
        },
        // Add more slide data as needed
      ];
    return (
        <Swiper autoplay={true}
            height={220}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
        >
            {slidesData.map((slide, index) => (
                <BannerSlider
                    key={index}
           
                    imageSource={slide.imageSource}
                    titles={slide.title}
                    description={slide.decription}
                    buttonText={slide.buttonText}
                />
            ))}
        </Swiper>
    )
}

const styles = StyleSheet.create({
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
})