import React, { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { IBlobEntity } from '../types.d';
import BlobImage from './BlobImage';
import { random } from 'lodash';
import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useUpload } from '..';

interface Props {
  items: IBlobEntity[];
  displayDeleteButton?: boolean;
  disabled?: boolean;
}

const ImageGallery = ({
  items,
  displayDeleteButton = true,
  disabled = false,
}: Props): ReactElement => {
  const { removeFiles } = useUpload();

  return (
    <Box sx={{}}>
      <Masonry columns={4} spacing={2}>
        {items.map((item) => (
          <Box
            key={item.id}
            mt={1}
            onClick={(): void => removeFiles([item.id])}
          >
            <BlobImage blob={item.blob} height={random(50, 150)} />
            {displayDeleteButton && (
              <Box mt={1}>
                <Button
                  color="secondary"
                  fullWidth
                  variant="contained"
                  size="small"
                  disabled={disabled}
                  disableElevation
                >
                  <DeleteForeverIcon />
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Masonry>
    </Box>
  );
};

export default ImageGallery;
