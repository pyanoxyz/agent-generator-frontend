import { Link } from "react-router-dom";
import {
  FaRobot,
  FaTelegram as TelegramIcon,
  FaRegCalendarAlt as CalenderIcon,
  FaTwitter as TwitterIcon,
  FaGithub as GithubIcon,
} from "react-icons/fa";
import logo from "../../assets/PyanoLogoGreen.svg";
// import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { checkRegister, registerUser } from "../../api/register";
import { useAuth } from "../../hooks/useAuth";
// import ConnectWallet from "../ConnectWallet";
import { useWallet } from "@solana/wallet-adapter-react";
import SolanaConnectWallet from "../SolanaConnectWallet";
import classNames from "classnames";

const NavBar = ({ sticky, className }: { sticky?: boolean; className?: string }) => {
  // const { isConnected, address } = useAccount();
  // const { disconnect } = useDisconnect();
  const { disconnect } = useWallet(); // Add this line to get disconnect function

  const { signIn, isConnected, publicKey } = useAuth();

  useEffect(() => {
    if (isConnected && publicKey) {
      checkRegister(publicKey.toString()).then(async (registered) => {
        if (!registered) {
          const signature = await signIn().catch(async (error) => {
            console.log("Failed to sign in:", error);
            disconnect();
          });
          if (signature) {
            await registerUser(signature, publicKey.toString()).catch(async (error) => {
              console.log("Failed to register user:", error);
              disconnect();
            });
          }
        }
      });
    }
  }, [isConnected]);

  return (
    <nav
      className={classNames(
        `top-2 left-0 h-16 mx-2 sm:mx-8 right-0 backdrop-blur-sm z-50  ${sticky ? " sticky" : ""}`,
        className
      )}
    >
      <div className="h-full container max-w-[1500px] border border-borderPrimary  bg-secondary rounded-xl  mx-auto  overflow-hidden">
        <div className="flex items-center justify-between h-full">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-end ml-2">
              <img src={logo} alt="Pyano Logo" className="h-6 sm:h-8 md:h-8 w-auto" />
              <span className="text-sm sm:text-lg md:text-xl font-bold text-primary">Pyano</span>
            </Link>
          </div>

          {/* Middle Section - Social Links */}
          <div className="hidden md:flex items-center justify-end flex-1 mx-4">
            <div className="flex items-center gap-6">
              <a
                href="https://x.com/pyano_fun"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:opacity-80 transition-colors"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/+ScRjg1m1h_JlZGJl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:opacity-80 transition-colors"
              >
                <TelegramIcon className="w-5 h-5" />
              </a>
              {/* <a
                href="https://calendly.com/pyano-fun/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:opacity-80 transition-colors"
              >
                <CalenderIcon className="w-5 h-5" />
              </a> */}
            </div>
          </div>

          {/* Right Section - Navigation Links and Connect Button */}
          <div className="flex items-center justify-between h-full">
            <Link
              to="/agents"
              className="flex items-center justify-center gap-3 px-2 sm:px-3 py-1.5 border-x border-primary hover:bg-primary/5 transition-colors h-full"
            >
              <FaRobot className="w-7 h-7 text-primary" />
              <span className="hidden sm:inline text-sm font-bold text-black">Agents</span>
            </Link>
            <a
              href="https://github.com/pyanoxyz"
              target="_blank"
              className="flex items-center justify-center gap-3 px-2 sm:px-3 py-1.5 border-r border-primary hover:bg-primary/5 transition-colors h-full"
            >
              <GithubIcon className="w-6 h-6 text-primary" />
              <span className="text-sm font-bold text-black">Github</span>
            </a>

            {/* <Link
              to="/chat"
              className="flex items-center px-2 sm:px-3 py-1.5 border-r border-primary hover:bg-primary/5 transition-colors h-full"
            >
              <span className="text-sm font-bold text-black">Docs</span>
            </Link> */}
            <div className=" h-full">
              {/* <ConnectWallet /> */}
              <SolanaConnectWallet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
