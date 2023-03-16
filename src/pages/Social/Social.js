import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StatusBar, ActivityIndicator } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import database from '@react-native-firebase/database'
import styles from './Social.style'
import { launchImageLibrary } from 'react-native-image-picker'
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import ParseContent from '../../utils/ParseContent'
import auth from '@react-native-firebase/auth'
import Post from "../../components/Post/Post";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Social = ({ navigation }) => {
    const [userData, setUserData] = useState(null)
    const [postData, setPostData] = useState([])
    const [postText, setPostText] = useState()
    const [postImage, setPostImage] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const currentUser = auth().currentUser.email.split('@', 1).toString()
        const newCurrent = currentUser.split('.', 2).toString()
        async function fetchData() {
            await database().ref('users/' + newCurrent).once('value').then(snapshot => {
                const contentData = snapshot.val();
                const newContent = ParseContent(contentData);
                setUserData(newContent)
                
            })
            setLoading(false)
        }
        fetchData()
    }, [])


    useEffect(() => {
        database().ref('Shares').on('value', snapshot => {
            const contentData = snapshot.val();
            const newContent = ParseContent(contentData);
            setPostData(newContent)
        })
    }, [])

    const closeModal = () => {
        setIsModalVisible(!isModalVisible)
    }
    const addPhoto = () => {
        const options = {
            title: 'Titlee',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('user Cancelled')
            }
            else if (response.errorCode) {
                console.log(errorCode0)
            } else {

                const path = response.assets[0].uri
                setPostImage(path)
            }
        })
    }

    const sendPost = () => {
        const currentUser = auth().currentUser.email.split('@', 1).toString()
        const newCurrent = currentUser.split('.', 2).toString()
        const post = {
            text: postText,
            image: postImage,
            userName: newCurrent,
            date: new Date().toISOString(),
            userimage: userData[0].image,
            userdata: userData,
            like: 0
        }
        database().ref('Shares/' + Math.floor(Math.random() * 1000)).set(post)
        setIsModalVisible(false)
        setPostImage('')
        setPostText('')
    }
    const handleProfile = (post) => {
        console.log(post)
        navigation.navigate('UserProfile', { post })
    }
    const handleLike = (post) => {
        console.log(post.id)
        database().ref('Shares/' + post.id + '/like').set(post.like + 1)
    }

    const renderItem = ({ item }) => <Post post={item} handleProfile={handleProfile} handleLike={handleLike} />

    return (
        <View style={styles.container} >
            <StatusBar backgroundColor='tomato' />
            <ModalComponent
                image={postImage}
                sendPost={sendPost}
                onChangeText={(text) => setPostText(text)}
                addPhoto={addPhoto}
                closeModal={closeModal} isVisible={isModalVisible} />
            {loading ? <ActivityIndicator /> :
                <>

                    <View style={styles.header_container} >
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Icon name="book-open-variant" size={45} color={'white'} />
                            <Text style={styles.header_text} >MyLib</Text>
                        </TouchableOpacity>
                        {loading ? null :
                            <TouchableOpacity style={styles.image_button} onPress={() => navigation.navigate('Profile')} >
                                <Image source={{ uri: userData[0].image }} style={styles.user_image} />
                            </TouchableOpacity>}
                    </View>
                    <FlatList
                        data={postData}
                        renderItem={renderItem}
                    />
                    <TouchableOpacity
                        onPress={closeModal}
                        style={styles.add_button} >
                        <Octicons name="plus" color={'white'} size={24} />
                    </TouchableOpacity>
                </>}
        </View>

    )
}

export default Social
