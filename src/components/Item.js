import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Linking,
} from 'react-native';

const Item = props => {
  const {item, backgroundColor, textColor} = props;
  const navigation = useNavigation();

  return (
    <View style={[styles.item, backgroundColor]}>
      <View style={styles.rowView}>
        <Text style={[styles.title, textColor]}>First Name:</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('DetailsPage', {
              firstName: item.first_name,
              lastName: item.last_name,
              companyName: item.company_name,
              city: item.city,
              state: item.state,
              zip: item.zip,
              email: item.email,
              web: item.web,
              age: item.age,
            });
          }}>
          <Text style={[styles.title, textColor, {fontWeight: 'bold'}]}>
            {item.first_name}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.rowView}>
        <Text style={[styles.title, textColor]}>Last Name:</Text>
        <Text style={[styles.title, textColor]}>{item.last_name}</Text>
      </View>
      <View style={styles.rowView}>
        <Text style={[styles.title, textColor]}>Age:</Text>
        <Text style={[styles.title, textColor]}>{item.age}</Text>
      </View>
      <View style={styles.rowView}>
        <Text style={[styles.title, textColor]}>Web:</Text>
        <TouchableWithoutFeedback onPress={() => Linking.openURL(item.web)}>
          <Text
            style={[
              styles.title,
              textColor,
              {textDecorationLine: 'underline', color: 'blue'},
            ]}>
            {item.web}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    elevation: 4,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontSize: 15,
  },
});
export default Item;
