
import { create } from 'zustand'
import { useSignMessage, useAccount } from 'wagmi'

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
 const { address } = useAccount()
 const setAuth = useAuthStore((state: AuthState) => state.setAuth)

 const signIn = async (): Promise<string> => {
   try {
     const message = `Sign in to Pyano\nAddress: ${address}\nNonce: ${Date.now()}`
     const signature = await signMessageAsync({ message })
     console.log('Signature:', signature)
     setAuth(signature)
     return signature
   } catch (error) {
     console.error('Failed to sign:', error)
     throw error
   }
 }

 return { signIn }
}