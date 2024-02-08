import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomSelectList from '../../components/CustomSelectList';
import Gradient from '../../components/Gradient';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You may need to install this library


const InspectionReport = () => {
   
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [checked, setChecked] = useState({});
    const [mainQuestion, setMainQuestion] = useState([
        {
            id: 1,
            text: "Core Support - Accident Checklist",
            questions: [
                { id: 1, text: "Radiator Core Support", options: [{ id: 1, status: "Non-Accidented" }, { id: 2, status: "Accidented" }] },
                { id: 2, text: "Right Strut Tower Apron", options: [{ id: 3, status: "Non-Accidented" }, { id: 4, status: "Accidented" }] },
                { id: 3, text: "Left Strut Tower Apron", options: [{ id: 5, status: "Non-Accidented" }, { id: 6, status: "Accidented" }] },
                { id: 4, text: "Right Front Rail", options: [{ id: 7, status: "Non-Accidented" }, { id: 8, status: "Accidented" }] },
                { id: 5, text: "Left Front Rail", options: [{ id: 9, status: "Non-Accidented" }, { id: 10, status: "Accidented" }] },
                { id: 6, text: "Cowl Panel Firewall", options: [{ id: 11, status: "Non-Accidented" }, { id: 12, status: "Accidented" }] },
                { id: 7, text: "Right A Pillar", options: [{ id: 13, status: "Non-Accidented" }, { id: 14, status: "Accidented" }] },
                { id: 8, text: "Left A Pillar", options: [{ id: 15, status: "Non-Accidented" }, { id: 16, status: "Accidented" }] },
                { id: 9, text: "Right B Pillar", options: [{ id: 17, status: "Non-Accidented" }, { id: 18, status: "Accidented" }] },
                { id: 10, text: "Left B Pillar", options: [{ id: 19, status: "Non-Accidented" }, { id: 20, status: "Accidented" }] },
                { id: 11, text: "Right C Pillar", options: [{ id: 21, status: "Non-Accidented" }, { id: 22, status: "Accidented" }] },
                { id: 12, text: "Left C Pillar", options: [{ id: 23, status: "Non-Accidented" }, { id: 24, status: "Accidented" }] },
                { id: 13, text: "Boot Floor", options: [{ id: 25, status: "Non-Accidented" }, { id: 26, status: "Accidented" }] },
                { id: 14, text: "Boot Lock Pillar", options: [{ id: 27, status: "Non-Accidented" }, { id: 28, status: "Accidented" }] },
                { id: 15, text: "Front Sub Frame", options: [{ id: 29, status: "Non-Accidented" }, { id: 30, status: "Accidented" }] },
                { id: 16, text: "Rear Sub Frame", options: [{ id: 31, status: "Non-Accidented" }, { id: 32, status: "Accidented" }] }
            ],
        },
        {
            id: 2,
            text: "Engine - transmission - clutch",
            questions: [
                { id: 1, text: "Engine Oil Level", options: [{ id: 1, status: "Sludge" }, { id: 2, status: "Clean" }] },
                { id: 2, text: "Engine Oil Leakage", options: [{ id: 3, status: "Leakage" }, { id: 4, status: "No Leakage" }] },
            ],
        },
        {
            id: 3,
            text: "Engine - transmission - clutch",
            questions: [
                { id: 1, text: "Engine Oil Level", options: [{ id: 1, status: "Sludge" }, { id: 2, status: "Clean" }] },
                { id: 2, text: "Engine Oil Leakage", options: [{ id: 3, status: "Leakage" }, { id: 4, status: "No Leakage" }] },
            ],
        },{
            id: 4,
            text: "Engine - transmission - clutch",
            questions: [
                { id: 1, text: "Engine Oil Level", options: [{ id: 1, status: "Sludge" }, { id: 2, status: "Clean" }] },
                { id: 2, text: "Engine Oil Leakage", options: [{ id: 3, status: "Leakage" }, { id: 4, status: "No Leakage" }] },
            ],
        },{
            id: 5,
            text: "Engine - transmission - clutch",
            questions: [
                { id: 1, text: "Engine Oil Level", options: [{ id: 1, status: "Sludge" }, { id: 2, status: "Clean" }] },
                { id: 2, text: "Engine Oil Leakage", options: [{ id: 3, status: "Leakage" }, { id: 4, status: "No Leakage" }] },
            ],
        }
    ]);

    const handleQuestionClick = (questionId) => {
        setSelectedQuestion(questionId);
    };
    const handleOptionChange = (questionId, option) => {
        setChecked((prevChecked) => ({ ...prevChecked, [questionId]: option }));
        console.log(`Selected option for Question ${questionId}: ${option}`);
    };
    const submitFormToAPI = async () => {
        // Extract selected questions and options
        const selectedSection = mainQuestion.find((section) => section.id === selectedQuestion);
        const selectedOptions = selectedSection.questions.map((question) => ({
            questionId: question.id,
            selectedOption: checked[question.id],
             
        }));
        console.log('selectedOptions' ,selectedOptions);

        // try {
        //     // Make a POST request to your API endpoint
        //     const response = await axios.post('YOUR_API_ENDPOINT', {
        //         selectedOptions,
        //     });

        //     // Handle the API response if needed
        //     console.log('API Response:', response.data);
        // } catch (error) {
        //     // Handle errors
        //     console.error('API Error:', error);
        // }
    };
    
    const renderForm = () => {
        if (selectedQuestion !== null) {
            const selectedSection = mainQuestion.find((section) => section.id === selectedQuestion);
            if (selectedSection) {
                return (
                    <View  style={{ marginVertical:20}}>
                        {selectedSection.questions.map((question, index) => (
                            <View key={question.id}>
                                <Text style={styles.subQuestion}>{`${index + 1}. ${question.text}`}</Text>
                                <RadioButton.Group
                                    onValueChange={(value) => handleOptionChange(question.id, value)}
                                    value={checked[question.id]}
                                >
                                    <View style={styles.radioGroup}>
                                        {question.options.map((option) => (
                                            <RadioButton.Item
                                                key={option.id}
                                                label={option.status}
                                                value={option.id}
                                                status={checked[question.id] === option.status ? 'checked' : 'unchecked'}
                                                labelStyle={styles.labelSmall}
                                                uncheckedColor="#1D1D1D"
                                                color="#C63A2E"
                                                style={{ marginVertical: -8, }} 
                                            />
                                        ))}
                                    </View>
                                </RadioButton.Group>
                            </View>
                        ))}
                   
                    </View>
                );
            }
        }
        return null;
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <View>
                    {/* <Text style={styles.heading}>Inspection Report</Text> */}
                    {mainQuestion.map((question) => (
                        <TouchableOpacity
                            key={question.id}
                            // style={styles.button}
                            onPress={() => handleQuestionClick(question.id)}
                        >
                            <Gradient gradientUse={styles.button}>
                            <Text style={styles.buttonText}>{question.text}</Text>
                            </Gradient>
                        </TouchableOpacity>
                    ))}
                    {renderForm()}
                         <TouchableOpacity onPress={submitFormToAPI}>
                            <Gradient gradientUse={styles.handleButton}>
                                <Text style={{ color: '#fff' }}>Submit</Text>
                            </Gradient>
                        </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        // backgroundColor: '#fff',
        flex: 1,
    },
    heading:{
        fontSize: 18,
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontWeight:'600'
    },
    button: {
        backgroundColor: '#ddd',
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        shadowOpacity: 0.2,
        elevation: 2,
    },
    handleButton: {
        padding: 10,
        marginVertical: 20,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    subQuestion: {
        fontSize: 15,
        color: '#1D1D1D',
        fontWeight:'600',
        marginTop:10,
    },
    radioGroup: {
    },
    labelSmall: {
        fontSize: 14, 
    },
})
export default InspectionReport;