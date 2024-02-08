import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import user from '../../../assets/images/user.png';
import user2 from '../../../assets/images/user2.png';
import user3 from '../../../assets/images/user3.png';
import user4 from '../../../assets/images/user4.png';
import user5 from '../../../assets/images/user5.png';
import user6 from '../../../assets/images/user6.png';
import { useNavigation } from '@react-navigation/native';

export default function ChatList() {
     const navigation = useNavigation();
    const dummyData = [
        {
            id: 1,
            userImg: user,
            userName: 'John Doe',
            lastChatMsg: "I'm doing well, thanks!",
            lastMsgTime: '10:30 AM',
        },
        {
            id: 2,
            userImg: user2,
            userName: 'Jane Smith',
            lastChatMsg: "I'm doing well, thanks!",
            lastMsgTime: '11:45 AM',
        },
        {
            id: 3,
            userImg: user3,
            userName: 'Bob Johnson',
            lastChatMsg: "Hey, what's up?",
            lastMsgTime: '1:15 PM',
        },
        {
            id: 4,
            userImg: user4,
            userName: 'Emily Davis',
            lastChatMsg: "I'm doing well, thanks!",
            lastMsgTime: '2:20 PM',
        },
        {
            id: 5,
            userImg: user5,
            userName: 'Alex Turner',
            lastChatMsg: 'it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.',
            lastMsgTime: '3:30 PM',
        },
        {
            id: 6,
            userImg: user,
            userName: 'John Doe',
            lastChatMsg: "I'm doing well, thanks!",
            lastMsgTime: '10:30 AM',
        },
        {
            id: 7,
            userImg: user2,
            userName: 'Jane Smith',
            lastChatMsg: "I'm doing well, thanks!",
            lastMsgTime: '11:45 AM',
        },
        {
            id: 8,
            userImg: user3,
            userName: 'Bob Johnson',
            lastChatMsg: "Hey, what's up?",
            lastMsgTime: '1:15 PM',
        },
        {
            id: 9,
            userImg: user4,
            userName: 'Emily Davis',
            lastChatMsg: "I'm doing well, thanks!",
            lastMsgTime: '2:20 PM',
        },
        {
            id: 10,
            userImg: user5,
            userName: 'Alex Turner',
            lastChatMsg: 'it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.',
            lastMsgTime: '3:30 PM',
        },


    ];


    const renderItem = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('chat', { id: item.id })}>
        <View style={styles.chatConversation}>
            <Image source={item.userImg} style={styles.userImage} />
            <View style={styles.textContainer}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.lastChatMsg}>{item.lastChatMsg && item.lastChatMsg.length > 35 ? `${item.lastChatMsg.substring(0, 35)}...` : item.lastChatMsg}</Text>
            </View>
            <Text style={styles.lastMsgTime}>{item.lastMsgTime}</Text>
        </View>
        </TouchableOpacity>
    );
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Search chats..."
                  placeholderTextColor="#292929"
                />
                    <FlatList
                        data={dummyData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        style={styles.flatList}
                    />
            </SafeAreaView>
        </ScrollView>

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