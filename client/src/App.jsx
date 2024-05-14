import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layout/App-layout";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories"
import Search from "./Pages/Search"
import SingleGif from "./Pages/Single-gif";
import Favourite from "./Pages/Favourite"
import GifProvider from "./Context/GifContext";

// Homepage
// Categories
// Search
// Single gif
// Favorite

function App() {
  const router=createBrowserRouter([
    {
      element:<AppLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/:category',
          element:<Categories/>
        },
        {
          path:'/search/:query',
          element:<Search/>
        },
        {
          path:'/:type/:slug',
          element:<SingleGif/>
        },
        {
          path:'/:favorite',
          element:<Favourite/>
        }
      ]
    }
  ])
  return (
    <>
    <GifProvider>
    <RouterProvider router={router}/>
    </GifProvider>
      
    </>
  );
}

export default App;
