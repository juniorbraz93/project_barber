import { createContext, ReactNode, useState } from "react";


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