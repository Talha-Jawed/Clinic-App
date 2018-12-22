import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity, Picker, KeyboardAvoidingView, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo'
import AppHeader from '../../Component/Header/Header';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'
var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CompanyName: '',
      image: null,
      image2: null,
      image3: null,
      since: false,
      isDatePickerVisible: false,
      isDateTimePickerVisible: false,
      isTime2Visible: false,
      since: '',
      time: '',
      time2: ''
    };
  }

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: 1,
    });
    const response = await fetch(uri);
  const blob = await response.blob();
    // const blob = Base64.encode(uri);;

    console.log(blob);
    // var decodedString = Base64.decode(blob);
    // console.log(decodedString)

    this.setState({ image: uri });
    // if (!result.cancelled) {
    // }
  };

  _pickImage2 = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: 1,
    });

    console.log(uri);

    this.setState({ image2: uri });
  };

  _pickImage3 = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: 1,
    });

    console.log(uri);

    this.setState({ image3: uri });
  };
  // TakePicture = async () => {
  //   await Permissions.askAsync(Permissions.CAMERA);
  //   const { cancelled, uri } = await ImagePicker.launchCameraAsync({
  //     allowsEditing: false,

  //   });
  //   console.log(uri);

  //   this.setState({ image: uri });
  // }


  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDateTimePicker = () => {

    this.setState({ isDatePickerVisible: false });
  }

  _handleDatePicked = (since) => {
    console.log('A since has been picked: ', since);
    this._hideDateTimePicker();
    this.setState({ since: moment(since).format('YYYY') })
  };
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideTimePicker = () => {

    this.setState({ isDateTimePickerVisible: false });
  }

  _handleTime = (time) => {
    console.log('A time1 has been picked: ', time);
    this._hideTimePicker();
    this.setState({ time: moment(time).format('HH:mm') })
  };

  _showTime2Picker = () => this.setState({ isTime2Visible: true });

  _hideTime2Picker = () => {

    this.setState({ isTime2Visible: false });
  }
  _handletime2 = (time2) => {
    console.log('A time2 has been picked: ', time2);
    this._hideTime2Picker();
    this.setState({ time2: moment(time2).format('HH:mm') })
  };

  Next() {
    const { CompanyName, since, time, time2, image, image2, image3 } = this.state
    if (!CompanyName) {
      alert('Invalid Company Name')
    }
    else if (!since) {
      alert("Invalid since year")
    }
    else if (!time || !time2) {
      alert('Invalid time')
    }
    else if (!image && !image2 && !image3) {
      alert('Invalid Certificate Image')
    }
    else {

      this.props.navigation.navigate('ClinicLocation',
        {
          Name: CompanyName,
          Since: since,
          openTime: time,
          closeTime: time2,
          Certificates: image
        })
    }

  }

  // static navigationOptions = { header: null }

  render() {
    const { CompanyName, image2, image3, image, since, time, time2 } = this.state

    return (
      <View style={styles.container} >

        <KeyboardAvoidingView behavior='padding' enabled >

          <ScrollView >

            <TextInput
              style={styles.input}
              onChangeText={(e) => this.setState({ CompanyName: e })}
              value={CompanyName}
              placeholder={'Name of company'}
              placeholderTextColor='rgba(255,255,255,0.7)'

            />
            <View >
              <TouchableOpacity style={styles.input} onPress={this._showDatePicker}>
                <Text style={styles.text}>Since {since}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                // is24Hour={true}
                mode={'date'}
                titleIOS={'Since'}
              />
            </View>

            <View >
              <TouchableOpacity style={styles.input} onPress={this._showDateTimePicker}>
                <Text style={styles.text}>Open Time {time}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleTime}
                onCancel={this._hideTimePicker}
                is24Hour={true}
                mode={'time'}
                titleIOS={'Open Time'}
              />
            </View>
            <View >
              <TouchableOpacity style={styles.input} onPress={this._showTime2Picker}>
                <Text style={styles.text}>Close Time {time2}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isTime2Visible}
                onConfirm={this._handletime2}
                onCancel={this._hideTime2Picker}
                is24Hour={true}
                mode={'time'}
                titleIOS={'Close Time'}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Certificates (Max 3 Images)</Text>
            </View>
            <View style={styles.images}>
              <TouchableOpacity onPress={this._pickImage}>
                {image ?
                  <Image style={{ height: 80, width: 80 }} source={{ uri: image }} /> :
                  <Image style={styles.icon} source={require("../../../assets/iconn.png")} />
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={this._pickImage2}>
                {image2 ?
                  <Image style={{ height: 80, width: 80 }} source={{ uri: image2 }} /> :
                  <Image style={styles.icon} source={require("../../../assets/iconn.png")} />
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={this._pickImage3}>
                {image3 ?
                  <Image style={{ height: 80, width: 80 }} source={{ uri: image3 }} /> :
                  <Image style={styles.icon} source={require("../../../assets/iconn.png")} />
                }
              </TouchableOpacity>
            </View>
            {/* <Button style={styles.Heading}
                title="Take a photo"
                onPress={this.TakePicture}
              /> */}
            {/* <AppAvater onPress={this._pickImage}/> */}

            <TouchableOpacity style={styles.buton} onPress={() => { this.Next() }}>
              <Text style={styles.ButtonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>

        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
    // opacity:0.9
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    color: '#ffff',
  },
  icon: {
    height: 80,
    width: 80,
    opacity: 0.5
  },
  images: {
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    // margin: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
    color: '#fff',
    height: 40,
    width: 300,
    paddingHorizontal: 10,
    fontSize: 18
  },
  buton: {
    alignItems: 'center',
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    // width:150,
    // justifyContent: 'space-between',
  },
  ButtonText: {
    fontWeight: 'bold',
    color: "#ffff",
    // alignItems:'center'
    fontSize: 20
  },

});