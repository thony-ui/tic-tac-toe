import { change } from "@/store/darkMode";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";

function Header() {
  const darkMode = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();
  const toggleDark = () => {
    dispatch(change());
  };
  return (
    <div className="flex flex-col items-center justify-center font-Roboto">
      {/* create a wavy background to enchance the user interface */}
      <svg
          viewBox="0 10 500 800"
          preserveAspectRatio="none"
          className={`fixed top-0 z-[-1]`}
        >
          <path
            fill="#eee1ff"
            d="M0,40 C50,100 350,-35 500,40 L500,00 L0,0 Z"
          />
        </svg>
      <svg
        viewBox="0 0 1920 300" 
        preserveAspectRatio="none"
        className="fixed bottom-0 w-full z-[-1]"
        style={{ fill: "#eee1ff" }} 
      >
        <path d="M0,150 C480,270 1440,30 1920,100 L1920,300 L0,300 Z" />
      </svg>
      <div className="flex items-center gap-4">
        <p
          className={`text-[20px] md:text-[40px] ${
            darkMode ? "text-purple-100" : "text-purple-800"
          }`}
        >
          Welcome to Pyramid Tic Tac Toe
        </p>
        {/* change icons depending on dark mode or light mode */}
        {darkMode ? (
          <GoSun
            className="w-[25px] h-[25px] cursor-pointer text-purple-100"
            onClick={toggleDark}
            data-testid="sun-icon"
          />
        ) : (
          <FaMoon
            className="w-[25px] h-[25px] cursor-pointer text-purple-800"
            onClick={toggleDark}
            data-testid="moon-icon"
          />
        )}
      </div>
    </div>
  );
}

export default Header;
