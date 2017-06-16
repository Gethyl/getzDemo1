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
    AsyncStorage,
} from 'react-native';
import Auth0Lock from 'react-native-lock';
import auth0Config from '../auth0-config'

export default class Main extends Component {
    state:{
        loggedIn:boolean
    }

    loginAuth0:Function
    loginOrlogoff:Function
    logoffAuth0:Function

    constructor(props:any) {
        super(props)
        this.state = {
            loggedIn : false

        }

        this.loginAuth0 = this.loginAuth0.bind(this)
        this.loginOrlogoff = this.loginOrlogoff.bind(this)
        this.logoffAuth0 = this.logoffAuth0.bind(this)
    }
    componentWillMount(){
        AsyncStorage.getItem('idToken').then(v=>{
            console.log('idToken is ===> ' + v)
            return !!v?this.setState({loggedIn:true}):this.setState({loggedIn:false})
        })
    }

    componentDidUpdate(){
        // AsyncStorage.getItem('idToken').then(v=>{
        //     console.log('idToken is ===> ' + v)
        //     return !!v?this.setState({loggedIn:true}):this.setState({loggedIn:false})
        // })
    }

    loginAuth0() {
        var lock = new Auth0Lock({clientId:auth0Config.clientId, domain:auth0Config.domain}) //, useBrowser: true});

        lock.show({}, async (err, profile, token) => {
            if (err) {
                console.log(err);
                return;
            }
            // Authentication worked!
            console.log('Logged in with Auth0!');
            console.log(token)
            try {
                await AsyncStorage.setItem('idToken', token.idToken);
                debugger
                this.setState({loggedIn:!!token.idToken})
            }
            catch (error) {
                console.log("Error while saving the token")
                this.setState({ loggedIn: false })
            }
        });
    }

    async loginOrlogoff ()  {
        const idToken = await AsyncStorage.getItem('idToken')
        // this.setState({loggedIn:!!idToken})
        console.log(`${idToken} and the Bool value ${!!idToken}`)
        return !!idToken
    }

    async logoffAuth0() {
        await AsyncStorage.removeItem('idToken')
        this.setState({ loggedIn: false })
        Alert.alert('Logging off', 'idToken removed from AsyncStorage')
    }
    render(){
        return !this.state.loggedIn ? 
         (
            <View>
                <Text style={styles.welcome}>
                    Welcome to my first {'\n'} React Native Android App!
                </Text>
                <Text style={styles.instructions}>
                    Login to View some super awesome stuff!!
                </Text>
                <Button title="Login" onPress={this.loginAuth0} color='#ff00FF'></Button>
            </View>
        ) 
        :
        (
            <View>
                <Text style={styles.welcome}>
                    Great!! Now that you are logged in, let's proceed further
                </Text>
                <Button title="Logoff" onPress={this.logoffAuth0} color='green'></Button>
            </View>
        ) 
    }

}

let styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
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

