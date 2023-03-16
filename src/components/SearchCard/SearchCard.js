import React from "react";
import {View,Text, Image, TouchableOpacity} from 'react-native'
import styles from './SearchCard.style'
const SearchedBookCard = ({book,onPress}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={() =>onPress(book)} >
            {book.volumeInfo.imageLinks != undefined ?<Image 
            resizeMode='stretch'
            source={{uri:book.volumeInfo.imageLinks.thumbnail}} 
            style={styles.image} />:
            <Image source={{uri:'https://www.kannemeinel.com/uploads/3/4/3/9/34391167/5133754_orig.jpg'}} 
            style={styles.image} />
            }
            <Text numberOfLines={2} style={styles.book_text} >{book.volumeInfo.title}</Text>
        </TouchableOpacity>
    )
}
export default SearchedBookCard