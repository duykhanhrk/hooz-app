import {View, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity} from "react-native"
import {ColorScheme, Dimensions} from "@constants";
import {useQuery} from "@tanstack/react-query";
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from "@navigation";
import {Book, BookService} from "@services";
import {useState} from "react";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import Text from "../components/Text";
import Button from "../components/Button";

import HeartLineIcon from '@icons/heart_line.svg';
import HeartFillIcon from '@icons/heart_fill.svg';

export default function BookScreen() {
  const [book, setBook] = useState<Book>();

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'BookScreen'>>();
  const route = useRoute<RouteProp<AppStackParamList, 'BookScreen'>>();
  const {book_id} = route.params;

  const query = useQuery({
    queryKey: ['book', book_id],
    queryFn: () => BookService.getDetailAsync(book_id),
    onSuccess: (data) => {
      setBook(data.book);
    }
  });

  if (query.isLoading) {
    return <LoadingScreen />
  }

  if (query.isError) {
    return <ErrorScreen />
  }

  return (
    <ImageBackground
      source={{uri: book?.image_url}}
      style={styles.container}
    >
    <ScrollView
      style={{backgroundColor: 'transparent'}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[1]}
    >
      <View style={{height: Dimensions.window.height / 2, justifyContent: 'center', alignItems: 'center'}}>
      </View>
      <View style={{backgroundColor: ColorScheme.primaryColor, paddingHorizontal: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{flex: 1, marginRight: 4, marginVertical: 8}}
            icon={
              book?.favorited
              ? <HeartFillIcon width={24} height={24} fill={ColorScheme.themeColor} />
              : <HeartLineIcon width={24} height={24} fill={ColorScheme.themeColor} />
            }
            title="Yêu thích"
            titleStyle={{color: book?.favorited ? ColorScheme.themeColor : ColorScheme.textColor}}
            type="secondary"
          />
          <Button
            style={{flex: 1, marginLeft: 4, marginVertical: 8, width: 180}}
            title={book?.reading_chapter ? 'Đọc tiếp' : 'Đọc ngay'}
          />
        </View>
      </View>
      <View style={{minHeight: Dimensions.window.height - 118, paddingHorizontal: 16, backgroundColor: ColorScheme.primaryColor}}>
        <View style={{marginBottom: 8}}>
          <Text style={{fontWeight: 'bold', marginBottom: 4}}>{book?.name}</Text>
          <Text style={{}}>{book?.other_names}</Text>
          <Text style={{}}>{book?.author}</Text>
        </View>
        <View style={{marginBottom: 8}}>
        <Text style={{fontWeight: 'bold', marginBottom: 4}}>Nội dung</Text>
        <Text style={{textAlign: 'justify'}}>{book?.description}</Text>
        </View>
        <View style={{marginBottom: 8}}>
          <Text style={{fontWeight: 'bold', marginBottom: 4}}>Danh sách chương</Text>
          <View>
            {book?.chapters?.map((chapter, index) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={chapter.id.toString()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: ColorScheme.placeHolderColor,
                  borderBottomWidth: 1,
                  padding: 8
                }}
                onPress={() => navigation.navigate('ReadingScreen', {title: chapter.name, chapter_id: chapter.id, book_id})}
                >
                <Text>{chapter.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.primaryColor
  }
});
