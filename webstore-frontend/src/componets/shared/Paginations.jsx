import { Pagination } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Paginations = ({ numberOfPages, totalProducts }) => {

  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const paramValue = searchParams.get("page") 
              ? Number(searchParams.get("page"))
              : 1;
  
  const onChangeHandler = (event, value) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  }

  return (
    <Pagination 
      count={numberOfPages}
      page={totalProducts} // +1 because MUI starts at 1 but backend starts at 0
      onChange={onChangeHandler} // -1 to convert back to 0-based
      variant="outlined"
      shape="rounded"
      showFirstButton
      showLastButton
    />
  );
};

export default Paginations;