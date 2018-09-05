import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

var sharedProps = {
  apiKey: '50EF9586-C367-4A82-B110-79B6B9471439',
}

// var InitialARScene = require('./js/PsychoSmile');
var InitialARScene = require('./js/ARScene');
var InitialVRScene = require('./js/HelloWorldScene');

var UNSET = 'UNSET';
var VR_NAVIGATOR_TYPE = 'VR';
var AR_NAVIGATOR_TYPE = 'AR';

var defaultNavigatorType = UNSET;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps
    };
    this.getExperienceSelector = this.getExperienceSelector.bind(this);
    this.getARNavigator = this.getARNavigator.bind(this);
    this.getVRNavigator = this.getVRNavigator.bind(this);
    this.getExperienceButtonOnPress = this.getExperienceButtonOnPress.bind(this);
    this.exitViro = this.exitViro.bind(this);
  }

  getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          <TouchableHighlight 
            style={localStyles.buttons}
            onPress={this.getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>AR</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            style={localStyles.buttons}
            onPress={this.getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} 
          >
            <Text style={localStyles.buttonText}>VR</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  getARNavigator() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }} />
    );
  }
  
  getVRNavigator() {
    return (
      <ViroVRSceneNavigator 
        {...this.state.sharedProps}
        initialScene={{ scene: InitialVRScene }} 
        onExitViro={this.exitViro}
      />
    );
  }

  getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }

  exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }

  render() {
    if (this.state.navigatorType === UNSET) {
      return this.getExperienceSelector();
    } else if (this.state.navigatorType === VR_NAVIGATOR_TYPE) {
      return this.getVRNavigator();
    } else if (this.state.navigatorType === AR_NAVIGATOR_TYPE) {
      return this.getARNavigator();
    }
  }
}

// Copied from Viro Sample online
var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize : 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = App;
