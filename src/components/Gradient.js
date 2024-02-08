
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Gradient = ({ gradientUse, children }) => {
  return (
    <LinearGradient

    colors={['#C63A2E', '#F5DF31']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradient, gradientUse]}>
        {children}
    </LinearGradient>
  );
};


export default Gradient;
const styles = {
    gradient: {
   
    },
  };
  