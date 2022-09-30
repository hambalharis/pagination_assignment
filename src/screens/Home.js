import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Keyboard,
  Image,
} from 'react-native';
import {getData} from '../services/WebServices';
import Item from '../components/Item';

let PageSize = 10;
const Home = () => {
  const [initialData, setInitialData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newData, setNewData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigation = useNavigation();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getJson();
  }, []);

  const getJson = () => {
    getData()
      .then(res => res.json())
      .then(result => {
        // console.log('\n\n\n JSON DATA ==>>' + JSON.stringify(result));
        setData(result);
        fetchMoreData(result);
        setInitialData(result);
        // setFilterData(result);
        // setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };
  const fetchMoreData = val => {
    let newArray = [];
    newArray.push(...val);
    setLoading(true);
    // newData.length > 10 && removeDuplicate();
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    // const currentData = val.slice(firstPageIndex, lastPageIndex);
    setNewData(newData.concat(val.splice(firstPageIndex, lastPageIndex)));
    setFilterData(
      filterData.concat(newArray.splice(firstPageIndex, lastPageIndex)),
    );
    console.log(
      '\n\n\n NEW JSON DATA ==>>' + JSON.stringify(newData.slice(0, 4)),
    );
    console.log(
      '\n\n\n FILTER JSON DATA ==>>' + JSON.stringify(filterData.slice(0, 4)),
    );
    setLoading(false);
  };

  // const currentData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return data.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage, data]);

  const removeDuplicate = () => {
    //Remove duplicate from Arraylist
    const newArrayList = [];
    newData.forEach(obj => {
      if (!newArrayList.some(o => o.id === obj.id)) {
        newArrayList.push({...obj});
      }
    });
    setNewData(newArrayList);
  };

  const renderItem = ({item}) => {
    const backgroundColor = '#fff';
    const color = 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        navigation={navigation}
      />
    );
  };

  const searchReport = str => {
    console.log('\n\n\n ==>> search input', str);
    if (str !== '') {
      // setCurrentPage(1);
      const newD = filterData.concat(initialData).filter(item => {
        //console.log(item.first_name.toUpperCase(), "item")
        const itemData = `${item.first_name.toUpperCase()}   
        ${item.last_name.toUpperCase()}`;
        const textData = str.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log('\n\n\n FILTER DATA ==>>', JSON.stringify(newD));
      setNewData(newD);
    } else {
      setNewData(filterData);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>DashBoard</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search Name"
          style={styles.textInput}
          onChangeText={str => {
            searchReport(str);
            setSearchValue(str);
          }}
          value={searchValue}
        />
        {searchValue !== '' && (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              Promise.resolve()
                .then(() => setSearchValue(''))
                .then(() => setNewData(filterData));
            }}>
            <Image
              source={require('../assets/close.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={newData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          {
            searchValue === '' &&
              Promise.resolve()
                .then(() => setCurrentPage(currentPage + 1))
                .then(() => fetchMoreData(data));
          }
          // setCurrentPage(currentPage + 1);
          // setTimeout(() => {
          //   fetchMoreData(data);
          // }, 500);
        }}
        // ListFooterComponent={() =>
        //   loading && (
        //     <View
        //       style={{
        //         height: 30,
        //         // alignSelf: 'flex-end',
        //         // alignItems: 'center',
        //         // justifyContent: 'flex-end',
        //       }}>
        //       <ActivityIndicator size={40} />
        //     </View>
        //   )
        // }
      />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={40} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    padding: 18,
    elevation: 7,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    color: '#030303',
    marginRight: 'auto',
    marginLeft: 8,
    padding: 4,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
  closeIcon: {
    width: 15,
    height: 15,
    marginHorizontal: 15,
    tintColor: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 9,
  },
  textInput: {
    width: '80%',
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
    color: '#8E8E93',
    // paddingRight: 15,
    backgroundColor: '#fff',
  },
});

export default Home;
