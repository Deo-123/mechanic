import { createContext, useContext as useReactContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userData, setUserDetails] = useState(null);
  const [appSettings, setAppSettings] = useState({ theme: 'light', language: 'en' });

  useEffect(() => {
    // On component mount, try to retrieve user data from AsyncStorage
    const retrieveUserData = async () => {
      try {
        const storedUserDataString = await AsyncStorage.getItem('userData');
        if (storedUserDataString) {
          const storedUserData = JSON.parse(storedUserDataString);
          setUserDetails(storedUserData);
        }
      } catch (error) {
        console.log("Error retrieving user data from AsyncStorage:", error);
      }
    };

    retrieveUserData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const setUserDate = async (details) => {
    setUserDetails(details);
    // console.log('Updated userData:', details);

    // Store the updated user data in AsyncStorage
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(details));
    } catch (error) {
      console.log("Error storing user data in AsyncStorage:", error);
    }
  };

  const setSettings = (newSettings) => {
    setAppSettings(newSettings);
  };

  return (
    <AppContext.Provider value={{ userData, setUserDate, appSettings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useReactContext(AppContext);
};
