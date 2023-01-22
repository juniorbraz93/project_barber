import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from "next/router";

import { api } from "@/services/apiClient";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface UserProps {
  id: string | any;
  name:  string | any;
  email:  string | any;
  address:  string | null;
  subscriptions?: SubscriptionProps | null | any;
}

interface SubscriptionProps {
  id:  string | any;
  status:  string | any;
}

type AuthProviderProps = {
  children: ReactNode;
}

interface SignInProps {
  email:  string | any;
  password:  string | any;
}

interface SignUpProps {
  name:  string | any;
  email:  string | any;
  password:  string | any;
}


export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(null, '@barber.token', { path: '/' })
    Router.push('/login');
  } catch (error) {
    console.log('Error ao sair');
    
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user,setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@barber.token': token } = parseCookies()

    if (token) {
      api.get('/current').then((response) => {
        const { id, name, email, address, subscriptions } = response.data
        setUser({
          id,
          name,
          email,
          address,
          subscriptions
        })
      }).catch(() => {
        signOut();
      })
    }
  }, [])

  async function signIn({email, password}: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password
      })

      const { id, name, address, token, subscriptions } = response.data
      
      setCookie(undefined, '@barber.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mês
        path: '/'
      })

      setUser({
        id,
        name,
        email,
        address,
        subscriptions
      })
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')

    } catch (error) {
      console.log('Erro ao entrar', error);
      
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password
      })

      Router.push('/login')


    } catch (error) {
      console.log('Erro ao registrar', error);
    }
  }

  async function logoutUser() {
    try {
      destroyCookie(null, '@barber.token', { path: '/' })
      Router.push('/')
      setUser(null)
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <AuthContext.Provider
    value={{
        user,
        isAuthenticated,
        signIn,
        signUp,
        logoutUser
      }}>
      {children}
    </AuthContext.Provider>
  )
}