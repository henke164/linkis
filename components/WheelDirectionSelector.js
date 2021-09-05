import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getThemeStyles } from '../services/themeService';

const styles = getThemeStyles();

const WheelDirectionSelector = (props) => {
  return (
    <View style={styles.wheelDirectionButtonWrapper}>
      {props.allowAll && (
        <TouchableOpacity
          style={[
            styles.firstWheelDirectionButton,
            styles.wheelDirectionButton,
            (props.wheelDirection === null ? styles.highlight : styles.blurred),
          ]}
          onPress={() => props.setWheelDirection(null)}
          underlayColor='#fff'
        >
          <Text style={[
            styles.buttonText,
            (props.wheelDirection === null ? styles.highlightText : styles.blurredText),
          ]}>
            All
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[
          styles.wheelDirectionButton,
          (props.wheelDirection === 0 ? styles.highlight : styles.blurred),
        ]}
        onPress={() => props.setWheelDirection(0)}
        underlayColor='#fff'
      >
        <Text style={[
          styles.buttonText,
          (props.wheelDirection === 0 ? styles.highlightText : styles.blurredText),
        ]}>
          Clockwise
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.lastWheelDirectionButton,
          styles.wheelDirectionButton,
          (props.wheelDirection === 1 ? styles.highlight : styles.blurred),
        ]}
        onPress={() => props.setWheelDirection(1)}
        underlayColor='#fff'>
        <Text style={[
          styles.buttonText,
          (props.wheelDirection === 1 ? styles.highlightText : styles.blurredText),
        ]}
        >
          Counter-clockwise
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WheelDirectionSelector;