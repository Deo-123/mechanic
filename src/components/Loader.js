import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Text } from 'react-native';

const Loader = (props) => {
    const { loading, ...attributes } = props;

    return (
        <Modal
            transparent={true}
            statusBarTranslucent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
                console.log('close modal');
            }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" color="#C63A2E"   />
                    <Text style={{ fontSize: 16, color: '#303030' ,marginTop: 10 }}>Please Wait</Text>
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        width: 250,
        height: 150,
    },
});
