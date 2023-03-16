import {View, TextInput} from 'react-native';
import React from 'react';
import styles from './Input.style';

const Input = ({placeholder, onChangeText, width,isSecure}) => {
  return (
    <View
      style={{
        backgroundColor: 'azure',
        borderRadius: 20,
        borderWidth: 1,
        width: width,
        margin:10,
      }}>
      <TextInput secureTextEntry={isSecure} placeholder={placeholder} onChangeText={onChangeText} style={{fontSize:20,margin:5,}} />
    </View>
  );
};

export default Input;
