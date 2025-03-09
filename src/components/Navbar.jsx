import { emeraldImgLogo, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <a href="/" className="flex items-center gap-2">
          <img src={emeraldImgLogo} alt="EmeraldDEX" width={55} height={55} />
        </a>

        <div className="flex flex-1 my-5 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer hover:tracking-widest text-gray hover:text-emerald-200 transition-all"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-4 max-sm:justify-end max-sm:flex-1">
          <button className="bg-emerald-500 text-white py-2 px-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-black">
            Connect Wallet
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
