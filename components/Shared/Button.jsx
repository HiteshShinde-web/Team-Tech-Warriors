import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constant/Color'; // Import Colors (assuming you have a Colors file)

export class Button extends Component {
  render() {
    const { onPress, type, text } = this.props; // Destructure props
    const loading = false;  // Add the loading variable directly as false (as per your logic)

    return (
      <TouchableOpacity
        onPress={onPress} // Pass onPress handler
        style={[
          styles.button,
          {
            backgroundColor: type === 'fill' ? Colors.Primary : Colors.white, // Dynamic background color
          },
        ]}
        disabled={loading}
      >
        {!loading ? (
          <Text
            style={[
              styles.text,
              {
                color: type === 'fill' ? Colors.white : Colors.Primary, // Dynamic text color
              },
            ]}
          >
            {text}
          </Text>
        ) : (
          <ActivityIndicator size={'small'} color={type === 'fill' ? Colors.white : Colors.Primary} />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    width: '100%', // Use string value for percentage
    borderRadius: 15, // Corrected property name
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  text: {
    textAlign: 'center', // Center text
    fontSize: 18,
  },
});

export default Button;
