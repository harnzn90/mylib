import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './UserFavorites.style';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
const UserFavorites = ({book}) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const currentUser = auth().currentUser.email.split('@', 1).toString();
  const newCurrent = currentUser.replace('.', '');
  const handleFavourite = () => {
    if (isFavourite == false) {
      database()
        .ref('users/' + newCurrent + '/Favourites/' + book.id)
        .set(book);
      setIsFavourite(!isFavourite);
      showMessage({
        message: 'You have successfully added to favorites',
        type: 'success',
      });
    } else {
      database()
        .ref('users/' + newCurrent + '/Favourites/' + book.id)
        .remove();
      setIsFavourite(!isFavourite);
      showMessage({
        message: 'Book removed from favorites',
        type: 'danger',
      });
    }
  };

  return (
    <View onPress={() => handleDetail(book)} style={styles.container}>
      {book.volumeInfo.imageLinks != undefined ? (
        <Image
          source={{uri: book.volumeInfo.imageLinks.thumbnail}}
          style={styles.image}
        />
      ) : (
        <Image
          source={{
            uri: 'https://www.kannemeinel.com/uploads/3/4/3/9/34391167/5133754_orig.jpg',
          }}
          style={styles.image}
        />
      )}
      <View style={styles.inner_container}>
        <Text numberOfLines={1} style={styles.header_text}>
          {book.volumeInfo.title}
        </Text>
        <Text numberOfLines={1} style={styles.header_text}>
          {book.volumeInfo.authors[0]}
        </Text>
      </View>
      <FontAwesome
        name="heart"
        size={24}
        color="black"
        style={{marginLeft: 30}}
        onPress={handleFavourite}
        solid={isFavourite}
      />
    </View>
  );
};

export default UserFavorites;
