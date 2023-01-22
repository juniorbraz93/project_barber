import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from 'nookies'
import Router from "next/router";

import { api } from "@/services/apiClient";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
}

interface UserProps {
  id: string | any;
  name:  string | any;
  email:  string | any;
  address:  string | null;
  token:  string | any;
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
        token,
        address,
        subscriptions
      })
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')

    } catch (error) {
      console.log('Erro ao entrar', error);
      
    }
  }

  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}