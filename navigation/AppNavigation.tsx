import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {ColorScheme} from '@constants';
import {LoadingScreen} from '@components';
import {useSession} from '@hooks';
import AppStack from './AppStack';
import SessionStack from './SessionStack';

export default function AppNavigation() {
  const session = useSession();
  const AppTheme = {dark: true, colors: {background: ColorScheme.primaryColor}};

  return (
    <NavigationContainer
      theme={AppTheme as typeof DefaultTheme}
      fallback={<LoadingScreen />}
    >
      {session.tokens ? <AppStack /> : <SessionStack />}
    </NavigationContainer>
  );
}
