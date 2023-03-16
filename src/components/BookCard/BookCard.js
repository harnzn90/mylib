import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './Bookcard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BookCard = ({book, onPress}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(book)}
      style={styles.container}>

      {book.volumeInfo.imageLinks != undefined ? (
        <Image
          source={{uri: book.volumeInfo.imageLinks.thumbnail}}
          style={styles.image}
        />
      ) : (
        <Icon name={'book-open-variant'} color={'black'} size={120} />
      )}
      <Text numberOfLines={2} style={styles.book_text}>
        {book.volumeInfo.title}
      </Text>
    </TouchableOpacity>
  );
};

export default BookCard;
