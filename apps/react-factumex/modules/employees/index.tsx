import { Box } from '@mui/system';
import React, { ReactElement, useRef } from 'react';
import classes from './index.module.sass';
import StandardBeautifulContainer from '../../containers/StandardBeautifulContainer';
import { Page } from '../../hooks/use-navigation';
import EmployeeTable from './containers/EmployeeTable';
import { TableActions } from './../../components/common/table/types.d';
import { Grid, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StandardButton from '../../components/common/StandardButton';
import AddIcon from '@mui/icons-material/Add';
import { useLoadingWithCallback } from '@factumex/core/hooks';
import useAddEmployee from './hooks/use-add-employee';

const Employees = (): ReactElement => {
  const table = useRef<TableActions>(null);
  const { helper } = useAddEmployee();
  const [loading, withLoading] = useLoadingWithCallback();

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
          <Grid container justifyContent="space-between">
            <Grid item>
              <TextField
                label="Search"
                size="small"
                onChange={onSearch}
                InputProps={{ startAdornment: <SearchIcon /> }}
              />
            </Grid>
            <Grid item>
              <StandardButton
                color="primary"
                startIcon={<AddIcon />}
                variant="contained"
                disableElevation
                onClick={withLoading(helper)}
                disabled={loading}
              >
                Add Employee
              </StandardButton>
            </Grid>
          </Grid>
        </Box>

        <EmployeeTable ref={table} />
      </StandardBeautifulContainer>
    </Box>
  );
};

export default Employees;
