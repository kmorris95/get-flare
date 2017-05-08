'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Alert,
    Text
} from 'react-native';

import { colors } from '../constants/flare-constants';

class ToggleSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftActive: true,
            rightActive: false
        }
    }

    whichService() {
      if (this.state.leftActive) {
        return 'Barber';
      } else {
        return 'Stylist';
      }
    }

    leftToggle() {
        this.setState({
            leftActive: true,
            rightActive: false
        })
    }

    rightToggle() {
        this.setState({
            leftActive: false,
            rightActive: true
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <TouchableHighlight
                  style={[styles.half, this.state.leftActive ? styles.magentaBackground : styles.whiteBackground]}
                  onPress={this.leftToggle.bind(this)}
                  underlayColor={colors.magenta}
                  ref={(button) => this.leftButton = button}
                >
                    <Text
                      style={this.state.leftActive ? styles.whiteText : styles.tealText}
                      ref={(text) => this.leftText = text}
                    >
                        {this.props.left}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.half, this.state.rightActive ? styles.magentaBackground : styles.whiteBackground]}
                  onPress={this.rightToggle.bind(this)}
                  underlayColor={colors.magenta}
                  ref={(button) => this.rightButton = button}
                >
                    <Text
                      style={this.state.rightActive ? styles.whiteText : styles.tealText}
                      ref={(text) => this.rightText = text}
                    >
                        {this.props.right}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: colors.teal,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 3,
        width: 225,
        marginLeft: 25
    },
    half: {
        flex: 1,
        alignItems: 'center',
        height: 25,
        justifyContent: 'center'
    },
    magentaBackground: {
        backgroundColor: colors.magenta
    },
    whiteBackground: {
        backgroundColor: 'white'
    },
    whiteText: {
      color: 'white'
    },
    tealText: {
      color: 'teal'
    }
});

export default ToggleSwitch;
