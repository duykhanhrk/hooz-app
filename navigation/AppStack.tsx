import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import {AppStackParamList} from './Types';
import {ColorScheme} from '@constants';
import BottomTabs from './BottomTabs';
import LeftIcon from '@icons/arrow_left_line.svg';

const Stack = createStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTintColor: ColorScheme.themeColor,
        headerTitleStyle: {color: ColorScheme.themeColor},
        headerStyle: {
          backgroundColor: ColorScheme.primaryColor,
          elevation: 0,
          height: 56
        },
        headerLeft: () => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{padding: 0}}
              onPress={() => navigation.goBack(null)}
            >
              <View style={{height: 40, width: 44, alignItems: 'center', justifyContent: 'center'}}>
                <LeftIcon height={28} width={28} fill={ColorScheme.themeColor} />
              </View>
            </TouchableOpacity>
          );
        }
      })
    }>
      <Stack.Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabs} />
    </Stack.Navigator>
  );
}
