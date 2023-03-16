import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import FavCard from '../../components/FavCard/FavCard';
import ParseContent from '../../utils/ParseContent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';

const Favourites = ({navigation}) => {
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

  const renderItem = ({item}) => (
    <FavCard book={item} handleDetail={handleDetail} removeItem={removeItem} />
  );
  return (
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
  );
};

export default Favourites;
