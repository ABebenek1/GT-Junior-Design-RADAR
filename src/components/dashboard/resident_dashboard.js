import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const resident_dashboard = () => {
  return (
    <div>
        <label>
            Resident Dashboard
        </label>
        <DropdownButton id="dropdown-select-graph" title="Select Graph">
          <Dropdown.Item href="#/action-1">Pie Chart</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Scatter Plot</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Bar Graph</Dropdown.Item>
        </DropdownButton>
    </div>
  )
}

export default resident_dashboard