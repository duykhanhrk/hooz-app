import {View, StyleSheet} from 'react-native';
import {ColorScheme} from '@constants';

export default function SearchScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorScheme.primaryColor
  }
});
