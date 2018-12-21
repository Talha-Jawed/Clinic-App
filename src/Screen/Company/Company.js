import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AppHeader from '../../Component/Header/Header';

export default class Company extends React.Component {

    Add() {
        this.props.navigation.navigate('ClinicInfo')

    }
    static navigationOptions = { header: null }

    render() {

        return (
            <View style={styles.header}>
                <AppHeader />
                <View style={styles.container}>
                    <Button
                        title='Add company'
                        onPress={() => this.Add()}
                    />

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 20,
        // opacity:0.9
    },
    header: {
        flex: 1,
        // backgroundColor: '#3498db',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

})