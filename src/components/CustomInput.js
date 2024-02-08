import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ label, placeholder, onChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text) => {
        setInputValue(text);

        // Call the onChange prop if provided
        if (onChange) {
            onChange(text);
        }
    };

    return (
        <View style={styles.customField}>
            {label && (
                <Text style={styles.label}>{label}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={handleInputChange}
                value={inputValue}
                placeholderTextColor="#999"
            // You can add more TextInput props as needed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    customField: {
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        paddingLeft: 20,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        fontFamily: 'Poppins-Regular',
        padding: 8,
        borderRadius: 25,
        paddingLeft: 20,
        borderColor: '#ccc',
    },
});

export default CustomInput;
