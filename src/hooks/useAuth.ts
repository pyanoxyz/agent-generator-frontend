
import { create } from 'zustand'
import { useSignMessage,useAccount } from 'wagmi'

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

export function useAuth() {
 const { signMessageAsync } = useSignMessage()
 const setAuth = useAuthStore((state: AuthState) => state.setAuth)
 const clearAuth = useAuthStore((state) => state.clearAuth)
 const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
 const account = useAccount()


 const signIn = async (): Promise<string> => {
   try {
    console.log("accessing sign in",account.address)
     const message = `Welcome to pyano.fun, Sign this message for server authentication`
     const signature = await signMessageAsync({ message })
     setAuth(signature)
     return signature
   } catch (error) {
     console.error('Failed to sign:', error)
     throw error
   }
 }

 return { signIn,isAuthenticated ,clearAuth}
}