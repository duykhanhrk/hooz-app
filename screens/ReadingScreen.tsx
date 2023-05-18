import {useQuery} from "@tanstack/react-query";
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useMemo} from 'react';
import {AppStackParamList} from "@navigation";
import {BookService} from "@services";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import WebView from "react-native-webview";
import useAppSelector from "../hooks/useAppSelector";

export default function PolicyAndTermScreen() {
  const readingOption = useAppSelector(state => state.readingOption);

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'ReadingScreen'>>();
  const route = useRoute<RouteProp<AppStackParamList, 'ReadingScreen'>>();
  const {book_id, chapter_id} = route.params;

  const query = useQuery({
    queryKey: ['book', book_id, 'chapter', chapter_id],
    queryFn: () => BookService.getChapterAsync(chapter_id)
  })

  const html = useMemo(
    () => `<div style="padding: 0px 8px; color: ${readingOption.color}; font-size: ${readingOption.fontSize}px; font-weight: ${readingOption.fontWeight}; text-align: ${readingOption.textAlign}">${query.data ? query.data.chapter.content : ''}</div>`,
    [query.data, readingOption]
  );

  if (query.isLoading) {
    return <LoadingScreen />
  }

  if (query.isError) {
    return <ErrorScreen />
  }

  return (
    <WebView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{resizeMode: 'cover', flex: 1, backgroundColor: readingOption.backgroundColor}}
      source={{html: html}}
      scalesPageToFit={false}
    />
  )
}
