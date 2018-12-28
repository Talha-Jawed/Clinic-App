import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Token_No } from '../../../Redux/actions/authAction'

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Clinic_Name: this.props.ClinicData.ClinicName,
            Since: this.props.ClinicData.Since,
            openTime: this.props.ClinicData.OpenTime,
            closeTime: this.props.ClinicData.CloseTIme,
            Dr_Name: this.props.ClinicData.Name,
            UID: this.props.UID,
            Count: this.props.ClinicData.Count
        }
    }

    componentDidMount() {
        const Data = this.props.ClinicData
        console.log('=====>', Data);
    }

    componentDidUpdate() {
        const { Count, UID } = this.state
        this.props.Counter(Count, UID)
    }

    count() {
        const { Count } = this.state
        const add = Count + 1
        this.setState({ Count: add })
    }

    reset() {
        this.setState({ Count: 0 })
    }


    render() {
        const { Clinic_Name, Since, openTime, closeTime, Dr_Name, Count } = this.state
        return (
            <ScrollView>

                <View>
                    <View style={styles.counter}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Token No: {Count}</Text>
                        <Text onPress={() => this.count()} style={{ backgroundColor: '#2980b9', fontSize: 18, color: '#ffff' }}>{' Add '}</Text>
                        <Text onPress={() => this.reset()} style={{ backgroundColor: '#ff1a1a', fontSize: 18, color: '#ffff' }}>{' Reset '}</Text>
                    </View>
                    <Text style={styles.text}>Clinic Name: {Clinic_Name}</Text>
                    <Text style={styles.text}>Since: {Since}</Text>
                    <Text style={styles.text}>Open Time: {openTime}</Text>
                    <Text style={styles.text}>Close Time: {closeTime}</Text>
                    {/* <Text>Dr. Name {Dr_Name}</Text> */}
                    <View style={styles.container}>

                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            region={{
                                latitude: 24.964860840139554,
                                longitude: 67.06739690154791,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >
                            <MapView.Marker
                                // draggable
                                coordinate={{
                                    latitude: 24.964860840139554,
                                    longitude: 67.06739690154791,
                                }}
                            // onDragEnd={e => this.setState({
                            //     where: { lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude }
                            // })}
                            />

                        </MapView>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        height: 200,
        width: 200,
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 12,
        padding: 7,
    },
    counter: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

function mapStateToProps(states) {
    return ({
        name: states.authReducers.USERNAME,
        UID: states.authReducers.UID,
        ClinicData: states.authReducers.CLINICDATA
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        Counter: (Count, UID) => {
            dispatch(Token_No(Count, UID));
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);