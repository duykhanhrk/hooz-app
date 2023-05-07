import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {SessionProvider} from '@contexts';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useCachedResources} from '@hooks';
import {ColorScheme} from '@constants';
import {LoadingScreen} from '@components';
import AppNavigation from './navigation/AppNavigation';

const queryClient = new QueryClient()

export default function App() {
  const { isLoading } = useCachedResources();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ColorScheme.primaryColor}}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <AppNavigation />
            <StatusBar style="auto" />
          </SessionProvider>
        </QueryClientProvider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </SafeAreaView>
  );
}
