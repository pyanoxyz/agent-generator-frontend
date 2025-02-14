import { Link } from "react-router-dom";
import logo from "../../assets/logoWhite.svg";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-end justify-center">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                <span className="ml-2 text-xl font-semibold text-white">Pyano</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
