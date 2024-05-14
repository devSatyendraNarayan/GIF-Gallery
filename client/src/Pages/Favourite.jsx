import React, { useEffect, useState } from 'react'
import { GifState } from '../Context/GifContext'
import Gif from '../Component/Gif';

function Favourite() {
  const [favoriteGIFs,setFavoriteGIFs]=useState([])
  const {gf,favorites}=GifState();
  const fetchFavoritesGIFs=async()=>{
    const {data:gifs}=await gf.gifs(favorites)
    setFavoriteGIFs(gifs)
  }
  useEffect(()=>{
    fetchFavoritesGIFs();
  })
  return (
   <>
   <div className='mt-2'>
    <span className='opacity-70'>My Favorites</span>
    <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2'>
      {favoriteGIFs.map((gif)=>(
        <Gif gif={gif} key={gif.id}/>
      ))}
    </div>


   </div>
   </>
  )
}

export default Favourite