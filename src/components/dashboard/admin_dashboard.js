import React, { useState } from 'react';
import './admin_dashboard.css';
import Bar from '../../images/bar.png'
import Pie from '../../images/pie.svg'
import Scatter from '../../images/scatter.jpeg'


const Admin_dashboard = () => {

  const [image, setImage] = useState("");
  const [temp, setTfvalue] = useState("");

  const displayOnChange = (event) => {
    const valueSelectedByUser = parseInt(event.target.value);
      if (valueSelectedByUser === 1) {
        setImage("Bar");
      } 

      if (valueSelectedByUser === 2) {
        setImage("Pie");
      }

      if (valueSelectedByUser === 3) {
        setImage("Scatter");
      }
      setTfvalue('false')

  }

  function handleClick(event) {
    // event.preventDefault();
    setTfvalue("true")

  }

  return (
    <>
      <div className='navcontainer'>

        <div className='navbar'>
          {/* <label>pick a display</label> */}
          <select onChange={displayOnChange} className='dropdown' name="graphs" id="graphs">
            <option value="1">Bar Graph</option>
            <option value="2">Pie Chart</option>
            <option value="3">Scatter plot</option>
          </select>

          <button onClick={handleClick}>Display graph</button>

        </div>

        {temp === "true" && image === "Bar" && 
        <div className='content'><img className="graph" src={Bar} alt="picture" /></div>}
        
        {temp === "true" && image === "Pie" && 
        <div className='content'><img className="graph" src={Pie} alt="picture" /></div>}

        {temp === "true" && image === "Scatter" && 
        <div className='content'><img className="graph" src={Scatter} alt="picture" /></div>}
                
      </div>

    </>

  )
}

export default Admin_dashboard