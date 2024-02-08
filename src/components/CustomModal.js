import React from 'react';
import { Modal, View, Text, Pressable, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import Gradient from './Gradient';
const CustomModal = ({ visible, error, onClose, content }) => {
    return (
        <Modal
            transparent={true}
            statusBarTranslucent={true}
            animationType={'none'}
            visible={visible}
            onRequestClose={() => {
                console.log('close modal');
            }}
        >
            <View style={styles.modalBackground}>
            <View style={styles.modal}>
                    {content ? content : (
                        <>
                           <View style={styles.modalView}>
                            <View style={styles.iconContainer}>
                                <FontAwesomeIcon name="exclamation" size={20} color={'#fff'} />
                            </View>
                            <Text style={styles.modalText}>{error}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => {
                                    onClose();
                                }}>
                                    <Gradient
                                        gradientUse={styles.okButton}
                                    >
                                        <Text style={styles.buttonText}>Ok</Text>
                                    </Gradient>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </>
                    )}

                </View>
            </View>
        </Modal>
    );
};

const styles = {
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    modal:{
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: 260,
        height: 180,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C63A2E',
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    modalText: {
        color: '#393939',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginTop: -25,
    },
    okButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: '#BD218F',
        borderRadius: 10,
        width: 80,
        height: 35,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
};

export default CustomModal;
