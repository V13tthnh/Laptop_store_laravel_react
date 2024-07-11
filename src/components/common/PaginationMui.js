import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationMui() {
  return (
    <Stack spacing={2} style={{marginLeft: '230px'}}>
      <Pagination count={10} variant="outlined" shape="rounded" size='large'/>
    </Stack>
  );
}