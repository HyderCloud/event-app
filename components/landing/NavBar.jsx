import React from 'react'

const NavBar = () => {
  return (
    <div className='w-full fixed flex flex-row items-center navbar-container'
    style={{backgroundColor: '#000000', height: "70px", paddingLeft: "90px"}} >
        <div className='h-64 landing-slot'>LOGO</div>
        {/* <div className='h-56 landing-slot'>תקנון</div>
        <div className='h-56 landing-slot'>קצת עלינו</div>
        <div className='h-56 landing-slot'>קצת עלינו</div> */}
    </div>
  )
}

export default NavBar