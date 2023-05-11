import {useQuery} from "@tanstack/react-query";
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import {AppStackParamList} from "@navigation";
import {Chapter} from '../services/Types';
import {BookService} from "@services";
import ColorScheme from "../constants/ColorScheme";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import WebView from "react-native-webview";

export default function PolicyAndTermScreen() {
  const [chapter, setChapter] = useState<Chapter>();

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'ReadingScreen'>>();
  const route = useRoute<RouteProp<AppStackParamList, 'ReadingScreen'>>();
  const {book_id, chapter_id} = route.params;

  const query = useQuery({
    queryKey: ['book', book_id, 'chapter', chapter_id],
    queryFn: () => BookService.getChapterAsync(chapter_id)
  })

  const html = useMemo(() => `<div style="color: ${ColorScheme.textColor}">${query.data ? query.data.chapter.content : ''}</div>`, [query.data]);

  if (query.isLoading) {
    return <LoadingScreen />
  }

  if (query.isError) {
    return <ErrorScreen />
  }

  return (
    <WebView
      style={{resizeMode: 'cover', flex: 1, backgroundColor: ColorScheme.primaryColor, color: ColorScheme.textColor}}
      source={{html: html}}
      scalesPageToFit={false}
    />
  )
}
