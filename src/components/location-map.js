import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

class LocationMap extends Component {
    state = {
        deltaCoords: {
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },

        location: {
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },

        userLocation: {
            latitude: this.props.latitude,
            longitude: this.props.longitude
        },

        loading: true
    }

    onRegionChange = (region) => {
        this.setState({
            location: region,
            loading: true
        })
    }

    onUserLocationChange = (ev) => {
        const { latitude, longitude } = ev.nativeEvent.coordinate

        this.setState({
            userLocation: {
                latitude,
                longitude
            }
        })
    }

    userCurrentLocation = () => {
        this.setState({
            location: {
                ...this.state.userLocation,
                ...this.state.deltaCoords
            }
        })
    }

    onMapReady = () => {
        this.setState({
            loading: false
        })
    }

    onRegionChangeComplete = () => {
        this.setState({
            loading: false
        })
    }

    render() {
        return (
            <View style={styles.container}>          
                <MapView style={styles.map}
                    provider="google"
                    maxZoomLevel={20}
                    initialRegion={{...this.state.userLocation, ...this.state.deltaCoords}}
                    region={{...this.state.location}}
                    showsUserLocation={this.props.useLocation}
                    onUserLocationChange={this.onUserLocationChange}
                    onRegionChange={this.onRegionChange}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    onMapReady={this.onMapReady}
                />
                <View style={styles.searchBarContainer}>
                    <TextInput style={styles.inputLocation} value={`${this.state.location.latitude}, ${this.state.location.longitude}`}></TextInput>
                    {
                        this.state.loading ?
                        <ActivityIndicator style={styles.searchBarSpinner} size="large" />
                        :
                        <Icon style={styles.searchIcon} name="search" color="#3897f0" size={20} />
                    }
                </View>
                <View style={styles.targetIconContainer}>
                    <Icon style={styles.mapMarkerIcon} name="map-marker" color="red" size={40} />
                </View>
                <View style={styles.userLocationContainer}>
                    <Icon name="location-arrow" color="#3897f0" size={40} onPress={this.userCurrentLocation} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1,
    },
    searchBarContainer: {
        ...StyleSheet.absoluteFill,
        top: 10,
        height: 40,
        flex: 1,
        flexDirection: 'row',
        borderRadius: 50,
        opacity: 0.9,
        marginHorizontal: 10
    },
    inputLocation: {
        backgroundColor: 'white',
        flex: 1
    },
    searchBarSpinner: {
        backgroundColor: 'white'
    },
    searchIcon: {
        backgroundColor: 'white',
        paddingTop: 8,
        paddingRight: 8
    },
    userLocationContainer: {
        position: 'absolute',
        bottom: 30,
        right: 10,
        backgroundColor: 'white',
        width: 60,
        height: 60,
        opacity: 0.9,
        borderRadius: 60,
        paddingLeft: 13,
        paddingTop: 10
    },
    targetIconContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: 265,
    },
    mapMarkerIcon: {
        opacity: 0.7
    }
});

export default LocationMap;