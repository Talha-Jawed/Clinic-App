import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, Platform, TouchableOpacity } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { geodesy, distance, latitude, longitude, elevation, geolocation, geodistance, geojson, geospatial, lbs, location } from 'geolib'
import { Constants, Location, Permissions } from 'expo';



export default class ClinicLocation extends React.Component {
    constructor() {
        super()
        this.state = {
            markers: '',
            ready: false,
            where: { lat: null, lng: null },
            error: null,
            location: null,
            errorMessage: null,
            get: false
        }
    }
    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            location,
            where: { lat: location.coords.latitude, lng: location.coords.longitude },
            get: true
        });
    };
   

    render() {
        const { positionx, positiony, coordinate, where, location, get } = this.state
        // console.log('where****', where.lat);
        // console.log('loca*****', location);

        return (
            <View style={styles.container}>
                {get === true &&
                    this.MapComponent()
                    
                }
                {/* <Button
                    title='location'
                    onPress={() => this._getLocationAsync()}
                /> */}
            </View>

        );
    }

    MapComponent() {
        const { positionx, positiony, coordinate, where, location, get } = this.state

        return (
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}

                region={{
                    latitude: where.lat,
                    longitude: where.lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}

            >
                <MapView.Marker
                    draggable
                    coordinate={{
                        latitude: where.lat,
                        longitude: where.lng,
                    }}
                    onDragEnd={e => this.setState({ positionx: e.nativeEvent.position.x, positiony: e.nativeEvent.position.y, coordinate: e.nativeEvent.coordinate })}
                    // anchor={{ x: positionx, y: positiony }}
                    // centerOffset={{
                    //     x: positionx,
                    //     y: positiony
                    // }}
                //   coordinate={{ latitude, longitude }}
                />


            </MapView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});