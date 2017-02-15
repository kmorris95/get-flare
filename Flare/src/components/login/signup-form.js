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
import ToggleSwitch from '../../elements/toggle-switch';

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
                <View>
                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={this.navigateBack.bind(this)}
                    >
                        <Text style={styles.back}>&#60;</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={this.navigateBack.bind(this)}
                    >
                        <Text style={styles.signUp}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      returnKeyType="next"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      returnKeyType="next"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      returnKeyType="next"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      keyboardType="email-address"
                      returnKeyType="next"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Password (min. 6 characters)"
                      returnKeyType="next"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Re-enter password"
                    />
                    <ToggleSwitch left="Barber" right="Stylist"/>
                </View>

                <Text style={styles.terms}>Terms of Service</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        width: 280,
        height: 380,
        justifyContent: 'center',
        marginLeft: 45
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
        marginLeft: 10,
        width: 50
    },
    back: {
        color: colors.magenta,
        fontWeight: '900',
        fontSize: 17
    },
    input: {
        height: 35,
        backgroundColor: 'white',
        borderColor: colors.teal,
        borderWidth: 2,
        padding: 10,
        borderRadius: 2,
        marginBottom: 5
    },
    signUp: {
        color: colors.magenta,
        fontWeight: '200'
    }
});

export default SignUpForm;
