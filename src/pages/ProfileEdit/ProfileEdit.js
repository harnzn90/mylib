import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './ProfileEdit.stlye';
import {launchImageLibrary} from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ParseContent from '../../utils/ParseContent';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [username, setUsername] = useState([]);
  const [userAge, setUserage] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const currentUser = auth().currentUser.email.split('@', 1).toString();
    const newCurrent = currentUser.split('.', 2).toString();
    database()
      .ref('users/' + newCurrent + '/userInfo')
      .on('value', snapshot => {
        setUserData(snapshot.val());
      });
  }, []);

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
    database()
      .ref('users/' + newCurrent + '/userInfo/userAge')
      .set(userAge);
    navigation.navigate('Main');
  };
  const currentUser = auth().currentUser.email.split('@', 1).toString();
  const newCurrent = currentUser.split('.', 2).toString();
  return (
    <View style={styles.container}>

      <View style={{alignItems: 'center',margin:20,}}>
      <View style={{alignItems: 'center',margin:20,flexDirection:"row"}}>
      <Icon name={'account'} size={200} />

        <TouchableOpacity
          onPress={ChangePhoto}
          style={{
            borderRadius: 20,
            padding: 10,
            backgroundColor: 'azure',
            margin: 20,
          }}>
          <Text style={{fontSize: 30}}>Upload Picture</Text>
        </TouchableOpacity>
            </View>
        <View>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Username:{' '}
            </Text>
            <TextInput
              placeholder={'Enter Your Username'}
              onChangeText={text => setUsername(text)}
              style={{
                fontSize: 20,
                color:"white",
                borderRadius: 20,

                margin: 5,
                textAlign: 'center',
              }}
            />
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Age :
            </Text>
            <TextInput
              placeholder={'Enter Your Age'}
              onChangeText={text => setUserage(text)}
              style={{
                fontSize: 20,
                color:"white",
                borderRadius: 20,

                margin: 5,
                textAlign: 'center',
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleUsername}
          style={{
            borderRadius: 20,
            padding: 10,
            backgroundColor: 'azure',
            margin: 20,
          }}>
          <Text style={{fontSize: 30}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
