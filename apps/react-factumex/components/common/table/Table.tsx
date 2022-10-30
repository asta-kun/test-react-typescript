import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Box,
} from '@mui/material';
import usePagination from '../../../hooks/use-pagination';
import { startCase, toString } from 'lodash';
import React, { Fragment, ReactElement } from 'react';
import EmptyList from '../EmptyList';
import { defaultTransformation } from './transformations';
import { TableProps } from './types.d';

const GenericTable = <T,>({
  items,
  primaryKey,
  displayColumns,
  renderRowField = {},
  extraFields = {},
}: TableProps<T>): ReactElement => {
  const { results, pages, setPage } = usePagination({
    pageSize: 10,
    items,
    defaultPage: 1,
  });
  if (!results.length) return <EmptyList />;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {displayColumns.map((column) => (
                <TableCell key={column}>{startCase(column)}</TableCell>
              ))}
              {Object.keys(extraFields).map((column) => (
                <TableCell key={column}>{startCase(column)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((item) => (
              <Fragment key={toString(item[primaryKey] as unknown)}>
                <TableRow>
                  {displayColumns.map((column) => {
                    const parser =
                      renderRowField[column] ?? defaultTransformation;

                    return (
                      <TableCell key={column}>{parser(item[column])}</TableCell>
                    );
                  })}
                  {Object.keys(extraFields).map((column) => {
                    const Actions = (
                      extraFields[column] as (data: T) => React.FC
                    )(item);
                    return (
                      <TableCell key={column}>
                        <Actions />
                      </TableCell>
                    );
                  })}
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box textAlign="center" mt={3} mb={3} pl="30%">
        <Pagination
          count={pages}
          color="primary"
          variant="outlined"
          shape="rounded"
          onChange={(e, page): void => {
            setPage(page);
          }}
        />
      </Box>
    </Box>
  );
};

export default GenericTable;
