import { Link } from "react-router-dom";
import { FaTelegram as TelegramIcon } from "react-icons/fa";
import GitHubButton from "react-github-btn";

const NavBar = ({ sticky }: { sticky?: boolean }) => {
  return (
    <nav
      className={
        "top-0 left-0 h-16 right-0 bg-black bg-opacity-80 backdrop-blur-sm border-b border-gray-800 z-50" +
        (sticky ? " sticky" : "")
      }
    >
      <div className="xl:max-w-[1440px] mx-auto px-6 flex w-full justify-between items-center">
        <Link to={"/"} className="flex items-center h-full">
          <div className="flex h-full items-center">
            <div className="text-2xl font-bold">pyano.network</div>
          </div>
        </Link>
        <div className="flex justify-end items-center h-16 gap-6">
          <a
            href="https://twitter.com/pyano_network"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
            </svg>
          </a>
          <a
            href="https://t.me/+ScRjg1m1h_JlZGJl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <TelegramIcon className="size-5" />
          </a>
          <a
            href="https://calendly.com/pyano-network/60min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.5 3h-3V1.5a1.5 1.5 0 0 0-3 0V3h-3V1.5a1.5 1.5 0 0 0-3 0V3h-3C2.67 3 2 3.67 2 4.5v15c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zM19 19H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
            </svg>
          </a>
          <div className="flex mt-1">
            <GitHubButton
              href="https://github.com/pyanoxyz/pyano-framework"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-size="large"
              data-show-count="true"
              aria-label="Star pyanoxyz/pyano-framework on GitHub"
            >
              Star
            </GitHubButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
