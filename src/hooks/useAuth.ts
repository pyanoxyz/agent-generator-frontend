import { create } from "zustand";
// import { useSignMessage, useAccount } from "wagmi";
// import { verifyMessage } from "ethers";
import secureLocalStorage from "react-secure-storage";
// import { base, mainnet } from "wagmi/chains";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

export const AUTH_MESSAGE = `Welcome to pyano.fun, Sign this message for server authentication`;

const STORAGE_KEY = "auth_signature";
// const SUPPORTED_NETWORKS = [base.id, mainnet.id] as const;

interface AuthState {
  signature: string | null;
  setAuth: (signature: string) => void;
}

const getInitialState = () => {
  const storedSignature = secureLocalStorage.getItem(STORAGE_KEY) as string | null;
  return {
    signature: storedSignature,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),
  setAuth: (signature: string) => {
    secureLocalStorage.setItem(STORAGE_KEY, signature);
    set({ signature });
  },
}));

export function useAuth() {
  const { signMessage, publicKey, connected } = useWallet();
  const setAuth = useAuthStore((state: AuthState) => state.setAuth);
  // const account = useAccount();
  // const { chain } = useAccount();
  const verifySignature = (message: string, signature: string, publicKey: PublicKey): boolean => {
    try {
      const messageBytes = new TextEncoder().encode(message);
      const signatureBytes = bs58.decode(signature);
      const publicKeyBytes = publicKey.toBytes();

      return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
    } catch (error) {
      console.error("Signature verification failed:", error);
      return false;
    }
  };

  // const isNetworkSupported = (): boolean => {
  //   if (!chain) return false;
  //   return SUPPORTED_NETWORKS.includes(chain.id as (typeof SUPPORTED_NETWORKS)[number]);
  // };

  const signIn = async (): Promise<string> => {
    if (!connected || !signMessage || !publicKey) {
      throw new Error("Wallet not connected");
    }
    try {
      const storedSignature = secureLocalStorage.getItem(STORAGE_KEY) as string | null;

      if (storedSignature) {
        try {
          const isValid = verifySignature(AUTH_MESSAGE, storedSignature, publicKey);
          if (isValid) {
            setAuth(storedSignature);
            return storedSignature;
          }
        } catch (error) {
          console.warn("Stored signature invalid, requesting new signature");
          secureLocalStorage.removeItem(STORAGE_KEY);
        }
      }

      const messageBytes = new TextEncoder().encode(AUTH_MESSAGE);
      const signature = await signMessage(messageBytes);
      const signatureBase58 = bs58.encode(signature);
      setAuth(signatureBase58);
      return signatureBase58;

      // const signature = await signMessageAsync({
      //   message: AUTH_MESSAGE,
      // });
      // setAuth(signature);
      // return signature;
    } catch (error) {
      console.error("Failed to sign:", error);
      throw error;
    }
  };

  return { signIn, isNetworkSupported: () => true, isConnected: connected, publicKey };
}
