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

class SignUp extends Component {

    navigateForward(routeName) {
        this.props.navigator.push({
            name: routeName
        });
    }

    navigateBack() {
        this.props.navigator.pop();
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar barStyle="default"/>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={this.navigateBack.bind(this)}
                >
                    <Text style={styles.back}>&#60;</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Sign Up Now!</Text>
                <View style={styles.options}>
                    <TouchableOpacity
                      style={styles.signup}
                      activeOpacity={0.9}
                      onPress={this.navigateForward.bind(this, 'SignUpForm')}>
                        <Text style={styles.signupText}>
                            Sign up with email
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.facebook}
                      activeOpacity={0.9}>
                        <Text style={styles.facebookText}>Facebook</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.terms}>Terms of Service</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    text: {
        color: colors.teal,
        fontWeight: '400',
        fontSize: 20,
        marginTop: 45,
        marginLeft: 15
    },
    options: {
        marginTop: 45,
        marginLeft: 15
    },
    terms: {
        color: colors.magenta,
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        left: 145,
        fontSize: 10,
        fontWeight: '500'
    },
    backButton: {
        marginTop: 25,
        marginLeft: 10
    },
    back: {
        color: colors.magenta,
        fontWeight: '900',
        fontSize: 17
    },
    facebook: {
        marginTop: 40,
        height: 35,
        borderRadius: 8,
        backgroundColor: 'blue',
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 50
    },
    facebookText: {
        color: 'white',
        marginTop: 7,
        fontWeight: 'bold',
        fontSize: 11
    },
    signup: {
        marginTop: 40,
        height: 35,
        borderRadius: 8,
        backgroundColor: colors.teal,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40
    },
    signupText: {
        color: 'white',
        marginTop: 7,
        fontWeight: '400',
        fontSize: 14
    }
});

export default SignUp;
