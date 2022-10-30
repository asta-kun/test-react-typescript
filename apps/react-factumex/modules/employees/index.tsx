import { Box } from '@mui/system';
import React, { ReactElement, useRef } from 'react';
import classes from './index.module.sass';
import StandardBeautifulContainer from '../../containers/StandardBeautifulContainer';
import { Page } from '../../hooks/use-navigation';
import EmployeeTable from './containers/EmployeeTable';
import { TableActions } from './../../components/common/table/types.d';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Employees = (): ReactElement => {
  const table = useRef<TableActions>(null);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    table.current?.setFilter(event.target.value);
  };

  return (
    <Box className={classes.root}>
      <StandardBeautifulContainer
        page={Page.employees}
        display={{ backButton: false }}
      >
        <Box mb={2}>
          <TextField
            label="Search"
            size="small"
            onChange={onSearch}
            InputProps={{ startAdornment: <SearchIcon /> }}
          />
        </Box>
        <EmployeeTable ref={table} />
      </StandardBeautifulContainer>
    </Box>
  );
};

export default Employees;
