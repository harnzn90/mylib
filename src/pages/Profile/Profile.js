import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Profile.stlye';
import {launchImageLibrary} from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ParseContent from '../../utils/ParseContent';
import FavCard from '../../components/FavCard/FavCard';


const Profile = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [username, setUsername] = useState([]);
  const [userAge, setUserage] = useState([]);
  const [name, setName] = useState('');
  

  database()
    .ref('users/' + newCurrent + '/userInfo/userName')
    .once('value')
    .then(snapshot => {
     
    });

  useEffect(() => {
    const currentUser = auth().currentUser.email.split('@', 1).toString();
    const newCurrent = currentUser.split('.', 2).toString();
    database()
      .ref('users/' + newCurrent + '/Favourites')
      .on('value', snapshot => {
        const newContentData = snapshot.val();
        const ParsedData = ParseContent(newContentData);
        setFavourites(ParsedData);
      });
  }, []);

  useEffect(() => {
    const currentUser = auth().currentUser.email.split('@', 1).toString();
    const newCurrent = currentUser.split('.', 2).toString();
    database()
      .ref('users/' + newCurrent + '/userInfo')
      .on('value', snapshot => {
        setUserData(snapshot.val());
      });
  }, []);

  const handleSignOut = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await auth().signOut();
        navigation.navigate('LoginScreen');
      } else {
        await GoogleSignin.signOut();
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.log(error);
    }
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
    database()
      .ref('users/' + newCurrent + '/userInfo/userAge')
      .set(userAge);
    navigation.navigate('Main');
  };


  const renderItem = ({item}) => (
    <FavCard book={item} handleDetail={handleDetail} removeItem={removeItem} />
  );
  const [loading, setLoading] = useState(true);
  const [favouritesList, setFavouritesList] = useState([]);
  const currentUser = auth().currentUser.email.split('@', 1).toString();
  const newCurrent = currentUser.replace('.', '');
  useEffect(() => {
    async function fetchdata() {
      await database()
        .ref('users/' + newCurrent + '/Favourites')
        .on('value', snapshot => {
          const newContentData = snapshot.val();
          const ParsedData = ParseContent(newContentData);
          setFavouritesList(ParsedData);
          setLoading(false);
        });
    }
    fetchdata();
  }, []);

  const handleDetail = book => {
    navigation.navigate('BookDetails', {book});
  };
  const removeItem = book => {
    const filtered = favouritesList.filter(x => x != book);
    setFavouritesList(filtered);
    database()
      .ref('users/' + newCurrent + '/Favourites/' + book.id)
      .remove();
    showMessage({
      message: 'Book removed from favorites',
      type: 'danger',
    });
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={{alignItems: 'center',flexDirection:"row",justifyContent:"space-between",margin:10,}}>
        <Image
          source={{uri: userData.coverimage}}
          style={{width: 100, height: 100, borderRadius: 50, borderWidth: 1,margin:10}}
        />
          <Text style={{fontSize: 40, fontWeight: 'bold', color: 'black'}}>
            {userData.userName}, {userData.userAge}
          </Text>
          <Icon name={"pencil"} size={40} color={"white"} onPress={() => navigation.navigate('ProfileEdit')}/>
        </View>
         
        <View style={{alignItems: 'center'}}></View>
      </View>
      <View style={{flex: 1, backgroundColor: 'cadetblue'}}>
      <Text
        style={{
          color: 'aliceblue',
          alignSelf: 'center',
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 20,
          marginTop: 20,
        }}>
        Favourite Books
      </Text>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <FlatList data={favouritesList} renderItem={renderItem} />
      )}
    </View>
      
    </View>
  );
};

export default Profile;
