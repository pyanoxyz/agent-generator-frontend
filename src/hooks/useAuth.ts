import { create } from "zustand";
import { useSignMessage, useAccount } from "wagmi";
import { verifyMessage } from "ethers";
import secureLocalStorage from "react-secure-storage";
import { base, mainnet } from 'wagmi/chains';


export const AUTH_MESSAGE = `Welcome to pyano.fun, Sign this message for server authentication`;

const STORAGE_KEY = "auth_signature";
const SUPPORTED_NETWORKS = [base.id, mainnet.id] as const; // Make this a readonly tuple


interface AuthState {
  signature: string | null;
  setAuth: (signature: string) => void;
}

const getInitialState = () => {
  const storedSignature = secureLocalStorage.getItem(STORAGE_KEY) as
    | string
    | null;
  return {
    signature: storedSignature,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),
  setAuth: (signature: string) => {
    secureLocalStorage.setItem(STORAGE_KEY, signature);
    set({  signature });
  }
}));

export function useAuth() {
  const { signMessageAsync } = useSignMessage();
  const setAuth = useAuthStore((state: AuthState) => state.setAuth);
  const account = useAccount();
  const { chain } = useAccount();


  const isNetworkSupported = (): boolean => {
    if (!chain) return false;
    return SUPPORTED_NETWORKS.includes(chain.id as typeof SUPPORTED_NETWORKS[number]);
  };

  const signIn = async (): Promise<string> => {
    try {
      const storedSignature = secureLocalStorage.getItem(STORAGE_KEY) as
        | string
        | null;

      if (storedSignature) {
        try {
          const recoveredAddress = verifyMessage(AUTH_MESSAGE, storedSignature);
          if (
            recoveredAddress.toLowerCase() === account.address?.toLowerCase()
          ) {
            setAuth(storedSignature);
            return storedSignature;
          }
        } catch (error) {
          console.warn("Stored signature invalid, requesting new signature");
          secureLocalStorage.removeItem(STORAGE_KEY);
        }
      }

      const signature = await signMessageAsync({
        message: AUTH_MESSAGE,
      });
      setAuth(signature);
      return signature;
    } catch (error) {
      console.error("Failed to sign:", error);
      throw error;
    }
  };

  return { signIn,isNetworkSupported };
}
