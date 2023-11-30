import React from 'react'
import Alert from 'react-bootstrap/Alert';

const Notification = (props) => {
  const captialize = (word) => {
    if (word==='danger'){
      word='Error';
  }
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase() +  lower.slice(1);
}
  return (
    <>
     
    
      {props.notification && <Alert  variant={props.notification.type}>
        <strong>{captialize(props.notification.type)}</strong>: {props.notification.msg} 
      </Alert>}
    
   
  </>
  )
}

export default Notification