import React, { useState } from 'react'

import Notes from './Notes';
// import Header from './Header'
const Home = (props) => {
   
  return (
    <>
    
    <Notes showNotification={props.showNotification}/>
    </>
  )
}

export default Home