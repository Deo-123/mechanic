import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import ellipse from '../../../assets/images/ellipse.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loader from '../../components/Loader';
import CustomModal from '../../components/CustomModal';
import Gradient from '../../components/Gradient';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Add state for user registration data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [ssn, setSsn] = useState('');
  const [experience, setExperience] = useState('');
  const [services, setServices] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [password, setPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <TouchableOpacity
          {...props}
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 16 }}
        >
          <Icon name="arrow-back" size={20} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const fetchData = async () => {
    try {
        const response = await axios.get('https://custom3.mystagingserver.site/certifires/public/api/car-services-listing', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const newArray = response.data.data.map((item) => {
          return {key: item.id, value: item.name}
        })

        setServicesList(newArray) 
     console.log(services);
    } catch (error) {
        console.error('Error:', error);
    }
};

useEffect(() => {
    fetchData();
}, []);
  const openModal = () => {
    setShowModal(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(services);
  
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      // Perform form validation
      if (
        !firstName ||
        !lastName ||
        !email ||
        !city ||
        !zipCode ||
        !state ||
        !ssn ||
        !experience ||
        // services.length === 0 ||
        !password
      ) {
        setError('Please fill in all the fields.');
        setShowModal(true);
        return;
      }
      const response = await axios.post(
        'https://custom3.mystagingserver.site/certifires/public/api/mechanic-register',
        {
          first_name: firstName,
          last_name: lastName,
          email:email,
          city:city,
          zip_code: zipCode,
          state:state,
          ssn:ssn,
          years_of_exp: experience,
          password:password,
          services:services, 
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          
        }
      );

      console.log('Registration response:', response.data);
      navigation.navigate('login');

    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const data = [
    { key: 'Service 1', value: 'Service 1' },
    { key: 'Service 2', value: 'Service 2' },
    { key: 'Service 3', value: 'Service 3' },
    { key: 'Service 4', value: 'Service 4' },
    { key: 'Service 5', value: 'Service 5' },
  ];

  return (
    <View style={styles.container}>
      <CustomModal visible={showModal} error={error} onClose={openModal} />
      <Loader loading={loading} />
      <Image source={ellipse} style={styles.leftImage} />
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        translucent={true}
        backgroundColor="transparent"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.Heading}>Sign Up</Text>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            placeholderTextColor="#292929"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            placeholderTextColor="#292929"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#292929"
            value={email}
            onChangeText={setEmail}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              style={styles.inputHalf}
              placeholder="City"
              placeholderTextColor="#292929"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.inputHalf}
              placeholder="ZIP Code"
              placeholderTextColor="#292929"
              value={zipCode}
              onChangeText={setZipCode}
            />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="State"
            placeholderTextColor="#292929"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            style={styles.textInput}
            placeholder="SSN"
            placeholderTextColor="#292929"
            value={ssn}
            onChangeText={setSsn}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Years Of Experience"
            placeholderTextColor="#292929"
            value={experience}
            onChangeText={setExperience}
          />
          <View style={{ width: '90%' }}>
            <MultipleSelectList
              setSelected={(val) => setServices(val)}
              data={servicesList}
              badgeStyles={{ backgroundColor: '#C63A2E' }}
              inputStyles={{ color: '#292929' }}
              save="key"
              defaultOption={false}
              placeholder="Services You Provide"

              label="Services"
            //   search={false}
            boxStyles={{
                marginTop: 15,
                marginBottom: 10,
                color: "#292929",
                borderWidth: 1,
                borderColor: '#292929',
                paddingLeft: 20,
                borderRadius: 25,
            }}
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#292929"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Icon
                style={styles.eyeIcon}
                name={showPassword ? 'eye-off' : 'eye'}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: '90%' }}>
            <TouchableOpacity onPress={handleSignUp}>
              <Gradient gradientUse={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </Gradient>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: '#303030',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            Don’t have an account?{' '}
            <Text style={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('login')}>
              Sign In
            </Text>{' '}
          </Text>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
  leftImage: {
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Heading: {
    fontSize: 28,
    color: '#1D1D1D',
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 8,
    paddingLeft: 20,
    width: '90%',
    marginTop: 15,
    marginBottom: 10,
    color: '#292929',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 100,
  },
  inputHalf: {
    backgroundColor: '#fff',
    padding: 8,
    paddingLeft: 20,
    width: '48%',
    marginTop: 15,
    marginBottom: 10,
    color: '#292929',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 100,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '90%',
    marginTop: 15,
    marginBottom: 15,
    color: '#292929',
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 100,
  },
  passwordInput: {
    flex: 1,
    padding: 8,
    paddingLeft: 20,
  },
  eyeIcon: {
    padding: 8,
    color: '#303030',
    fontSize: 25,
  },
  button: {
    borderRadius: 100,
    width: '100%',
    padding: 12,
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
  },
});
