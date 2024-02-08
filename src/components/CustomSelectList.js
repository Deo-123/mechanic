import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const CustomSelectList = ({ label, onChange, options }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleValueChange = (value) => {
        setSelectedValue(value );
        if (onChange) {
            onChange(value );
        }
    };

    return (
        <View style={styles.customField}>
            {label && (
                <Text style={styles.label}>{label}</Text>
            )}
            <SelectList
                setSelected={handleValueChange}
                data={options}
                inputStyles={{ color: '#999' }}
                save="value"
                defaultOption={false}
                placeholder=""
                search={false}
                boxStyles={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    customField: {
        marginVertical: 8,
    },
    label: {
        fontSize: 13,
        marginBottom: 4,
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        paddingLeft: 15,
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

export default CustomSelectList;
