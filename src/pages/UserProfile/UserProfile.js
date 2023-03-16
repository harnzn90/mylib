import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ImageBackground, Image, TouchableOpacity, FlatList } from 'react-native'
import styles from './UserProfile.style'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ParseContent from "../../utils/ParseContent";
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import UserFavorites from "../../components/UserFavorites/UserFavorites";
import IonIcons from 'react-native-vector-icons/Ionicons'
const UserProfile = ({ route,navigation }) => {
    const { post } = route.params;
    const [favorites, setFavorites] = useState([])
    useEffect(() => {

        database().ref('users/' + post.userName + '/Favourites').on('value', snapshot => {
            const contentData = snapshot.val();
            const newContent = ParseContent(contentData);
            setFavorites(newContent)
            console.log(post.userName)
            console.log(favorites)

        })
    }, [])
    const renderItem = ({ item }) => <UserFavorites book={item} />
    return (
        <View style={styles.container} >
            <StatusBar backgroundColor='tomato' />
            <ImageBackground
                source={{ uri: post.userdata[0].coverimage }}
                style={styles.header_container} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon_container}>
                    <IonIcons name="arrow-back" color={'black'} size={24} />
                </TouchableOpacity>
            </ImageBackground>
            <Image source={{ uri: post.userdata[0].coverimage && post.userdata[0].coverimage }}
                style={styles.image} />
            <Text style={styles.name_text} >{post.userdata[0].userName}</Text>
            <View style={styles.line_container} ></View>
            <Text style={styles.favourites_text} >Favourite Books</Text>
            <FlatList
                data={favorites}
                renderItem={renderItem}
            />
        </View>
    )
}

export default UserProfile