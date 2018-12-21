import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, Picker } from 'react-native';
import firebase from '../Config/Firebase'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import AppHeader from '../Component/Header/Header'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: '',
            catagory: '',
            Mobile: ''
        };
    }
    componentDidMount() {
        console.log('dashboard', this.props);

    }
    componentWillReceiveProps(props) {
        if (props.name) {
            console.log(USERNAME, 'user ****')
        }
    }

    Compony() {
        this.props.navigation.navigate('Company')
        // alert('thankx')
    }
    User() {
        alert('thankx')
    }
    static navigationOptions = { header: null }
    render() {
        console.log('user name hare =>', this.props.name)
        console.log('user UID =>', this.props.UID)

        const { language, catagory, Mobile } = this.state
       

        return (
            <View  >
                <AppHeader LogOut={this.props.navigation} />
                <View>
                    <Button
                        // style={{marginTop: 100}}
                        onPress={() => this.Compony()}
                        title="Register Company"
                        color='black'

                    />
                </View>
                <View style={styles.btn}>

                    <Button
                        // style={{marginTop: 100}}
                        onPress={() => this.User()}
                        title="Are you finding/waiting for tokens"
                        color='black'

                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    val: {
        // borderColor: 'gray', borderWidth: 2,

        marginBottom: 50,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Number: {
        borderColor: 'gray', borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginTop: 20,
        color: 'black',
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 18
    },
    num: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        marginTop: 150,
    }


});

function mapStateToProps(states) {
    return ({
        name: states.authReducers.USERNAME,
        UID: states.authReducers.UID
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // userAuth: (Email, Password) => {
        //     dispatch(userAction(Email, Password));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);