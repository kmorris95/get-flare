'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Navigator,
    Image,
    Text
} from 'react-native';

import { colors, dimensions } from '../../constants/flare-constants';

class LoginSignUp extends Component {

    navigateForward(routeName) {
        this.props.navigator.push({
            name: routeName
        });
    }

    render() {
        return(
            <View>
                <StatusBar barStyle="dark-content"/>
                <ScrollView horizontal={true}>
                    <Image
                     style={styles.background}
                     source={require("../../images/flare_3.jpg")}
                    />
                    <Image
                     style={styles.background}
                     source={require("../../images/flare_4.jpeg")}
                    />
                </ScrollView>
                <View style={styles.logo}></View>
                <TouchableOpacity
                  style={styles.loginButton}
                  activeOpacity={0.9}
                  onPress={this.navigateForward.bind(this, 'LogIn')}
                >
                    <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signUpButton}
                  activeOpacity={0.9}
                  onPress={this.navigateForward.bind(this, 'SignUp')}
                >
                    <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        width: dimensions.screenWidth,
        height: dimensions.screenHeight,
    },
    logo: {
        marginTop: 30,
        width: 135,
        height: 135,
        right: 118,
        backgroundColor: colors.magenta,
        position: 'absolute',
        borderRadius: 20,
        alignItems: 'center'
    },
    loginButton: {
        marginLeft: 15,
        width: 160,
        height: 40,
        backgroundColor: colors.magenta,
        position: 'absolute',
        borderRadius: 10,
        bottom: 25
    },
    loginText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '200',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    },
    signUpButton: {
        width: 160,
        height: 40,
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 10,
        right: 15,
        bottom: 25
    },
    signUpText: {
        color: colors.magenta,
        textAlign: 'center',
        fontWeight: '200',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    }
});

export default LoginSignUp;
