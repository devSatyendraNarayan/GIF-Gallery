import React from 'react'
import {FaInstagram, FaXTwitter, FaYoutube} from "react-icons/fa6"

function FollowOn() {
  return (
   <>
   <div className='opacity-50  pt-2'>
    <span>Follow on:</span>
    <div className='flex gap-4 pt-3 '>
        <a href="www.youtube.com">
            <FaYoutube size={20}/>
        </a>
        <a href="www.instagram.com">
            <FaInstagram size={20}/>
        </a>
        <a href="www.twitter.com">
            <FaXTwitter size={20}/>
        </a>
    </div>
   </div>
   </>
  )
}

export default FollowOn