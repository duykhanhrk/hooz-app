import {View, StyleSheet} from "react-native";
import {ColorScheme} from '@constants';
import {Text} from "@components";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorScheme.primaryColor
  }
});
