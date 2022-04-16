import React, { useEffect, useState } from 'react'

const MobileViewBlock = ({children}) => {
  let [isMobile, setIsMobile] = useState(false)

  useEffect(()=>{

    const media = window.matchMedia("only screen and (max-width: 760px)");

    if (media.matches !== isMobile) {
      setIsMobile(media.matches);
    }
    const listener = () => setIsMobile(media.matches);
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener)
  }, [isMobile])

  if(isMobile){
    return <div>Sorry, this website is only available on desktop devices.</div>
}
  return children
}

export default MobileViewBlock