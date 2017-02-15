'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text
} from 'react-native';

import { colors } from '../constants/flare-constants';

class ToggleSwitch extends Component {

    render() {
        return(
            <View style={styles.container}>
                <TouchableHighlight style={styles.half}>
                    <Text>
                        {this.props.left}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.half} underlayColor='white'>
                    <Text>
                        {this.props.right}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: colors.teal,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4
    },
    half: {
        flex: 1,
        backgroundColor: colors.magenta,
    }
});

export default ToggleSwitch;
