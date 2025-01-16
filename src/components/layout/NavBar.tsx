import { Link } from "react-router-dom";
import {
  FaRobot,
  FaTelegram as TelegramIcon,
  FaRegCalendarAlt as CalenderIcon,
  FaTwitter as TwitterIcon,
} from "react-icons/fa";
import logo from "../../assets/PyanoLogoGreen.svg";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { checkRegister, registerUser } from "../../api/register";
import { useAuth } from "../../hooks/useAuth";
import ConnectWallet from "../ConnectWallet";

const NavBar = ({ sticky }: { sticky?: boolean }) => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signIn } = useAuth();

  useEffect(() => {
    if (isConnected && address) {
      checkRegister(address).then(async (registered) => {
        if (!registered) {
          const signature = await signIn().catch(async (error) => {
            console.log("Failed to sign in:", error);
            disconnect();
          });
          if (signature) {
            await registerUser(signature).catch(async (error) => {
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
      className={`top-0 left-0 h-12 sm:h-14 md:h-16 my-2 sm:my-4 mx-2 sm:mx-8 rounded-xl right-0 bg-opacity-80 backdrop-blur-sm border border-borderPrimary z-50 bg-secondary${
        sticky ? " sticky" : ""
      }`}
    >
      <div className="h-full max-w-[1440px] mx-auto px-3 md:px-6">
        <div className="flex items-center justify-between h-full">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
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
              <a
                href="https://calendly.com/pyano-fun/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:opacity-80 transition-colors"
              >
                <CalenderIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Section - Navigation Links and Connect Button */}
          <div className="flex items-center justify-between h-full">
            <Link
              to="/agents"
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 border-x border-primary hover:bg-primary/5 transition-colors h-full"
            >
              <FaRobot className="w-5 h-5 text-primary" />
              <span className="hidden sm:inline text-sm font-bold text-black">Agents</span>
            </Link>
            <Link
              to="/chat"
              className="flex items-center px-2 sm:px-3 py-1.5 border-r border-primary hover:bg-primary/5 transition-colors h-full"
            >
              <span className="text-sm font-bold text-black">Docs</span>
            </Link>
            <div className="scale-75 sm:scale-90 md:scale-100 origin-right px-4">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
