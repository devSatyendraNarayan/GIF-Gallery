import React, { useEffect, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { GifState } from "../Context/GifContext";
import GifSearch from "./GifSearch";


function Header() {
  const [categories, setCategories] = useState([]);
  const [showCategories, setshowCategories] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { gf,favorites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };
  useEffect(() => {
    fetchGifCategories();
  });
  // Gradient
  const gradient = {
    transition: `
  transition-colors duration-300 transform 
  hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500
`,
  };

  return (
    <>
      <nav className="relative  shadow  ">
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                className="w-auto h-6 sm:h-7"
                src="https://cdn-icons-png.flaticon.com/128/9128/9128917.png"
                alt=""
              />
              <span className="ml-2 sm:text-2xl">GIFY</span>
            </Link>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="transition-colors duration-300 transform hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 p-2 rounded-full"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-gray-950  md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            {/* Render Categories */}
            <div className="flex flex-col md:flex-row md:mx-6">
              {categories?.slice(0, 5)?.map((category) => {
                return (
                  <Link
                    key={category.name}
                    to={`/${category.name_encoded}`}
                    className={`my-2 lg:border-b-4 text-white ${gradient.transition} px-2 py-2 rounded-sm md:mx-4 md:my-0`}
                  >
                    {category.name}
                  </Link>
                );
              })}

              {/* Categories */}

              <button
                className={`flex items-center ${
                  showCategories ? "gradient.transition" : ""
                } transition-colors duration-300 transform hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 px-2 py-2 rounded-sm md:mx-4 md:my-0`}
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                <HiEllipsisVertical size={20} />
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-gradient-to-r from-red-500 to-blue-500">
                  <div className="grid  grid-cols-3 gap-4 ">
                    {categories
                      ?.sort((a, b) => a.name.length - b.name.length)
                      .map((category) => (
                        <Link
                          key={category.name}
                          to={`/${category.name_encoded}`}
                          className=" text-sm md:text-base lg:text-base xl:text-base flex items-center p-1 hover:scale-105 hover:border-b-2"
                        >
                          {category.name}
                        </Link>
                      ))}
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop ">
                  <button>close</button>
                </form>
              </dialog>

              {favorites.length > 0 && (
                <Link
                  className={`my-2 lg:border-b-4 text-white ${gradient.transition} btn  md:mx-4 md:my-0`}
                  to="/favorite"
                >
                  Favourite GIFs
                </Link>
              )}
            </div>
          </div>
        </div>
        <GifSearch/>
      </nav>
    </>
  );
}

export default Header;
