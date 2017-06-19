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
    Image
} from 'react-native';
import Auth0Lock from 'react-native-lock';
import auth0Config from '../auth0-config'

export default class Main extends Component {
    state:{
        loggedIn:boolean,
        userProfile:Object
    }

    loginAuth0:Function
    loginOrlogoff:Function
    logoffAuth0:Function

    constructor(props:any) {
        super(props)
        this.state = {
            loggedIn : false,
            userProfile: {}
        }

        this.loginAuth0 = this.loginAuth0.bind(this)
        this.loginOrlogoff = this.loginOrlogoff.bind(this)
        this.logoffAuth0 = this.logoffAuth0.bind(this)
    }

    componentWillMount(){
        AsyncStorage.multiGet(['idToken','profile']).then(v=>{
            console.info('JSON Parsing v value')
            console.dir(JSON.parse(v[1][1]))
            return !!v?this.setState({loggedIn:true, userProfile:JSON.parse(v[1][1])}):this.setState({loggedIn:false, userProfile:{}})
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
                await AsyncStorage.setItem('profile',  JSON.stringify(profile))
                console.log(profile)
                this.setState({loggedIn:!!token.idToken, userProfile:profile})
            }
            catch (error) {
                console.log("Error while saving the token " + error)
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
        console.dir(this.state.userProfile)
        return !this.state.loggedIn ? 
         (
            <View style={styles.container}>
                <View >
                    <Text style={styles.welcome}>
                        Welcome to my first React Native Android App!
                    </Text>
                    <Text style={styles.instructions}>
                        Login to View some super awesome stuff!!
                    </Text>
                </View>
                
                <View style={styles.footerItem}>
                    <Button title="Login" onPress={this.loginAuth0} color='#ff00FF'></Button>
                </View>
            </View>
        ) 
        :
        (
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcome}>
                        Hello {this.state.userProfile.nickname}
                    </Text>

                    <View style={{display:'flex',flexDirection:'row', backgroundColor:'rgba(220,220,220, 0.8)', justifyContent:'center'}}>
                        <Image
                            style={{width: 200, height: 200, }}
                            source={{uri: this.state.userProfile.picture}}
                        />
                    </View>
                    
                </View>

                <View style={styles.footerItem}>
                    <Button title="Logoff" onPress={this.logoffAuth0} color='green'></Button>
                </View>
            </View>
        ) 
    }

}

let styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection:'column',
            width:800,
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
        footerItem:{
          position: 'absolute', 
          left: 0, 
          right: 0, 
          bottom: 0          
        }
    })

