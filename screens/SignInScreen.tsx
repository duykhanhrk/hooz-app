import {View, StyleSheet} from "react-native";
import {ColorScheme, Dimensions} from '@constants';
import {Button, ITextInput, Text, TextInput} from "@components";
import {useState} from "react";
import {useSession} from "@hooks";
import {SignInParams} from "@services";
import MailIcon from '@icons/mail_line.svg';
import KeyIcon from '@icons/key_1_line.svg';

export default function SignInScreen() {
  const [params, setParams] = useState<SignInParams>({email: '', password: ''});
  const session = useSession();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>HOOZ</Text>
        <ITextInput
          style={styles.part}
          icon={<MailIcon height={20} width={20} fill={ColorScheme.themeColor} />}
          textInput={{
            placeholder: 'Email',
            value: params.email,
            onChangeText: (text) => setParams({...params, email: text})
          }}
        />
        <ITextInput
          style={styles.part}
          icon={<KeyIcon height={20} width={20} fill={ColorScheme.themeColor} />}
          textInput={{
            placeholder: 'Mật khẩu',
            secureTextEntry: true,
            value: params.password,
            onChangeText: (text) => setParams({...params, password: text})
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={[styles.part, styles.link]}>Quên mật khẩu?</Text>
        </View>
        <Button
          style={styles.part}
          title="Đăng nhập"
          type="primary"
          onPress={() => session.signIn(params.email, params.password)}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.part}>
            Bạn chưa có tài khoản? <Text style={styles.link}>đăng ký ngay</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.primaryColor,
    padding: Dimensions.padding * 2,
    justifyContent: 'center'
  },
  logo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Dimensions.fontSize * 6,
    color: ColorScheme.themeColor,
    marginBottom: Dimensions.margin * 6
  },
  part: {
    marginVertical: Dimensions.margin
  },
  link: {
    color: ColorScheme.themeColor,
    fontWeight: 'bold'
  }
});
