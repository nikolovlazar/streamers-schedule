import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import supabase from '~supabase';

type State = 'LOGGED_IN' | 'LOGGED_OUT' | 'CHECKING';
type Props = {
  session: Session | null;
  logout: () => Promise<void>;
  signInWithTwitch: () => Promise<any>;
  state: State;
  setSession: Dispatch<SetStateAction<Session | null>>;
};

const initialState: Props = {
  session: null,
  setSession: () => null,
  logout: async () => {},
  state: 'CHECKING',
  signInWithTwitch: async () => {},
};

const AuthContext = createContext(initialState);

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const data = useAuthLayer();
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export const useAuth = (): Props => {
  return useContext(AuthContext);
};

export const useAuthLayer = () => {
  const router = useRouter();
  const [state, setState] = useState<State>('CHECKING');

  const [session, setSession] = useState<Session | null>(
    supabase.auth.session()
  );

  const signInWithTwitch = async () => {
    await supabase.auth.signIn(
      {
        provider: 'twitch',
      },
      {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/logging-in`,
      }
    );
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      if (session) {
        setState('LOGGED_IN');
      } else {
        setState('LOGGED_OUT');
      }
    });
  }, []);

  useEffect(() => {
    const checkAuthState = async () => {
      const {
        data: supabaseSession,
        error,
      } = await supabase.auth.getSessionFromUrl({
        storeSession: true,
      });

      const localStorageSession = localStorage.getItem('supabase.auth.token');

      if (supabaseSession || localStorageSession) {
        setState('LOGGED_IN');
      } else {
        setState('LOGGED_OUT');
      }
    };

    checkAuthState();
  }, []);

  return {
    logout,
    state,
    session,
    setSession,
    signInWithTwitch,
  };
};
