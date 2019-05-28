import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

class Main extends Component {
    onNewIssue = () => {
        Actions.newRequest()
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <TouchableOpacity style={styles.buttonStyle} onPress={this.onNewIssue}>
                    <View style={styles.viewStyle}>
                        <Icon name="plus" color="#3897f0" size={40}></Icon>
                        <Text style={styles.textStyle}>Nueva Solicitud</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA'
    },
    buttonStyle: {
        width: 300,
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        backgroundColor: 'white',
        elevation: 2
    },
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default Main;