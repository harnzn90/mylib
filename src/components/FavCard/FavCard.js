import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import styles from './FavCard.style';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const FavouriteCard = ({book, handleDetail, removeItem}) => {
  const {width: SCREEN_WIDTH} = Dimensions.get('window');

  return (
    <TouchableOpacity onPress={() => handleDetail(book)}>
      <View  style={styles.container}>
        {book.volumeInfo.imageLinks != undefined ? (
          <Image
            source={{uri: book.volumeInfo.imageLinks.thumbnail}}
            style={styles.image}
          />
        ) : (
          <Icon name={'book-open-variant'} color={'black'} size={60} />
        )}
        <View style={styles.inner_container}>
          <Text numberOfLines={1} style={styles.header_text}>
            {book.volumeInfo.title}
          </Text>
          <Text numberOfLines={1} style={styles.header_text}>
            {book.volumeInfo.authors[0]}
          </Text>
        </View>
        <View style={innerstyles.icon_container} >
                <Icon onPress={() => removeItem(book)}  name='trash-can' size={40} color='red' />
            </View>
      </View>
    </TouchableOpacity>
  );
};

const innerstyles = StyleSheet.create({
  icon_container: {
    height: 60,
    width: 70,
    position: 'absolute',
    right: 10,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavouriteCard;
