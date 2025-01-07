import { FaTwitter, FaDiscord, FaGithub, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Brand Section */}
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            pyano.fun
          </h3>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://x.com/pyano_fun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-blue-400 transition-all"
              aria-label="Twitter"
            >
              <FaTwitter className="size-5" />
            </a>
            {/* <a 
              href="https://discord.gg/pyano" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-indigo-400 transition-all"
              aria-label="Discord"
            >
              <FaDiscord className="size-5" />
            </a> */}
            <a 
              href="https://t.me/+ScRjg1m1h_JlZGJl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-sky-400 transition-all"
              aria-label="Telegram"
            >
              <FaTelegram className="size-5" />
            </a>
            <a 
              href="https://github.com/pyanoxyz/pyano-framework" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-all"
              aria-label="GitHub"
            >
              <FaGithub className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;