import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Text
} from 'react-native';

class LoginSignUp extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View>
                    <Image
                     style={styles.background}
                     source={require("../../images/space.jpg")}
                    />
                </View>
                <View style={styles.logo}></View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var flareColor = '#C10D55';

const styles = StyleSheet.create({
    container: {

    },
    background: {
        width: screenWidth,
        height: screenHeight,
    },
    logo: {
        marginTop: 60,
        width: 150,
        height: 150,
        right: 115,
        backgroundColor: flareColor,
        position: 'absolute',
        borderRadius: 20,
        alignItems: 'center'
    },
    loginButton: {
        marginLeft: 15,
        width: 160,
        height: 45,
        backgroundColor: flareColor,
        position: 'absolute',
        borderRadius: 15,
        bottom: 35
    },
    loginText: {
        color: '#F7EFF2',
        textAlign: 'center',
        fontWeight: '200',
        marginTop: 10
    },
    signUpButton: {
        width: 160,
        height: 45,
        backgroundColor: '#F7EFF2',
        position: 'absolute',
        borderRadius: 15,
        right: 15,
        bottom: 35
    },
    signUpText: {
        color: flareColor,
        textAlign: 'center',
        fontWeight: '200',
        marginTop: 10
    }
});

export default LoginSignUp;
