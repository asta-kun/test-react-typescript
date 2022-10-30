import { Box, Grid } from '@mui/material';
import DragDropFiles from '../../../../../components/common/DragDropFiles';
import React, {
  ComponentProps,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';
import classes from './UploadPanel.module.sass';
import { useUpload } from '../hook';
import Preview from '../components/Preview';
import ImageGallery from '../components/Gallery';
import StandardButton from '../../../../../components/common/StandardButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useLoadingWithCallback } from '@factumex/core/hooks';

const UploadPanel = (): ReactElement => {
  const [loading, withLoading] = useLoadingWithCallback();
  const { files, addFiles, confirm } = useUpload();
  const onFiles: ComponentProps<typeof DragDropFiles>['onFiles'] = useCallback(
    (files: File[]) => {
      addFiles(files);
    },
    []
  );
  const fileList = useMemo(() => Object.values(files), [files]);

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={fileList.length > 0 ? 5 : 12}>
          <DragDropFiles
            onFiles={onFiles}
            accept={{ 'image/png': ['.png', '.jpg', '.jpeg'] }}
          />
          {fileList.length > 0 && (
            <Box mt={3}>
              <StandardButton
                fullWidth
                startIcon={<DoneAllIcon />}
                onClick={withLoading(confirm)}
                disabled={loading}
              >
                Confirm
              </StandardButton>
            </Box>
          )}
        </Grid>

        {fileList.length > 0 && (
          <Grid item xs={12} sm={7}>
            <Preview items={fileList} />
          </Grid>
        )}
      </Grid>

      <Box mt={5}>
        <ImageGallery items={fileList} disabled={loading} />
      </Box>
    </Box>
  );
};

export default UploadPanel;
