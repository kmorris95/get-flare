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
                <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton} activeOpacity={0.8}>
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
        backgroundColor: colors.flareColor,
        position: 'absolute',
        borderRadius: 20,
        alignItems: 'center'
    },
    loginButton: {
        marginLeft: 15,
        width: 160,
        height: 45,
        backgroundColor: colors.flareColor,
        position: 'absolute',
        borderRadius: 15,
        bottom: 35
    },
    loginText: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: '200',
        marginTop: 10
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
        color: colors.flareColor,
        textAlign: 'center',
        fontWeight: '200',
        marginTop: 10
    }
});

export default LoginSignUp;
