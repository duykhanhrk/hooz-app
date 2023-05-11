import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {Button, LoadingScreen, ErrorScreen, TextInput} from '@components';
import {UserService} from '@services';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {ColorScheme} from '@constants';
import {useUserProfileQuery} from '@hooks';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';

export default function ChangeInfoScreen() {
  const [userInfo, setUserInfo] = useState<{firstname: string, lastname: string, birthday: Date}>({firstname: '', lastname: '', birthday: new Date()});

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const navigation = useNavigation();
  const query = useUserProfileQuery();

  const update = useMutation(
    () => UserService.updateInfo(userInfo),
    {onSettled: ({data}) => {query.refetch}}
  )

  useEffect(() => {
    setUserInfo(query.data.user);
  }, []);

  if (query.isLoading || update.isLoading) {
    <LoadingScreen />
  }

  if (query.isError || update.isError) {
    <ErrorScreen />
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingVertical: 4, paddingHorizontal: 8}}
      >
        <View style={{flexDirection: 'row', marginVertical: 4}}>
          <TextInput
            style={{flex: 1, marginRight: 4}}
            keyboardType='numbers-and-punctuation'
            placeholder={'Họ'}
            onChangeText={value => setUserInfo({...userInfo, lastname: value})}
            value={userInfo.lastname}
          />
          <TextInput
            style={{flex: 1, marginLeft: 4}}
            keyboardType='numbers-and-punctuation'
            placeholder={'Tên'}
            onChangeText={value => setUserInfo({...userInfo, firstname: value})}
            value={userInfo.firstname}
          />
        </View>
        <Button
          type='secondary'
          style={{flex: 1, marginVertical: 4, justifyContent: 'flex-start'}}
          title={'Sinh nhật: ' + Moment(userInfo.birthday).format('DD/MM/yyyy') }
          onPress={() => setIsDatePickerOpen(true)}
        />
        <DatePicker
          modal={true}
          theme={'dark'}
          mode='date'
          locale='vi_VN'
          open={isDatePickerOpen}
          date={new Date(userInfo.birthday)}
          onConfirm={(date) => {
            setIsDatePickerOpen(false);
            setUserInfo({...userInfo, birthday: date});
          }}
          onCancel={() => {
            setIsDatePickerOpen(false);
          }}
        />
      </ScrollView>
      <Button
        type='primary'
        style={{margin: 8}}
        title={'Cập nhật'}
        titleStyle={{fontWeight: 'bold'}}
        onPress={() => {
          update.mutateAsync()
            .then(() => {
              navigation.goBack();
            })
            .catch(() => {
              Alert.alert('Thông báo', 'Cập nhật không thành công');
            });
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.primaryColor
  }
})
