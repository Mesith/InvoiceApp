import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerProgress,
} from '@react-navigation/drawer';
import * as React from 'react';
import {Alert} from 'react-native';
import Animated from 'react-native-reanimated';
import {AuthContext} from '../../../app/appNavigator';
import AddInvoiceScreen from './addInvoiceScreen';
import InvoicesScreen from './invoicesScreen';

const Drawer = createDrawerNavigator();
const CustomDrawerContent = props => {
  const progress: any = useDrawerProgress();
  const {signOut} = React.useContext(AuthContext);
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{transform: [{translateX}]}}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sign Out"
          onPress={() =>
            Alert.alert('Confirm', 'Sign Out', [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {text: 'OK', onPress: () => signOut()},
            ])
          }
        />
      </Animated.View>
    </DrawerContentScrollView>
  );
};

const InvoiceAppDrawer = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Invoices" component={InvoicesScreen} />
      <Drawer.Screen name="Add Invoice" component={AddInvoiceScreen} />
    </Drawer.Navigator>
  );
};

const HomeStack = () => {
  return <InvoiceAppDrawer />;
};

export default HomeStack;
