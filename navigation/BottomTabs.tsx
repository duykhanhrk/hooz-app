import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ColorScheme} from '@constants';
import HomeLineIcon from '@icons/home_3_line.svg';
import HomeFillIcon from '@icons/home_3_fill.svg';
import SearchLineIcon from '@icons/search_line.svg';
import SearchFillIcon from '@icons/search_fill.svg';
import UserLineIcon from '@icons/user_2_line.svg';
import UserFillIcon from '@icons/user_2_fill.svg';
import {HomeScreen, SearchScreen, UserScreen} from '@screens';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: ColorScheme.primaryColor,
          elevation: 0,
          borderTopWidth: 0
        },
        tabBarActiveTintColor: ColorScheme.themeColor,
        tabBarInactiveTintColor: ColorScheme.textColor,
        tabBarLabelStyle: {marginBottom: 2}
      }}
    >
      <Tab.Screen
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({focused}) => {
            return (
              <>
                {focused ? (
                  <HomeFillIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.themeColor}
                  />
                ) : (
                  <HomeLineIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.textColor}
                  />
                )}
              </>
            );
          }
        }}
        name="HomeStack"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({focused}) => {
            return (
              <>
                {focused ? (
                  <SearchFillIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.themeColor}
                  />
                ) : (
                  <SearchLineIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.textColor}
                  />
                )}
              </>
            );
          }
        }}
        name="CategoryStack"
        component={SearchScreen}
      />

      <Tab.Screen
        options={{
          title: 'Người dùng',
          tabBarIcon: ({focused}) => {
            return (
              <>
                {focused ? (
                  <UserFillIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.themeColor}
                  />
                ) : (
                  <UserLineIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.textColor}
                  />
                )}
              </>
            );
          }
        }}
        name="UserStack"
        component={UserScreen}
      />
    </Tab.Navigator>
  );
}
