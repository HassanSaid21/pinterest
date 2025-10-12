
import {Image}  from '@imagekit/react'

const ImageKit  = ({width= null , height=null   , src  ,alt ,className   ,  onClick})=>{


  return (
    <Image
    onClick= {onClick}
    width={width}
    height={height}
  src={src}
  alt={alt}
  loading="lazy"
  transformation={[{ width: width , height :height }]}// 👈 resize to 250px width
   className={className}
/>   
  )
}

export default ImageKit