import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Linking } from 'react-native';

export default class SettingsScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          name: '',
          key: '',
          showlogonmessage: true,
          userJSONStatusMessage: '',
          myJSON: [],
          buildsJSON: [],
          loggedIn: false,
          username: "",
      }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleKeyChange = this.handleKeyChange.bind(this);
      this.handleConnectButtonPress = this.handleConnectButtonPress.bind(this);
      this.handleDisconnectButtonPress = this.handleDisconnectButtonPress.bind(this);
      this.loadMyJSON = this.loadMyJSON.bind(this);
      this.loadBuildsJSON = this.loadBuildsJSON.bind(this);
      this.parseMyJSON = this.parseMyJSON.bind(this);
    }

    handleNameChange(name) {
        console.log("Name Change");
        this.setState({ name:name });
    }

    handleKeyChange = (text) => {
      this.setState({key: text});
    }

    handleConnectButtonPress() {
        console.log("Handling button press")
        this.setState({showlogonmessage: true})
        this.setState({userJSONStatusMessage: "Trying to connect"})
        this.loadMyJSON()
        this.loadBuildsJSON()
        var json = "Trying to connect..."
    }

    handleDisconnectButtonPress() {
        console.log("Handling button press")
        this.setState({loggedIn: false})
        this.setState({userJSONStatusMessage: "Logged out"})
    }


    loadMyJSON(){
        console.log("Getting JSON")
        var uri = "https://"+this.state.name+"/api/user"
        console.log("API: " + uri)
        fetch(uri, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.key
            }
        })
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           myJSON: responseJson
          })
          console.log("setting JSON:")
          console.log(JSON.stringify(responseJson))
          console.log(JSON.stringify(this.state.myJSON))
          this.parseMyJSON()
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    loadBuildsJSON(){
        console.log("Getting JSON")
        var uri = "https://"+this.state.name+"/api/user/builds"
        console.log("API: " + uri)
        fetch(uri, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.key
            }
        })
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           buildsJSON: responseJson
          })
          console.log("setting Builds JSON:")
          console.log(JSON.stringify(responseJson))
          console.log(JSON.stringify(this.state.buildsJSON))
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }



    parseMyJSON(){
        this.setState({username: "Marky"})
        console.log(this.state.myJSON)
        if (this.state.myJSON.hasOwnProperty('message')) {
            console.log("Oops")
            this.setState({username: this.state.myJSON.message})
        }
        if (this.state.myJSON.hasOwnProperty('login')) {
            console.log("Hurrah")
            this.setState({username: this.state.myJSON.login})
            this.setState({userJSONStatusMessage: ''})
            this.setState({loggedIn: true})
        }
    }

  render() {
    let Image_Http_URL ={ uri: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png'};
    return (
      <View style={styles.container}>
      {this.state.loggedIn &&
          <View style={styles.loginblock}>
          <Text style={styles.logintext}>Logged in as: {this.state.username}</Text>
          </View>
      }

      {!this.state.loggedIn &&
        <View>
          <Text style={styles.header}>Connect to your Drone server</Text>
        <TextInput
          style={styles.textInput}
          name = 'name'
          placeholder="<ci.yourdomain.com>"
          onBlur={Keyboard.dismiss}
          onChangeText={this.handleNameChange}
        />
        <TextInput
          style={styles.textInput}
          placeholder="<your personal Token>"
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
        </View>

        }
        {this.state.loggedIn &&
            <TouchableOpacity onPress={this.handleDisconnectButtonPress}>
                <Text
                    style={styles.mybutton}
                >Disconnect</Text>
            </TouchableOpacity>
        }

        {this.state.showlogonmessage &&
            <View>
            <Text>{this.state.userJSONStatusMessage}</Text>
            <Text>JSON:</Text>
            <Text>{JSON.stringify(this.state.myJSON)}</Text>
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
    paddingTop: 15,
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
      borderColor: '#AAAAAA',
      borderWidth: 1,
      borderRadius: 12,
      textAlign: 'center',
      paddingLeft: 20,
      paddingRight: 20
  },
  loginblock: {
      flexDirection: 'row',
      paddingRight: 10,
      marginLeft: 'auto',
      justifyContent: 'space-between',
  },
  logintext: {
      alignSelf: 'flex-end',
      textAlign: 'right',
      marginLeft: 'auto',
  },
  avatar: {
    width: 107,
    height: 165,
    padding: 10
  }
});
