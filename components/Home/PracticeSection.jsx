import React, { Component } from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import { PracticeOption } from '../../constant/Option'; // Corrected typo in variable name
import Color from '../../constant/Color';

export class PracticeSection extends Component {
  render() {
    return (
      <View>
        <Text style={styles.heading}>Practice</Text>
        <FlatList
          data={PracticeOption} // Corrected variable name
          horizontal // Optional: Makes the list horizontal
          showsHorizontalScrollIndicator={false} 
          numColumns={3}// Optional: Hides scrollbar
          renderItem={({ item, index }) => ( // Corrected destructuring
            <View key={index} style={styles.itemContainer}>
              <Image source={item?.Image} style={styles.image} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()} // Added keyExtractor
        />
        <Text style={{
            position: 'absolute',
            padding:15,
            fontFamily:'outfit' ,
            fontSize:15,
            color : Color.WHITE
        }}> {item.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    marginBottom: 10, // Added margin for spacing
  },
  itemContainer: {
    marginRight: 10,
    flex :1,
    margin :5, 
    aspectRatio:1// Added margin between items
  },
  image: {
    width: 160, // Adjusted width
    height: 160, // Adjusted height
    borderRadius: 15, // Added border radius
  },
});

export default PracticeSection;