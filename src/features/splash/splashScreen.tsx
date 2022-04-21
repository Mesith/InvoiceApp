import * as React from 'react';
import {Button, Text, TextInput, View, StyleSheet} from 'react-native';
// Splash Screen first loading screen when app started
const SplashScreen = () => {
  return (
    <View style={style.splashContainer}>
      <Text style={style.textStyle}>Invoice App</Text>
    </View>
  );
};

const style = StyleSheet.create({
  splashContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 5,
    marginLeft: 5,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFE8E7',
  },
  textStyle: {
    fontSize: 24,
    width: '100%',
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default SplashScreen;
