import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomSelectList from '../../components/CustomSelectList';
import Gradient from '../../components/Gradient';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomModal from '../../components/CustomModal';
import Loader from '../../components/Loader';


const InspectionReport = () => {
    const route = useRoute()
    const { carId  , carDetail} = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [checked, setChecked] = useState({});
    const [category, setCategory] = useState([]);
    const [comment, setComment] = useState('');

    const closeModal = () => {
        setShowModal(false);
        navigation.navigate('drawer');

    };
    const openModal = (id) => {
        setShowModal(true);
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <View {...props} >
                    <Text style={styles.headerTitle}>{carDetail?.car_detail?.name}</Text>
                </View>
            )
        });
    }, [navigation, , carDetail]);
    const handleQuestionClick = (questionId) => {
        setSelectedQuestion(questionId);
    };
    const handleOptionChange = (questionId, option) => {
        setChecked((prevChecked) => ({ ...prevChecked, [questionId]: option }));
        console.log(`Selected option for Question ${questionId}: ${option}`);
    };

    const [categoryRatings, setCategoryRatings] = useState({});
    // Example of handling ratings separately for categories and subcategories
    const handleRating = (value) => {
        if (selectedQuestion !== null) {
            const selectedSection = category.find((section) => section.id === selectedQuestion);

            if (selectedSection) {
                const categoryKey = selectedSection.id.toString();

                setCategoryRatings((prevRatings) => ({
                    ...prevRatings,
                    [categoryKey]: value,
                }));
            }
        }
    };




    const handleFormSubmit = async () => {
        // Create an object to store the responses
        const responses = Object.keys(checked).map((questionId) => {
            let category_id = null;
            let subcategory_id = null;
            let category_score = null;

            // Find the category containing the question
            const foundCategory = category.find((section) => {
                if (section.questions) {
                    const foundQuestion = section.questions.find((q) => q.id == questionId);
                    if (foundQuestion) {
                        category_id = section.id.toString();
                        category_score = categoryRatings[category_id] || 0;
                        return true;
                    }
                }
                if (section.subcategories) {
                    const foundSubcategory = section.subcategories.find((sub) => {
                        const foundQuestion = sub.questions.find((q) => q.id == questionId);
                        if (foundQuestion) {
                            category_id = section.id.toString();
                            subcategory_id = sub.id.toString();
                            category_score = categoryRatings[category_id] || 0;
                            return true;
                        }
                    });
                    if (foundSubcategory) {
                        return true;
                    }
                }
                return false;
            });

            return {
                category_id,
                subcategory_id,
                question_id: questionId,
                option_id: checked[questionId].toString(),

                category_score,
            };
        });

        console.log(responses);


        try {
            // console.log(responses);
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            const res = await axios.post(
                'https://custom3.mystagingserver.site/certifires/public/api/mechanic/report-inspection-complete',
                {
                    report: responses,
                    car_id: carId,
                    comment: comment,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            setSuccess("Inspection successful");
            openModal();
            console.log('Response:', res.data);
        } catch (error) {
            console.error('Error Submit Report:', error.response ? error.response.data : error.message);
        }
        finally{
            setLoading(false);
        }
    };



    const fetchData = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get('https://custom3.mystagingserver.site/certifires/public/api/mechanic/report-inspection', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setCategory(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderForm = () => {
        let categoryKey = null;
        if (selectedQuestion !== null) {
            const selectedSection = category.find((section) => section.id === selectedQuestion);

            if (selectedSection) {
                categoryKey = selectedSection.id.toString();

                if (selectedSection.subcategories && selectedSection.subcategories.length > 0) {
                    return (
                        <View style={{ marginVertical: 10 }}>
                            {selectedSection.subcategories.map((subcategory) => (
                                <View key={subcategory.id} style={{ marginVertical: 10 }}>
                                    <Text style={styles.subHeading}>{subcategory.text}</Text>
                                    {subcategory.questions.map((question, index) => (
                                        <View key={question.id}>
                                            <Text style={styles.question}>{`${index + 1}. ${question.text}`}</Text>
                                            <RadioButton.Group
                                                onValueChange={(value) => handleOptionChange(question.id, value)}
                                                value={checked[question.id]}
                                            >
                                                <View style={styles.radioGroup}>
                                                    {question.options.map((option) => (
                                                        <RadioButton.Item
                                                            key={option.id}
                                                            label={option.text}
                                                            value={option.id}
                                                            text={checked[question.id] === option.id ? 'checked' : 'unchecked'}
                                                            labelStyle={styles.labelSmall}
                                                            uncheckedColor="#1D1D1D"
                                                            color="#C63A2E"
                                                            style={{ marginVertical: -8 }}
                                                        />
                                                    ))}
                                                </View>
                                            </RadioButton.Group>
                                        </View>
                                    ))}

                                </View>
                            ))}
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.heading}>Inspection <Text style={{ color: '#C63A2E' }}>rate</Text></Text>
                                <View style={styles.ratingContainer}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                        <TouchableOpacity
                                            key={value}
                                            style={[
                                                styles.ratingItem,
                                                { backgroundColor: categoryRatings[categoryKey] && categoryRatings[categoryKey] >= value ? '#C63A2E' : 'gray' },
                                            ]}
                                            onPress={() => handleRating(value)}
                                        >
                                            <Text style={styles.ratingText}>{value}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {/* <Text style={styles.selectedRating}>Selected Rating: {categoryRatings[categoryKey]}</Text> */}
                            </View>
                        </View>
                    );
                } else {
                    return (
                        <View style={{ marginVertical: 10 }}>
                            {selectedSection.questions.map((question, index) => (
                                <View key={question.id}>
                                    <Text style={styles.question}>{`${index + 1}. ${question.text}`}</Text>
                                    <RadioButton.Group
                                        onValueChange={(value) => handleOptionChange(question.id, value)}
                                        value={checked[question.id]}
                                    >
                                        <View style={styles.radioGroup}>
                                            {question.options.map((option) => (
                                                <RadioButton.Item
                                                    key={option.id}
                                                    label={option.text}
                                                    value={option.id}
                                                    text={checked[question.id] === option.id ? 'checked' : 'unchecked'}
                                                    labelStyle={styles.labelSmall}
                                                    uncheckedColor="#1D1D1D"
                                                    color="#C63A2E"
                                                    style={{ marginVertical: -8 }}
                                                />
                                            ))}
                                        </View>
                                    </RadioButton.Group>
                                </View>
                            ))}
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.heading}>Inspection <Text style={{ color: '#C63A2E' }}>rate</Text></Text>
                                <View style={styles.ratingContainer}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                        <TouchableOpacity
                                            key={value}
                                            style={[
                                                styles.ratingItem,
                                                { backgroundColor: categoryRatings[categoryKey] && categoryRatings[categoryKey] >= value ? '#C63A2E' : 'gray' },
                                            ]}
                                            onPress={() => handleRating(value)}
                                        >
                                            <Text style={styles.ratingText}>{value}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {/* <Text style={styles.selectedRating}>Selected Rating: {categoryRatings[categoryKey]}</Text> */}
                            </View>
                        </View>
                    );
                }
            }
        }

        return (
            null
        );
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff', }}>
               <Loader loading={loading} />
               <CustomModal visible={showModal} onClose={closeModal} success={success} />
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>Digital <Text style={{ color: '#C63A2E' }}>Inspection Report</Text></Text>
                <Text style={styles.subHeading}>Inspection categories</Text>
                {category.map((question, index) => (
                    <View key={question.id}>
                        <TouchableOpacity

                            onPress={() => handleQuestionClick(question.id === selectedQuestion ? null : question.id)}
                        >
                            <Gradient gradientUse={styles.button}>

                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <View style={{
                                        backgroundColor: '#fff',
                                        borderRadius: 25,
                                        width: 33,
                                        height: 33,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 10
                                    }}>
                                        <Text style={{ color: '#1D1D1D', fontSize: 16 }}>{index + 1}</Text>
                                    </View>
                                    <Text style={styles.buttonText}>{question.text}</Text>
                                </View>
                            </Gradient>
                        </TouchableOpacity>
                        {selectedQuestion === question.id && renderForm()}
                    </View>
                ))}
                <Text style={styles.subHeading}>Comment</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Comment here"
                    value={comment}
                    placeholderTextColor="#1D1D1D"
                    onChangeText={(text) => setComment(text)}
                    multiline={true}
                />

                <TouchableOpacity onPress={handleFormSubmit}>
                    <Gradient gradientUse={styles.handleButton}>
                        <Text style={{ color: '#fff', fontSize: 16, }}>Submit</Text>
                    </Gradient>
                </TouchableOpacity>

            </SafeAreaView>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#1D1D1D',
        color: '#1D1D1D',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    ratingItem: {
        width: 40,
        height: 40,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,

    },
    ratingText: {
        color: '#fff',
        fontSize: 14,

    },
    selectedRating: {
        marginTop: 20,
        fontSize: 18,
    },
    container: {
        padding: 15,
        flex: 1,
    },
    headerTitle:{
        fontSize: 19,
        color: '#1D1D1D',
        fontWeight: '700',
   
    },
    heading: {
        fontSize: 20,
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        marginVertical: 10,
    },
    subHeading: {
        fontSize: 18,
        color: '#1D1D1D',
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        marginVertical: 10,
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
    question: {
        fontSize: 16,
        color: '#1D1D1D',
        fontWeight: '700',
        marginTop: 15,

    },
    radioGroup: {
    },
    labelSmall: {
        fontSize: 15,
    },
})
export default InspectionReport;