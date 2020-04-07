import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = { name: 'ci.werarewe.com', key: '123', showlogonmessage: "" }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleKeyChange = this.handleKeyChange.bind(this);
      this.handleButtonPress = this.handleButtonPress.bind(this);
    }

    handleNameChange(name) {
      this.setState({ name:name });
    }

    handleKeyChange = (text) => {
      this.setState({key: text});
    }


    handleButtonPress() {
        this.setState({showlogonmessage: `
            Server: ${this.state.name}
            Key: ${this.state.key}`})
    }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Settings</Text>
          <Text style={styles.explainer}>Please enter the URI of your Drone server, and the Key</Text>
          <Text style={styles.explainer}>You can get the key from...</Text>
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
          key = 'key'
          onBlur={Keyboard.dismiss}
          onChangeText={this.handleKeyChange}
        />
        <TouchableOpacity onPress={this.handleButtonPress}>
            <Text
                style={styles.mybutton}
            >Connect</Text>
        </TouchableOpacity>

        <Text>{this.state.showlogonmessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  mybutton: {
      backgroundColor: 'blue',
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 12,
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
          overflow: 'hidden',
          padding: 12,
          textAlign:'center',
  },
  textInput: {
      height: 50,
      fontSize: 25,
      textAlign: 'center',
      paddingLeft: 20,
      paddingRight: 20
  },
});
