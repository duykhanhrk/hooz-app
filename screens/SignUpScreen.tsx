import {View, StyleSheet} from 'react-native';
import {ColorScheme} from '@constants';
import {Text} from '@components';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Text>SignUpScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorScheme.primaryColor
  }
});
