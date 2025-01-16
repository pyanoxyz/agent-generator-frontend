import { FaTwitter, FaTelegram } from "react-icons/fa";
import { FaRegCalendarAlt as CalenderIcon } from "react-icons/fa";
import logo from "../assets/PyanoLogoGreen.svg";

const Footer = () => {
  return (
    <footer className="pt-8 bg-gradient-to-t from-bgPrimary via-secondary to-secondary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col  justify-between items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4 mb-10">
            <a href="https://x.com/pyano_fun" target="_blank" aria-label="Twitter">
              <FaTwitter className="size-10 text-primary" />
            </a>
            <a
              href="https://t.me/+ScRjg1m1h_JlZGJl"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg  transition-all"
              aria-label="Telegram"
            >
              <FaTelegram className="size-10 text-primary" />
            </a>
            <a
              href="https://calendly.com/pyano-fun/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors"
            >
              <CalenderIcon className="size-10 text-primary" />
            </a>
            {/* <a
              href="https://github.com/pyanoxyz/pyano-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-all"
              aria-label="GitHub"
            >
              <FaGithub className="size-8 text-primary" />
            </a> */}
          </div>

          {/* Brand Section */}

          <h3 className="text-3xl font-bold bg-primary bg-clip-text text-transparent font-sans">
            Pyano.fun
          </h3>
          <img src={logo} alt="Pyano Logo" className="h-32 sm:h-32 md:h-36 w-auto object-fit" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
