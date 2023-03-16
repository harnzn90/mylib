import {View, Text, TouchableOpacity,TextInput} from 'react-native';
import React, {useState,useEffect} from 'react';
import Input from '../../components/Input/Input';
import styles from './Signup.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import Btn from '../../components/Btn/Btn';
import { launchImageLibrary } from 'react-native-image-picker';
import ParseContent from '../../utils/ParseContent';
import database from "@react-native-firebase/database"



const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [userData, setUserData] = useState([]);



  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      console.log(Response);
      navigation.navigate('ProfileEdit');
    } catch (error) {}
    
  };

  const initialFormvalues = {
    usermail: '',
    password: '',
    repassword: '',
  };

  const ChangePhoto = () => {
    const currentUser = auth().currentUser.email.split('@', 1).toString();
    const newCurrent = currentUser.split('.', 2).toString();
    const options = {
      title: 'Titlee',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('user Cancelled');
      } else if (response.errorCode) {
        console.log(errorCode0);
      } else {
        const path = response.assets[0].uri;
        database()
          .ref('users/' + newCurrent + '/userInfo/coverimage')
          .set(path);
      }
    });
  };

  const handleUsername = () => {
    const currentUser = auth().currentUser.email.split('@', 1).toString();
    const newCurrent = currentUser.split('.', 2).toString();
    database()
      .ref('users/' + newCurrent + '/userInfo/userName')
      .set(username);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Icon name={'rocket'} size={200} color={'black'} />
        <Text>Signup</Text>
      </View>
      <View style={styles.Input_container}>
        <Input
          placeholder={'E mail'}
          width={400}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder={'Password'}
          width={400}
          onChangeText={text => setPassword(text)}
          isSecure={true}
        />
        <Input
          placeholder={'Re-Password'}
          width={400}
          onChangeText={text => setRepassword(text)}
          isSecure={true}
        />
      </View>
   
    
      <View style={styles.btn_container}>
        <Btn title={"Sign Up"} onPress={handleSignUp}/>
       
      </View>
    </View>
  );
};

export default Signup;
