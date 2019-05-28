import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

class NewRequest extends Component {
    state = {
        useLocation: false,
        userLatitude: null,
        userLongitude: null
    }
    
    onSuccessLocation = (pos) => {
        console.log(pos.coords.latitude);

        this.setState({
            useLocation: true,
            userLatitude: pos.coords.latitude,
            userLongitude: pos.coords.longitude
        })
    }

    onFailedLocation = (err) => {
        console.log(err)
    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: '¿Utilizar la ubicación',
                message: 'Esta aplicación quiere que cambies los ajustes de tu dispositivo',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              navigator.geolocation.getCurrentPosition(this.onSuccessLocation, this.onFailedLocation)

              console.log('You can use the google maps');

            } else {
              console.log('location permission denied');
              this.setState({
                  useLocation: false
              })
            }
        } catch (err) {
        console.log(err);
        }
    }
    

    componentDidMount() {
        this.requestLocationPermission()
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.viewStyle}>
                    <Text style={styles.titleStyle}>Por favor agrega una foto. Nos ayuda a identificar y localizar mejor tu solicitud.</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Icon name="camera" size={30}></Icon>
                        <Text style={styles.textStyle}>Camara</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Icon name="image" size={30}></Icon>
                        <Text style={styles.textStyle}>Libreria de fotos</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => Actions.locationMap({ useLocation: this.state.useLocation, latitude: this.state.userLatitude, longitude: this.state.userLongitude })}>
                        <Icon name="ban" size={30}></Icon>
                        <Text style={styles.textStyle}>No agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonsContainer: {
        marginTop: 20
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    buttonStyle: {
        flexDirection:"row",
        alignItems: 'center',
        paddingVertical: 20,
        borderColor: '#ddd',
        borderBottomWidth: 1
    },
    textStyle: {
        marginLeft: 5,
        fontSize: 18
    }
})

export default NewRequest;