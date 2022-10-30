import React, { ReactElement, useCallback } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px dashed gray`,
    padding: '30px 40px',
    borderRadius: 4,
    transition: 'all .5s ease',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover, &.active': {
      borderColor: '#1976d2',
      transform: 'scale(1.025)',
    },
    '&.disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      opacity: 0.35,
    },
  },
  icon: {
    marginBottom: 10,
  },
  description: {
    '& .action': {
      color: '#1976d2',
    },
  },
}));

interface Props {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
  accept?: DropzoneOptions['accept'];
  multiple?: boolean;
}

const DragDropFiles = ({
  onFiles,
  multiple = true,
  disabled = false,
  accept,
}: Props): ReactElement => {
  const classes = useStyles();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFiles(acceptedFiles);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return (
    <div
      {...getRootProps({
        className: clsx(classes.root, {
          disabled,
          active: isDragActive,
        }),
      })}
    >
      <input {...getInputProps()} />

      <div className={classes.icon}>
        <CloudUploadIcon />
      </div>
      <div className={classes.description}>
        Drag &amp; Drop your files here, or{' '}
        <span className="action">browse</span>
      </div>
    </div>
  );
};

export default DragDropFiles;
