import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Linking, Picker } from 'react-native';

export default class SettingsScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          name: '',
          key: '',
          showlogonmessage: true,
          userJSONStatusMessage: '',
          myJSON: [],
          ReposJSON: [],
          loggedIn: false,
          username: "",
          activeRepos: {},
          currentRepo: "<None selected>"
      }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleKeyChange = this.handleKeyChange.bind(this);
      this.handleConnectButtonPress = this.handleConnectButtonPress.bind(this);
      this.handleDisconnectButtonPress = this.handleDisconnectButtonPress.bind(this);
      this.loadMyJSON = this.loadMyJSON.bind(this);
      this.parseMyJSON = this.parseMyJSON.bind(this);
      this.loadReposJSON = this.loadReposJSON.bind(this);
      this.parseReposJSON = this.parseReposJSON.bind(this);
      this.parseReposLine = this.parseReposLine.bind(this);
      this.setRepo = this.setRepo.bind(this);
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
        this.loadReposJSON()
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
          console.log("setting login JSON")
          this.parseMyJSON()
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    loadReposJSON(){
        console.log("Getting JSON")
        var uri = "https://"+this.state.name+"/api/user/repos"
        console.log("Repos API: " + uri)
        fetch(uri, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.key
            }
        })
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           ReposJSON: responseJson
          })
          console.log("setting Repos JSON")
          this.parseReposJSON()
        })
        .catch(error=>console.log(error)) //to catch the errors if any
    }

    parseReposJSON(){
        console.log("Parsing Repos JSON")
        this.setState({activeRepos: {}})
        this.state.ReposJSON.map((item) =>
            this.parseReposLine(item)
        )
        console.log("Active Repos:")
        console.log(this.state.activeRepos)

    }

    parseReposLine(item) {
        if (item.active){this.parseActiveRepo(item)}
    }

    parseActiveRepo(item) {
        var reposlug = item.slug
        this.setState({
            activeRepos: {
                ...this.state.activeRepos,
                [reposlug]: {"status": true}
            }
        })
    }

    parseMyJSON(){
        this.setState({username: "Marky"})
        console.log(this.state.myJSON)
        if (this.state.myJSON.hasOwnProperty('message')) {
            console.log("Oops")
            this.setState({username: this.state.myJSON.message})
        }
        if (this.state.myJSON.hasOwnProperty('login')) {
            this.setState({username: this.state.myJSON.login})
            this.setState({userJSONStatusMessage: ''})
            this.setState({loggedIn: true})
        }
    }

    setRepo(reponame){
        console.log("Changed repo to:")
        console.log(reponame)
        this.setState({currentRepo: reponame})
    }

  render() {

    return (
      <View style={styles.container}>
      {this.state.loggedIn &&
          <View style={styles.loginblock}>
          <Text style={styles.logintext}>Logged in as: {this.state.username}</Text>
          <Text style={styles.logintext}>Looking at: {this.state.currentRepo}</Text>
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
            <View>
            {(this.state.activeRepos != {}) &&
                <Text style={styles.header}>Pick a repo</Text>
            }
            <Picker onValueChange={(itemValue, itemIndex) => this.setRepo(itemValue)}>
            {(this.state.activeRepos != {})  &&
                Object.keys(this.state.activeRepos).map((repo, key)=>(
                    <Picker.Item
                        value={repo}
                        label={repo}
                        key={repo}
                    />
                ))
            }
            </Picker>
            <View  style={styles.buttonsurround}>
                <TouchableOpacity onPress={this.handleDisconnectButtonPress}>
                    <Text
                        style={styles.logoutbutton}
                    >Disconnect</Text>
                </TouchableOpacity>
            </View>
            </View>
        }

        {this.state.showlogonmessage &&
            <View>
            <Text>{this.state.userJSONStatusMessage}</Text>
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
  buttonsurround: {
     paddingTop: 20
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
          padding: 5,
          textAlign:'center',
  },
  logoutbutton: {
      backgroundColor: 'red',
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 12,
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
          overflow: 'hidden',
          padding: 5,
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
      paddingRight: 10,
      paddingTop: 10,
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
