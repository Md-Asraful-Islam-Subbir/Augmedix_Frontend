import React from 'react'
import './Exploy.css'
import {assets} from '../../assets/assets'
const Exploy = () => {
  return (
    <div className="exploy-container">
      <div className="exploymenulist">
      <h2>Trusted by leading healthcare organizations</h2>
        <img src={assets.Ex1} alt="Logo 1" className="exploy-image" />
        <img src={assets.Ex2} alt="Logo 2" className="exploy-image" />
        <img src={assets.Ex3} alt="Logo 3" className="exploy-image" />
        <img src={assets.Ex4} alt="Logo 4" className="exploy-image" />
      </div>
    </div>
  )
}

export default Exploy