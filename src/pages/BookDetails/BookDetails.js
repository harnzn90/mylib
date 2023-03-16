import React,{useEffect,useState,useRef} from "react";
import {View,Text,Image, StatusBar, ScrollView, TouchableOpacity} from 'react-native'
import styles from './BookDetails.style'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import {showMessage} from 'react-native-flash-message'

const BookDetail = ({route,navigation}) => {
    const [isFavourite,setIsFavourite] = useState(false)
    const scrollViewRef = useRef();
    const [numberLines,setNumberLines] = useState(5)
    const {book} = route.params;
    
    const currentUser = auth().currentUser.email.split('@',1).toString();
    const handleFavourite = () => {
       if (isFavourite==false) {
        database().ref('users/'+currentUser+'/Favourites/'+book.id).set(book)
        setIsFavourite(!isFavourite)
        showMessage({
            message:'You have successfully added to favorites',
            type:'info'
        })
       } else {
        database().ref('users/'+currentUser+'/Favourites/'+book.id).remove()
        setIsFavourite(!isFavourite)
        showMessage({
            message:'Book removed from favorites',
            type:'danger'
        })
       }
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon_container}>
            <IonIcons name="arrow-back" color={'black'} size={30} />
            </TouchableOpacity>
            <StatusBar backgroundColor={'white'} />
            <View style={styles.image_container} >
            
            {book.volumeInfo.imageLinks != undefined ?<Image 
            resizeMode='contain'
            source={{uri:book.volumeInfo.imageLinks.thumbnail}} 
            style={styles.image} />:
            <Icon name={'book-open-variant'} color={'black'} size={120} />
            }
            </View>
            <ScrollView ref={scrollViewRef}
             onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
            <View style={styles.info_container} >
                <Text style={[styles.info_text,{color:'tomato'}]} >{book.volumeInfo.authors[0] ?  book.volumeInfo.authors[0] : null} {book.volumeInfo.authors[1] ?  book.volumeInfo.authors[1] : null}</Text>
                <Text style={[styles.info_text,{color:'black'}]} >{book.volumeInfo.title}</Text>
            </View>
            <View style={styles.favourite_container} >
                <TouchableOpacity style={styles.favourite_inner_container} >
                    <Text style={styles.share_text} >Share</Text>
                    <Entypo name="share" size={24} color='black' />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavourite} style={styles.favourite_inner_container} >
                    <Text style={styles.share_text} >Add Favourites</Text>
                    <FontAwesome name="heart" size={24} color='black' solid={isFavourite}  />
                </TouchableOpacity>
            </View>
            <View style={styles.book_description_container} >
                <Text style={{color:'black',fontSize:16}} >Description</Text>
                <View style={{height:1,width:'100%',backgroundColor:'black'}} ></View>
                <Text numberOfLines={numberLines} >{book.volumeInfo.description}</Text>
            </View>
            <TouchableOpacity onPress={() =>  numberLines==5? setNumberLines(40):setNumberLines(5)} style={{alignSelf:'center'}}>
                <Text style={styles.show_more_text} >{ numberLines==5 ? 'Show More' : 'Show Less'}</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default BookDetail