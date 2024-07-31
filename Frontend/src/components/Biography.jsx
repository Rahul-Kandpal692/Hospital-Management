import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className='banner'>
        <img src={imageUrl} alt="About image"></img>
      </div>
      <div className='banner'>
        <p>Biography</p>
        <strong>Who we Are?</strong>
        <p>CareMe is your trusted partner in health and wellness, we are committed to providing high-quality, comprehensive medical care and reliable health information to our community. Our mission is to enhance the health and well-being of our patients through compassionate care, innovative solutions, and a dedication to excellence.</p>
        <strong>Our Mission</strong>
        <p>Our mission is to deliver exceptional medical care that is accessible, affordable, and tailored to meet the unique needs of each individual. We strive to empower our patients with the knowledge and resources they need to make informed decisions about their health.</p>
        <strong>Our Vision</strong>
        <p>Our vision is to be a leader in healthcare, recognized for our commitment to patient-centered care, cutting-edge medical treatments, and community health initiatives. We aim to create a healthier future for all by fostering a culture of innovation, collaboration, and continuous improvement.</p>
        <strong>Community Involvement</strong>
        <p>HealthCareHub is proud to be an active member of the community. We participate in local health fairs, educational workshops, and community outreach programs to promote health and wellness. We believe in giving back to the community and making a positive impact on the lives of those we serve.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
      
    </div>
  )
}

export default Biography
