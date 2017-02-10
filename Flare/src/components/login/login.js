'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';

import LoginForm from './login-form'
import { colors } from '../../constants/flare-constants';

class Login extends Component {
    render() {
        return(
            <View style={styles.container}>
                <StatusBar barStyle="default"/>
                <View style={styles.textContainer}>
                    <Text style={styles.welcome}>Welcome Back!</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    welcome: {
        color: colors.teal,
        fontWeight: '700',
        fontSize: 20,
    },
    textContainer: {
        marginTop: 75,
        marginLeft: 15
    },
    formContainer: {
        alignItems: 'center'
    }
});

export default Login;
