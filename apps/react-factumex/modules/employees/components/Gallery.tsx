import { Box } from '@mui/material';
import EmptyList from 'apps/react-factumex/components/common/EmptyList';
import { RootState } from 'apps/react-factumex/config/redux';
import { selectFiles } from 'apps/react-factumex/config/redux/store/files/slice';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import ImageGallery from '../upload/management/components/Gallery';

interface Props {
  onClose: () => void;
  employeeId: number;
}

const GalleryEmployee = ({ employeeId }: Props): ReactElement => {
  const files = useSelector((state: RootState) => {
    return Object.values(selectFiles(state)[employeeId] || {});
  });

  return (
    <Box width="700px" padding={5}>
      {(files.length > 0 && (
        <ImageGallery items={files} displayDeleteButton={false} />
      )) || <EmptyList />}
    </Box>
  );
};

export default GalleryEmployee;
