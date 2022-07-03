import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { UnfoldMore } from '@material-ui/icons';


export default function Filter({filterOption, setFilterOption}) {
 
  const [anchorEl, setAnchorEl] = useState(null);
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleChange = (option) => {
    setFilterOption(option)
    handleClose();
  }
  return (
    <div>
      <Button onClick={handleClick} endIcon={ <UnfoldMore/>}>
        {filterOption}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose} 
      >
        <MenuItem onClick={() => handleChange("todas")}>Todas</MenuItem>
        <MenuItem onClick={() => handleChange("no realizadas")}>No realizadas</MenuItem>
        <MenuItem onClick={() => handleChange("realizadas")}>Realizadas</MenuItem>
      </Menu>
    </div>
  );
}
