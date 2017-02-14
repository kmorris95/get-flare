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

class SignUpForm extends Component {

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
                    <Text style={styles.back}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.formContainer}>
                    <LoginForm/>
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
    }
});

export default SignUpForm;
