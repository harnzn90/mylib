import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import styles from './ModalComponent.style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import database from '@react-native-firebase/database';

const ModalComponent = ({
  isVisible,
  closeModal,
  addPhoto,
  onChangeText,
  sendPost,
  image,
}) => {
  return (
    <Modal
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.post_container}>
          <FontAwesome5 name="times" color={'black'} size={24} />
          <TouchableOpacity onPress={sendPost} style={styles.send_button}>
            <Text style={styles.send_button_text}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line_container}></View>
        <TextInput
          autoCorrect={false}
          placeholder="What's going on?"
          onChangeText={onChangeText}
        />
        <Image
          style={image ? styles.post_image : null}
          source={{uri: image}}
          resizeMode="contain"
        />
        <View style={styles.image_picker_container}>
          <FontAwesome5
            onPress={addPhoto}
            name="image"
            size={24}
            color="black"
          />
          <MaterialCommunityIcons name="file-gif-box" size={30} color="black" />
          <Entypo name="location-pin" size={24} color="black" />
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
