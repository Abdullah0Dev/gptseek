import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useAuthContext} from '../../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const {login} = useAuthContext();
  return (
    <SafeAreaView>
      <TouchableOpacity
        className="p-3 bg-blue-300 flex items-center rounded-full mx-9 my-9"
        onPress={login}>
        <Text className="text-white font-Roboto-Bold">LoginScreen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
