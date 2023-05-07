import React, {useEffect} from "react";
import {LoadingScreen} from "@components";
import {SessionService} from "@services";
import {TokensHelper} from "@helpers";
import {isAxiosError} from "axios";
import {Alert} from "react-native";

export interface Tokens {
  access_token: string;
  refresh_token: string;
};

interface SessionPayLoad {
  tokens: null | Tokens,
  signUp: (email: string, password: string) => Promise<void>,
  signIn: (email: string, password: string) => Promise<void>,
  signOut: () => Promise<void>
}

export const SessionContext = React.createContext<SessionPayLoad>({
  tokens: null,
  signUp: async (email: string, password: string) => {},
  signIn: async (email: string, password: string) => {},
  signOut: async () => {}
});


export const SessionProvider = ({children}: {children: React.ReactNode}) => {
  const [tokens, setTokens] = React.useState<null | Tokens>(null);
  const [status, setStatus] = React.useState<{isLoading: boolean, isError: boolean}>({isLoading: false, isError: false});

  const signUp = async (email: string, password: string) => {
    setStatus({isLoading: true, isError: false});

    try {
      const _tokens = await SessionService.signUpAsync({email, password});

      await TokensHelper.setTokensAsync(_tokens);

      setTokens(_tokens);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          Alert.alert('Lỗi', error.response.data.message);
        } else {
          Alert.alert('Lỗi', 'Vui lòng kiểm tra lại kết nối mạng');
        }
      } else {
        Alert.alert('Lỗi', 'Vui lòng kiểm tra lại kết nối mạng');
      }
    } finally {
      setStatus({isLoading: false, isError: false});
    }
  }

  const signIn = async (email: string, password: string) => {
    setStatus({isLoading: true, isError: false});

    try {
      const _tokens = await SessionService.signInAsync({email, password});

      await TokensHelper.setTokensAsync(_tokens);

      setTokens(_tokens);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          Alert.alert('Lỗi', error.response.data.message);
        } else {
          Alert.alert('Lỗi', 'Vui lòng kiểm tra lại kết nối mạng');
        }
      } else {
        Alert.alert('Lỗi', 'Vui lòng kiểm tra lại kết nối mạng');
      }
    } finally {
      setStatus({isLoading: false, isError: false});
    }
  }

  const signOut = async () => {
    setStatus({isLoading: true, isError: false});

    try {
      if (tokens) {
        await SessionService.signOutAsync(tokens);
      }
    } catch (error) {
    } finally {
      await TokensHelper.eraseTokensAsync();
      setTokens(null);
      setStatus({isLoading: false, isError: false});
    }
  }

  const trySignIn = async () => {
    setStatus({isLoading: true, isError: false});

    try {
      let _tokens = await TokensHelper.getTokensAsync();

      if (_tokens) {
        _tokens = await SessionService.refreshTokensAsync(_tokens);

        await TokensHelper.setTokensAsync(_tokens);

        setTokens(_tokens);
      }
      setStatus({isLoading: false, isError: false});
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status == 422) {
          setStatus({isLoading: false, isError: false});
        } else {
          setStatus({isLoading: false, isError: true});
        }
      } else {
          setStatus({isLoading: false, isError: true});
      }
    }
  }

  useEffect(() => {
    trySignIn();
  }, []);

  return (
    <SessionContext.Provider value={{tokens, signUp, signIn, signOut}}>
      {status.isError ? <LoadingScreen />
        : status.isLoading ? <LoadingScreen />
        : children
      }
    </SessionContext.Provider>
  );
};
