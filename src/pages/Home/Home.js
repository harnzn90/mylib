import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './Home.style';
import BookCard from '../../components/BookCard';
import Btn from '../../components/Btn/Btn';
import Auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchCard from '../../components/SearchCard/SearchCard';

const Psychology =
  'https://www.googleapis.com/books/v1/volumes?q=subject:psychology&maxResults=20&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk';
const Political =
  'https://www.googleapis.com/books/v1/volumes?q=subject:political&maxResults=20&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk';
const Philosophy =
  'https://www.googleapis.com/books/v1/volumes?q=subject:philosophy&maxResults=20&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk';
const History =
  'https://www.googleapis.com/books/v1/volumes?q=subject:history&maxResults=20&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [politicalData, setPoliticalData] = useState([]);
  const [philosophyData, setPhilosophyData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [psychologyData, setPsychologyData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [search, setSearch] = useState('');
  const result = `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&key=AIzaSyCwKBtsbYyjTxHZkxgAI5tgFRLOrvd2WLk`;

  const goBookDetail = book => {
    navigation.navigate('BookDetails', {book});
  };

  useEffect(() => {
    async function fetchdata() {
      await axios.get(Political).then(response => {
        setPoliticalData(response.data);
      });
      await axios.get(Philosophy).then(response => {
        setPhilosophyData(response.data);
      });
      await axios.get(History).then(response => {
        setHistoryData(response.data);
      });
      setLoading(false);
      axios.get(Psychology).then(response => {
        setPsychologyData(response.data);
      });
    }
    fetchdata();
  }, []);

  const renderItem = ({item}) => (
    <BookCard book={item} onPress={goBookDetail} />
  );

  const handleSignout = () => {
    Auth().signOut();
    showMessage({
      message: 'Sign Out',
      type: 'info',
    });
    navigation.navigate('Login');
  };

  const handleSearch = async text => {
    try {
      await setSearch(text);
      axios.get(result).then(response => {
        setResultData(response.data);
      });

      const filtered = resultData.filter(book => {
        const current = book.items.volumeInfo.title;
        return current.indexOf(text) > -1;
      });
      text ? setResultData(filtered) : setResultData([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor:"cadetblue"}}>
      <View
        style={{
          backgroundColor: 'purple',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styles.input_container}>
          <Icon name="magnify" color="black" size={30} />
          <TextInput
            style={{width: 400}}
            value={search}
            autoCapitalize="none"
            placeholder="search for books..."
            onChangeText={handleSearch}
          />
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <Icon
            name={'logout'}
            onPress={handleSignout}
            size={50}
            color={'white'}
          />
        </View>
      </View>

      <ScrollView style={{}}>
        {loading ? (
          <ActivityIndicator size={'large'} />
        ) : !search ? (
          <>
            <Text style={styles.karlmarx_text}>Political</Text>
            <View style={styles.flatlist_container}>
              <FlatList
                horizontal
                data={politicalData.items}
                renderItem={renderItem}
              />
            </View>
            <Text style={styles.karlmarx_text}>Philosophy</Text>
            <View style={styles.flatlist_container}>
              <FlatList
                horizontal
                data={philosophyData.items}
                renderItem={renderItem}
              />
            </View>
            <Text style={styles.karlmarx_text}>History</Text>
            <View style={styles.flatlist_container}>
              <FlatList
                horizontal
                data={historyData.items}
                renderItem={renderItem}
              />
            </View>
            <Text style={styles.karlmarx_text}>Psychology</Text>
            <View style={styles.flatlist_container}>
              <FlatList
                horizontal
                data={psychologyData.items}
                renderItem={renderItem}
              />
            </View>
          </>
        ) : (
          <FlatList
            style={{marginTop: 20, marginBottom: 10}}
            numColumns={3}
            data={resultData.items}
            renderItem={({item}) => (
              <SearchCard book={item} onPress={goBookDetail} />
            )}
          />
        )}
        <View style={{height: 120}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
