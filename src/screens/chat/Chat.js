import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import user4 from '../../../assets/images/user4.png';

export default function Chat() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity {...props} onPress={() => navigation.goBack()} style={{ paddingRight: 15 }}>
                        <Ionicons name="arrow-back" size={20} color="#000" />
                    </TouchableOpacity>
                        <Image source={user4} style={styles.userImage} />
                        <View>
                            <Text style={styles.userName}>Emily Davis</Text>
                            <Text style={styles.lastChatMsg}>online</Text>
                        </View>
                    </View>
                </View>
            ),

            headerStyle: {
                backgroundColor: '#fff',
            },
        });
    }, [navigation]);
    return (
        <View>
        
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    textInput: {
        // backgroundColor: "#fff",
        padding: 5,
        paddingLeft: 20,
        width: "100%",
        color: "#292929",
        borderWidth: 1,
        borderColor: '#292929',
        borderRadius: 100,
        marginBottom: 20,
    },
    chatConversation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    userName: {
        fontWeight: '700',
        fontSize: 14,
        color: '#343434',
        fontFamily: 'Poppins-Regular',
    },
    lastChatMsg: {
        fontSize: 12,
        color: '#626262',
        fontFamily: 'Poppins-Regular',
    },
    lastMsgTime: {
        color: '#343434',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
    },
    flatList: {
        flex: 1,
    },
})