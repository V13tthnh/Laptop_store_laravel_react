import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';


const actions = [
  { name: 'Copy' },
  { name: 'Save' },
  {  name: 'Print' },
  {  name: 'Share' },
];

export default function BasicSpeedDial() {
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}

      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
          
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}