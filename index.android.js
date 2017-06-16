/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';

import Main from './js/components/Main'
import About from './js/components/About'

import { NativeRouter, Route, Link } from 'react-router-native'

export default class getzDemo1 extends Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Link to='/main'>
            <Text style={{ backgroundColor: 'white' }}>Main Component</Text>
          </Link>
          <Link to='/about'>
            <Text style={{ backgroundColor: 'white' }}>About Component</Text>
          </Link>
          <Route path='/main' component={Main}></Route>
          <Route path='/about' component={About}></Route>
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop:10,
  },
  rowContainer: {
    flex: 3,
    flexDirection:'row',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('getzDemo1', () => getzDemo1);
