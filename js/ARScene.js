'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations
} from 'react-viro';

var createReactClass = require('create-react-class');

var ARScene = createReactClass({
  getInitialState() {
    return {
      text : "Initializing AR..."
    };
  },

  render: function() {
    return (
      <ViroARScene onTrackingUpdated={()=>{this.setState({ text : "Look Around! What do you see?" })}}>
        <ViroText 
            text={this.state.text} 
            scale={[.1, .1, .1]} 
            height={1} 
            width={4} 
            position={[0, .5, -1]} 
            style={styles.textStyle} 
        />
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight 
            innerAngle={5} 
            outerAngle={90} 
            direction={[0,-1,-.2]} 
            position={[0, 3, 1]} 
            color="#ffffff" 
            castsShadow={true} 
        />
        <Viro3DObject
            source={require('./res/bb8_animated/scene.gltf')}
            resources={[
              require('./res/bb8_animated/scene.bin'),
              require('./res/bb8_animated/textures/Scene_Material1_baseColor.jpeg'),
              require('./res/bb8_animated/textures/Scene_Material1_emissive.jpeg'),
              require('./res/bb8_animated/textures/material_baseColor.jpeg'),
              require('./res/bb8_animated/textures/Scene_Material1_metallicRoughness.png'),
              require('./res/bb8_animated/textures/Scene_Material_metallicRoughness.png'),
              require('./res/bb8_animated/textures/Scene_Material_baseColor.jpeg'),
              require('./res/bb8_animated/textures/Scene_Material_emissive.jpeg')
            ]}
            type="GLTF"
            position={[0, 0, -1]}
            scale={[.2, .2, .2]}
            dragType="FixedDistance" 
            onDrag={()=>{}}
        />
      </ViroARScene>
    );
  }
});

var styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  }
});

module.exports = ARScene;
