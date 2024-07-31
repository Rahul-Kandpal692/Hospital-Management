import React from 'react'

const Hero = ({title,imageUrl}) => {
  return (
    <div className='hero container'>
      <div className='banner'>
        <h1>{title}</h1>
        <p>
        At CareMe,Your health is our priority. We are committed to providing you with the tools and information you need to live a healthier, happier life. Our team of skilled professional is committed to deliver personalized care advices. Explore our website to discover a wealth of resources tailored to meet your medical needs.
        </p>
        <p>
        <strong>Your health. Our mission.</strong>
        </p>
      </div>
        <div className='banner'> 
          <img src={imageUrl} className='animated-image'></img> 
          <span><img src="/Vector.png"></img></span>
        </div>
    </div>
  )
}

export default Hero
