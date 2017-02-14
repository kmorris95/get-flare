'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
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
                <StatusBar barStyle="light-content"/>
                <View>
                    <Image
                     style={styles.background}
                     source={require("../../images/space.jpg")}
                    />
                </View>
                <View style={styles.logo}></View>
                <TouchableOpacity
                  style={styles.loginButton}
                  activeOpacity={0.8}
                  onPress={this.navigateForward.bind(this, 'LogIn')}
                >
                    <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signUpButton}
                  activeOpacity={0.8}
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
        marginTop: 60,
        width: 150,
        height: 150,
        right: 115,
        backgroundColor: colors.magenta,
        position: 'absolute',
        borderRadius: 20,
        alignItems: 'center'
    },
    loginButton: {
        marginLeft: 15,
        width: 160,
        height: 45,
        backgroundColor: colors.magenta,
        position: 'absolute',
        borderRadius: 15,
        bottom: 35
    },
    loginText: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: '200',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    },
    signUpButton: {
        width: 160,
        height: 45,
        backgroundColor: colors.white,
        position: 'absolute',
        borderRadius: 15,
        right: 15,
        bottom: 35
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
