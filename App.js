import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Linking } from 'react-native';

export default class SettingsScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          name: '',
          key: '',
          showlogonmessage: false,
          userJson: '',
      }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleKeyChange = this.handleKeyChange.bind(this);
      this.handleConnectButtonPress = this.handleConnectButtonPress.bind(this);
    }

    handleNameChange(name) {
      this.setState({ name:name });
    }

    handleKeyChange = (text) => {
      this.setState({key: text});
    }

    handleConnectButtonPress() {
        this.setState({showlogonmessage: true})
        this.setState({userJson: "SOME"})
    }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Log In</Text>
        </View>
        <TextInput
          style={styles.textInput}
          name = 'name'
          placeholder="Server"
          onBlur={Keyboard.dismiss}
          onChangeText={this.handleNameChange}
        />
        <Text style={styles.explainer}>The server is the URI of your drone server</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Personal Token"
          name = 'key'
          key = 'key'
          onBlur={Keyboard.dismiss}
          onChangeText={this.handleKeyChange}
        />
        <Text style={styles.explainer}>Your personal token is found on the User Settings menu of your drone web console.</Text>

        <TouchableOpacity onPress={this.handleConnectButtonPress}>
            <Text
                style={styles.mybutton}
            >Connect</Text>
        </TouchableOpacity>

        {this.state.showlogonmessage &&
            <View>
            <Text>
                Server: {this.state.name}
            </Text>
            <Text>
                Key: {this.state.key}
            </Text>
            <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL("https://"+this.state.name+"/api/user")}>
                Click me
            </Text>
            <Text>{this.state.userJson}</Text>
            </View>
        }
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
