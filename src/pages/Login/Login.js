import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Input from '../../components/Input/';
import auth from '@react-native-firebase/auth';
import styles from './Login.style';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Btn from '../../components/Btn/Btn';
import {showMessage} from "react-native-flash-message"
import database from "@react-native-firebase/database"

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const currentUser = auth().currentUser.email.split('@', 1).toString();
  const newCurrent = currentUser.split('.', 2).toString();

   const handleUsername = () => {
    const currentUser = auth().currentUser.email.split('@', 1).toString();
    const newCurrent = currentUser.split('.', 2).toString();
    database()
      .ref('users/' + newCurrent + '/userInfo/userName')
    }

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      {database()
        .ref('users/' + newCurrent + '/userInfo/userName') != undefined ? (
          navigation.navigate("Main")
          ) : (
            navigation.navigate("ProfileEdit")
      )}
      showMessage({
        message:'You have successfully Login',
        type:'success'
    })
    } catch (error) {
      showMessage({
        message:"Hata",
        type:"danger"
    })
      console.log(error);
    }
  };


 



  const handleSignUp=()=>{
    navigation.navigate("Signup")
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={{fontSize: 100, textAlign: 'center', color:"white"}}>MyLib</Text>
        <Icon name={"book-open-variant"} size={200} color={"white"} />
      </View>
      <View style={styles.input_container}>
        <Input
          placeholder="e-mail "
          width={400}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder="Password "
          width={400}
          onChangeText={text => setPassword(text)}
          isSecure={true}
        />
      </View>
      <View style={styles.btn_container}>
        <Btn title={"Login"} onPress={handleSignIn}/>
        <Btn title={"Sign Up"} onPress={handleSignUp}/>
      </View>
    </View>
  );
};

export default Login;
