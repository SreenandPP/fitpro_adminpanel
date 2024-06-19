import React from 'react'
import { Link } from 'react-router-dom'
import NavFit from '../components/NavFit'

function Landing() {
  return (
   <>
   <NavFit/>
    <div
               style={{
                  height: '100vh',
                  backgroundImage: `url('https://www.pickyourfitness.com/assets/images/mission/video-img.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center', // Center items vertically
                  flexDirection: 'column', // Align items in a column
               }}
            >
               <div className='d-dlex flex-column justify-content-center align-items-center '>

                  <h2 className='text-white ' style={{ textTransform: 'uppercase', fontWeight: '800' }}>Transform Your <span style={{ color: "var(--dark-red)" }}> Sweat into Strength</span> </h2>
                  <h2 className='text-white  text-center ' style={{ textTransform: 'uppercase', fontWeight: '800' }}>Your <span style={{ color: "var(--dark-red)" }}> Effort into Results...</span> </h2>

                  <div className='d-flexjustify-content-center align-items-center text-center'>
                     <Link to={'/auth'} className='btn btn-danger p-3 mt-3'  style={{ fontWeight: '900' }}>SIGN IN</Link>

                  </div>

               </div>


            </div>
   
   </>
  )
}

export default Landing