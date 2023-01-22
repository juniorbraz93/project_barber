import { createContext, ReactNode, useState } from "react";
import { destroyCookie } from 'nookies'
import Router from "next/router";


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
  subscriptions?: SubscriptionProps | null;
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
    
  }

  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}