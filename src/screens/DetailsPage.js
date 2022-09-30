import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetailsPage = props => {
  const {firstName, lastName, companyName, city, state, zip, email, web, age} =
    props.route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{height: 35, width: 35}}>
          <Image
            source={require('../assets/back_icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.text1}>Details Page</Text>
      </View>
      <View style={[styles.item]}>
        <View style={styles.rowView}>
          <Text style={[styles.title]}>First Name:</Text>
          <Text style={[styles.title]}>{firstName}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.title]}>Last Name:</Text>
          <Text style={[styles.title]}>{lastName}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.title]}>Company Name:</Text>
          <Text style={[styles.title]}>{companyName}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.title]}>City:</Text>
          <Text style={[styles.title]}>{city}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.title]}>State:</Text>
          <Text style={[styles.title]}>{state}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.title]}>Zip:</Text>
          <Text style={[styles.title]}>{zip}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.title]}>Email:</Text>
          <Text style={[styles.title]}>{email}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.title]}>Age:</Text>
          <Text style={[styles.title]}>{age}</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.title]}>Web:</Text>
          <TouchableWithoutFeedback onPress={() => Linking.openURL(web)}>
            <Text
              style={[
                styles.title,
                {textDecorationLine: 'underline', color: 'blue'},
              ]}>
              {web}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 25,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    fontSize: 13,
    color: '#000',
  },
  heading: {
    flexDirection: 'row',
    padding: 18,
    alignSelf: 'center',
    elevation: 7,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    marginTop: 20,
    marginHorizontal: 10,
    elevation: 7,
    borderRadius: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 15,
    color: '#000',
  },
  image: {
    height: 25,
    width: 30,
    resizeMode: 'stretch',
    tintColor: '#000',
    marginTop: 8,
    marginLeft: 15,
  },
  text1: {
    width: '90%',
    textAlign: 'center',
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 20,
  },
});

export default DetailsPage;
