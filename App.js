import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Linking, Picker, Image } from 'react-native';

export default class SettingsScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          servername: '',
          key: '',
          showlogonmessage: true,
          userJSONStatusMessage: '',
          myJSON: [],
          ReposJSON: [],
          RepoName: "",
          RepoHistoryJSON: [],
          loggedIn: false,
          showRepoSelector: false,
          showCurrentRepoHistory: false,
          showCurrentHistoryItem: false,
          showSpecificStage: false,
          username: "",
          activeRepos: {},
          thisHistoryItem: [],
          thisHistoryDetail: [],
          thisStep: {},
          thisHistoryTrigger: "",
          currentRepo: "<No repo selected>"
      }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleKeyChange = this.handleKeyChange.bind(this);
      this.handleConnectButtonPress = this.handleConnectButtonPress.bind(this);
      this.handleDisconnectButtonPress = this.handleDisconnectButtonPress.bind(this);
      this.handleBackFromSingleHistoryItemPress = this.handleBackFromSingleHistoryItemPress.bind(this);
      this.handleBackSingleStage = this.handleBackSingleStage.bind(this);
      this.loadMyJSON = this.loadMyJSON.bind(this);
      this.loadReposJSON = this.loadReposJSON.bind(this);
      this.loadRepoHistoryJSON = this.loadRepoHistoryJSON.bind(this);
      this.parseHistoryJSON = this.parseHistoryJSON.bind(this);
      this.parseMyJSON = this.parseMyJSON.bind(this);
      this.parseReposJSON = this.parseReposJSON.bind(this);
      this.parseReposLine = this.parseReposLine.bind(this);
      this.setRepo = this.setRepo.bind(this);
      global.showHistoryItem = this.showHistoryItem.bind(this);
      global.listStages = this.listStages.bind(this);
      global.setSteps = this.setSteps.bind(this);
      global.listSteps = this.listSteps.bind(this);
    }

    showHistoryItem(item) {
        this.setState({showCurrentRepoHistory: false})
        console.log("Item passed to showHistoryItem:")
        console.log(item)
        var uri = "https://"+this.state.servername+"/api/repos/"+this.state.RepoName+"/builds/"+item.number
        fetch(uri, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.key
            }
        }).then(response => response.json())
        .then((responseJson)=> {
            console.log("The response JSON for build " + item.number + " was: ")
            console.log(responseJson)
            this.parseHistoryJSON(responseJson)
          })

        console.log("Getting repo specific build: " + uri)
        this.setState({thisHistoryItem: item})
        this.setState({showCurrentHistoryItem: true})
    }

    parseHistoryJSON(responseObject) {
        this.setState({thisHistoryDetail: JSON.stringify(responseObject)})
        this.setState({thisHistoryTrigger: responseObject.trigger})
    }

    listStages() {
        var HistoryDetail = this.state.thisHistoryDetail
        if (HistoryDetail == "") {return <View/>}
        var HistoryObject = JSON.parse(HistoryDetail)
        return <View>
        {
            Object.values(HistoryObject.stages).map((stage)=>(
                <TouchableOpacity key={stage.id} onPress={ () => {global.setSteps(stage)}}>
                <Text>-- {stage.name}</Text>
                </TouchableOpacity>
            ))
        }
        </View>
    }

    setSteps(stepobject) {
        console.log(stepobject)
        this.setState({thisStep: stepobject})
        this.setState({showCurrentHistoryItem: false})
        this.setState({showSpecificStage: true})
        }

    listSteps() {
        var stepsObject = this.state.thisStep
        console.log ("listSteps")
        console.log(stepsObject)
        console.log ("/listSteps")
        return(
            <View>
                <Text>Here</Text>
                <Text>Also Here</Text>
            </View>
        )
    }


    handleNameChange(name) {
        console.log("Name Change");
        this.setState({servername:name });
    }

    handleKeyChange = (text) => {
      this.setState({key: text});
    }

    handleConnectButtonPress() {
        console.log("Handling button press")
        this.setState({showlogonmessage: true})
        this.setState({userJSONStatusMessage: "Trying to connect"})
        this.setState({showCurrentHistoryItem: false})
        this.loadMyJSON()
        this.loadReposJSON()
        var json = "Trying to connect..."
    }

    handleBackFromSingleHistoryItemPress() {
        this.setState({showlogonmessage: true})
        this.setState({showCurrentRepoHistory: true})
        this.setState({showCurrentHistoryItem: false})
    }

    handleBackSingleStage() {
        this.setState({showlogonmessage: true})
        this.setState({showCurrentHistoryItem: true})
        this.setState({showSpecificStage: false})
    }

    handleDisconnectButtonPress() {
        console.log("Handling button press")
        this.setState({loggedIn: false})
        this.setState({showRepoSelector: false})
        this.setState({showCurrentRepoHistory: false})
        this.setState({userJSONStatusMessage: "Logged out"})
    }


    loadMyJSON(){
        console.log("Getting User JSON")
        var uri = "https://"+this.state.servername+"/api/user"
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
        .catch(error=>console.log(error))
    }

    loadReposJSON(){
        console.log("Getting JSON")
        var uri = "https://"+this.state.servername+"/api/user/repos"
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

    loadRepoHistoryJSON(reponame){
        var uri = "https://"+this.state.servername+"/api/repos/"+reponame+"/builds"
        console.log("Getting repo history: " + uri)
        fetch(uri, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.state.key
            }
        })
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           RepoHistoryJSON: responseJson,
           RepoName: reponame
          })
          console.log("setting Repo History JSON")

      }).then(responseJson => {this.setState({showCurrentRepoHistory: true})})
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
            this.setState({showRepoSelector: true})
        }
    }

    setRepo(reponame){
        console.log("Changed repo to " + reponame)
        this.setState({currentRepo: reponame})
        this.loadRepoHistoryJSON(reponame);
        this.setState({showRepoSelector: false})
    }

  render() {

    return (
      <View style={styles.container}>
      {this.state.loggedIn &&
          <View style={styles.loginblock}>
          <Text style={styles.logintext}>{this.state.username}
          {this.state.loggedIn &&
            <TouchableOpacity onPress={this.handleDisconnectButtonPress}>
                <Text style={styles.action}> [Log Out]</Text>
            </TouchableOpacity>
          }
          </Text>

          <Text style={styles.logintext}>{this.state.currentRepo}
            {(this.state.currentRepo != "<No repo selected>") &&
            <TouchableOpacity onPress={this.handleConnectButtonPress}>
                <Text style={styles.action}> [Change]</Text>
            </TouchableOpacity>

            }
          </Text>
          </View>
      }

      {!this.state.loggedIn &&
        <View>
          <Text style={styles.header}>Connect to your Drone server</Text>
        <TextInput
          style={styles.textInput}
          name = 'servername'
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
            <Text style={styles.mybutton}>Connect</Text>
        </TouchableOpacity>
        </View>

        }
        {this.state.showRepoSelector &&
            <View>
                <Text style={styles.header}>Pick a repo</Text>
            <Picker style={styles.picker} onValueChange={(itemValue, itemIndex) => this.setRepo(itemValue)}>
            {
                Object.keys(this.state.activeRepos).map((repo, key)=>(
                    <Picker.Item
                        value={repo}
                        label={repo}
                        key={repo}
                    />
                ))
            }
            </Picker>
            </View>
        }

        {this.state.showCurrentRepoHistory &&
            <View>
                <Text style={styles.header}>History:</Text>
                {
                    this.state.RepoHistoryJSON.map(function(item, key){
                        return <View style={styles.historyblock} key={key}>
                            <Text style={styles.historyheader}>Build {item.number} - {item.status}</Text>
                            <Text style={styles.historybody}>{item.message}</Text>
                            <Text style={styles.historybody}>- Run by {item.sender}</Text>
                            <TouchableOpacity onPress={()=>global.showHistoryItem(item)}>
                                <Text style={styles.historyfooter}>[See more]</Text>
                            </TouchableOpacity>
                        </View>
                    })
                }
            </View>
        }

        {this.state.showCurrentHistoryItem &&
            <View>
            <Text style={styles.historyheader}>Build {this.state.thisHistoryItem.number} - {this.state.thisHistoryItem.status}</Text>
                <View style={styles.personblock}>
                    <Text style={styles.historybody}>{this.state.thisHistoryItem.author_name}</Text>
                    <Text style={styles.historybody}>({this.state.thisHistoryItem.sender})</Text>
                    <Image style={styles.avatar} source= {this.state.thisHistoryItem.author_avatar}/>
                </View>
                <View style={styles.buildblock}>
                    <Text style={styles.historybody}>{this.state.thisHistoryItem.message}</Text>
                </View>
                <View style={styles.buildblock}>
                    <Text style={styles.historybody}>Stages:</Text>
                    {global.listStages()}
                    <TouchableOpacity onPress={this.handleBackFromSingleHistoryItemPress}>
                        <Text style={styles.historyfooter}>...back</Text>
                    </TouchableOpacity>
                </View>

            </View>
        }

        {this.state.showSpecificStage &&
            <View>
                {global.listSteps()}
                <TouchableOpacity onPress={this.handleBackSingleStage}>
                    <Text style={styles.historyfooter}>...back</Text>
                </TouchableOpacity>
            </View>
        }

        {this.state.showlogonmessage &&
            <View style={styles.buttonsurround}>
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
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36  },
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
  action: {
        color: '#0000FF'
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
  picker: {
      transform: [
         { scaleX: 1.5 },
         { scaleY: 1.5 },
      ]  },
  personblock: {
      flex: 1, flexDirection: 'row',
      backgroundColor: '#FFFFFF', borderColor: '#000000', borderWidth: 1, padding: 3, margin: 5
  },
  buildblock: {backgroundColor: '#FFFFFF', borderColor: '#000000', borderWidth: 1, padding: 3, margin: 5},
  avatar: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    width: 40,
    height: 60,
    },
    historyblock: {backgroundColor: '#FFFFFF', borderColor: '#000000', borderWidth: 1, padding: 3, margin: 5},
    historyheader: {color: '#0000FF'},
    historybody: {color: '#000000'},
    historyfooter: {color: '#007700', textAlign: 'right'},
});
