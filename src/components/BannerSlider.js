import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BannerSlider = ({ titles, imageSource, buttonText, onPress ,description }) => {
  return (
    <TouchableOpacity style={styles.slide} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{titles}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
  },
  title: {
    fontSize: 16, 
    color: 'white', 
    marginBottom: 5, 
    fontFamily: 'Poppins-Regular',
    fontWeight:'700',
  },
  description:{
    fontSize: 12, 
    color: 'white', 
    marginBottom: 5, 
    fontFamily: 'Poppins-Regular',
  },

});

export default BannerSlider;
