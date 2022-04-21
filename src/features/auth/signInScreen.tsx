import * as React from 'react';
import {useCallback} from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../../app/appNavigator';
import {useAppSelector} from '../../app/hooks';

// Sign in screen get the username and password user inputs from user and send login API request
const SignInScreen = () => {
  const authLoading = useAppSelector(state => state.auth.authLoading);
  const [username, setUsername] = React.useState<string>(
    'dung+octopus4@101digital.io',
  );
  const [password, setPassword] = React.useState<string>('Abc@123456');
  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={style.signInContainer}>
      {authLoading && (
        <View style={style.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={style.textInputStyle}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={style.textInputStyle}
      />
      <TouchableOpacity
        style={style.button}
        onPress={() => {
          //execute sign in method from Auth Context
          signIn({username, password});
        }}>
        <Text style={style.buttontext}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  signInContainer: {
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
  textInputStyle: {
    fontSize: 24,
    width: '100%',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    textAlign: 'center',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#228FDF',
    width: '80%',
    height: 45,
    padding: 10,
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
  },
  buttontext: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignInScreen;
