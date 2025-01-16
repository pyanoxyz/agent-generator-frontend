import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useState, useEffect } from "react";

const SolanaConnectWallet = () => {
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center h-full">
      {connected && publicKey ? (
        <button
          onClick={() => disconnect()}
          className="flex items-center gap-2 w-full h-full px-4 bg-bgButton hover:bg-bgButtonHover text-white transition-colors"
        >
          <span className="hidden sm:inline">
            {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
          </span>
          <span className="sm:hidden">Disconnect</span>
        </button>
      ) : (
        <button
          onClick={() => setVisible(true)}
          className=" w-full h-full bg-bgButton hover:bg-bgButtonHover text-white transition-colors px-4"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default SolanaConnectWallet;
