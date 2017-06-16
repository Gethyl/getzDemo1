/**
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

const About = (props:any) => {
    let styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
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
    })
 return (
        <View>
            <Text style={styles.welcome}>
                About View
            </Text>
            <Text style={styles.instructions}>
                This view doesn't check for authentication
            </Text>
        </View>
    )


}

export default About
