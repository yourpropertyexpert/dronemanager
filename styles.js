import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Linking, Picker, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#FFFFDD',
  },
  success: {color: '#00FF00'},
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
      backgroundColor: '#FFFFFF', borderColor: '#0000FF', borderWidth: 1, padding: 3, margin: 5
  },
  buildblock: {backgroundColor: '#FFFFFF', borderColor: '#0000FF', borderWidth: 1, padding: 3, margin: 5},
  avatar: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    width: 40,
    height: 60,
    },
    historyblock: {borderRadius: 12, backgroundColor: '#FFFFFF', borderColor: '#000000', borderWidth: 1, padding: 3, margin: 5},
    historyheader: {color: '#0000FF'},
    historybody: {color: '#000000'},
    historyfooter: {color: '#007700', textAlign: 'right'},
    statussuccess: {backgroundColor: '#00FF00', borderRadius: 8, padding: 3},
    statusdefault: {backgroundColor: '#000000', color: '#FFFFFF', borderRadius: 8, padding: 3},
    statusfailureerror: {backgroundColor: '#FF0000', borderRadius: 8, padding: 3},
});

export default styles;
