import React from 'react'

export default function Alert(props) {

  return (
    <div>
      <div className="alert alert-primary" role="alert">
  <span style={{fontWeight:"bold"}}>Alert :</span> {props.message}
</div>
    </div>
  )
}
