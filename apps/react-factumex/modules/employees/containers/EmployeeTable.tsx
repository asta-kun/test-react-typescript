import { Box, CircularProgress, Grid, IconButton } from '@mui/material';
import GenericTable from '../../..//components/common/table/Table';
import { useGetEmployeesQuery } from '../../../config/redux/api/services/employees/service';
import { IEmployee } from '../../../config/redux/api/services/employees/types';
import { DateTime } from 'luxon';
import React, {
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useMemo,
  useState,
  useTransition,
} from 'react';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { TableActions } from '../../../components/common/table/types';
import { useRouter } from 'next/router';
import useModal from '../../../hooks/use-modal';
import Gallery from '../components/Gallery';

const EmployeeTable = forwardRef<TableActions>(function Table(
  props,
  ref
): ReactElement {
  const { data, isFetching } = useGetEmployeesQuery({});
  const [filter, setFilter] = useState('');
  const { 1: startTransition } = useTransition();

  const items = useMemo(() => {
    if (!data) return [];

    if (!filter) return data.raw;

    return data.raw.filter((item) => {
      const name = `${item.id}${item.name}${item.last_name}`.toLowerCase();
      return name.includes(filter.toLowerCase());
    });
  }, [data, filter]);

  useImperativeHandle(ref, () => ({
    setFilter: (newFilter): void => {
      startTransition(() => {
        setFilter(newFilter || '');
      });
    },
  }));

  if (!data || isFetching)
    return (
      <Box textAlign="center" padding="20px">
        <CircularProgress />
      </Box>
    );

  // render
  return (
    <GenericTable
      items={items}
      primaryKey="id"
      extraFields={{ actions: GetActions }}
      displayColumns={['id', 'name', 'last_name', 'birthday']}
      renderRowField={{
        birthday: (value: number) =>
          DateTime.fromMillis(value).toLocaleString(),
      }}
    />
  );
});

export default EmployeeTable;

interface ActionsProps {
  data: IEmployee;
}
function GetActions({ data }: ActionsProps): ReactElement {
  const router = useRouter();
  const goToUploadSection = (): void => {
    router.push(`/employees/${data.id}/upload`);
  };

  const { open } = useModal({
    Component: Gallery,
    props: {
      employeeId: data.id,
    },
    ModalProps: { title: 'Gallery for employee #' + data.id, maxWidth: 'md' },
  });

  return (
    <Box>
      <Grid container>
        <Grid item>
          <IconButton onClick={goToUploadSection}>
            <FileUploadIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={open}>
            <PhotoLibraryIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
