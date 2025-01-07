
import { create } from 'zustand'
import { useSignMessage,useAccount } from 'wagmi'
import { verifyMessage } from 'ethers'
import { API_BASE_URL } from '../api/agents'

export const AUTH_MESSAGE = `Welcome to pyano.fun, Sign this message for server authentication`



interface AuthState {
 isAuthenticated: boolean
 signature: string | null
 setAuth: (signature: string) => void
 clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set: any) => ({
 isAuthenticated: false,
 signature: null,
 setAuth: (signature: string) => set({ isAuthenticated: true, signature }),
 clearAuth: () => set({ isAuthenticated: false, signature: null })
}))

export async function registerUser(signature: string,) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        signature,
        message: AUTH_MESSAGE,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
}

export async function checkRegister(address: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/check_registered`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        address,
      }),
    });
    
    if (!response.ok) {
      return false  
    }
    return true;
  } catch (error) {
    throw false;
  }
}

export function useAuth() {
 const { signMessageAsync } = useSignMessage()
 const setAuth = useAuthStore((state: AuthState) => state.setAuth)
 const clearAuth = useAuthStore((state) => state.clearAuth)
 const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
 const account = useAccount()


 const signIn = async (): Promise<string> => {
   try {
    
     const signature = await signMessageAsync({ 
      message: AUTH_MESSAGE 
    })     
    const recoveredAddress = verifyMessage(AUTH_MESSAGE, signature)
      
     if (recoveredAddress.toLowerCase() !== account.address?.toLowerCase()) {
       throw new Error('Signature verification failed')
     }
     setAuth(signature)
     return signature
   } catch (error) {
     console.error('Failed to sign:', error)
     throw error
   }
 }

 return { signIn,isAuthenticated ,clearAuth}
}