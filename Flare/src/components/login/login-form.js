'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';

import { colors } from '../../constants/flare-constants';

class LoginForm extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 280,
        height: 380,
        marginTop: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'red',
        borderColor: 'blue',
        padding: 5,
        borderRadius: 5
    },
    inputWrapper: {
        height: 42,
        backgroundColor: colors.flareColor,
        borderColor: 'blue',
        borderRadius: 5
    }
});

export default LoginForm;
