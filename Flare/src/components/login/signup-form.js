'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert,
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

    signUpUser() {
        Alert.alert(":P", "test");
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <TouchableOpacity
                      onPress={this.navigateBack.bind(this)}
                    >
                        <Text style={styles.back}>&#60;</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.signUpUser.bind(this)}
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
                    <Text style={styles.text}>
                        Choose your service:
                    </Text>
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
    navigation: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 10,
        marginBottom: 20
    },
    formContainer: {
        width: 280,
        height: 380,
        justifyContent: 'center',
        marginLeft: 45,
        marginTop: 100
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
        fontWeight: '200',
        marginLeft: 290,
        marginTop: 2
    },
    text: {
        marginTop: 3,
        marginBottom: 5,
        color: '#A5A5A5',
        fontWeight: '500'
    }
});

export default SignUpForm;
