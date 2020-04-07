import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default class SettingsScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = { name: '1234', key: '567' }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleButtonPress = this.handleButtonPress.bind(this);
    }

    handleNameChange(name) {
      this.setState({ name });
    }

    handleButtonPress() {
        alert(this.state.name)
    }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Settings</Text>
          <Text style={styles.explainer}>Details</Text>
        </View>
        <TextInput
          style={styles.textInput}
          name = 'name'
          placeholder="Server"
          onBlur={Keyboard.dismiss}
          onChangeText={this.handleNameChange}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Key"
          name = 'key'
          onBlur={Keyboard.dismiss}
          onChangeText={this.handleNameChange}
        />
        <Button
        onPress={this.handleButtonPress}
        title = "Are we there yet?"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  explainer: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontWeight: ''
  },
  textInput: {
      borderColor: '#CCCCCC',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      height: 50,
      fontSize: 25,
      textAlign: 'center',
      paddingLeft: 20,
      paddingRight: 20
}
});
