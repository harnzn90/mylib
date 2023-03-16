import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './Post.style';
import {
  format,
  formatDistance,
  formatRelative,
  parseISO,
  subDays,
} from 'date-fns';
import LikeComponent from '../LikeComponent/LikeComponent';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Post = ({post, handleProfile, handleLike}) => {
  const formatteddate = formatDistance(parseISO(post.date), new Date(), {
    addSuffix: true,
  });

  console.log(post.userdata.userName)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleProfile(post)}
        style={styles.image_container}>
        <Image source={{uri: post.userdata[0].coverimage}} style={styles.userimage} />
        <View>
          <Text style={styles.user_text}>{post.userdata[0].userName}</Text>
          <View style={styles.date_container}>
            <Text style={styles.datetext}>{formatteddate}</Text>
            <IonIcons name="earth" color={'gray'} size={16} />
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.post_text}>{post.text}</Text>
      <Image
        source={{uri: post.image}}
        style={styles.post_image}
        resizeMode="contain"
      />
      {post.like > 0 ? (
        <View style={styles.stat_count_container}>
          <View style={styles.like_count_container}>
            <Fontisto name="like" color={'blue'} size={18} />
            <Text style={styles.like_count_text}>{post.like}</Text>
          </View>
          <View style={styles.like_count_container}>
            <Fontisto name="comment" color={'gray'} size={18} />
            <Text style={styles.like_count_text}>0 Comment</Text>
          </View>
        </View>
      ) : null}
      <View style={styles.line_container}></View>
      <View style={styles.like_container}>
        <LikeComponent
          iconName="like"
          text="Like"
          onPress={() => handleLike(post)}
        />
        <LikeComponent iconName="comment" text="Comment" />
        <LikeComponent iconName="share-google" text="Share" />
      </View>
    </View>
  );
};

export default Post;
