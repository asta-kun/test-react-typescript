import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { PassiveUnmount } from '@factumex/core/components';
import { Box, Dialog, DialogTitle } from '@mui/material';
import { blue } from '@mui/material/colors';

const useStyles = makeStyles(() => ({
  dialogRoot: {
    '& .MuiDialog-paperScrollPaper': {
      maxHeight: 'calc(100% - 25px)',
    },
    '&.fullHeight .MuiPaper-root': {
      height: '100%',
      maxHeight: 760,
    },
  },
  title: {
    textAlign: 'center',
    width: '100%',
    textTransform: 'uppercase',
    padding: '.75em 0 .5em 0',
    margin: 0,
    '& span': { fontSize: '.75em' },
  },
  closeButton: {
    position: 'absolute',
    color: '#004ecd',
  },
  dialogContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  headerContainer: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  closeIcon: {
    position: 'absolute',
    right: 5,
    top: 0,
  },
  content: {
    maxHeight: '96vh',
    overflowY: 'auto',
    width: '100%',
    position: 'relative',
  },
}));

interface Props {
  children?: ReactNode;
  open: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
  title?: string;
  fullScreen?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  keepMounted?: boolean;
  titleBackground?: string;
  titleColor?: string;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  overrideClass?: string;
  padding?: string;
  titleStyles?: CSSProperties;
}

const Modal = ({
  children,
  open,
  onClose,
  showCloseButton = true,
  title,
  fullScreen = true,
  fullWidth,
  fullHeight,
  titleBackground = `${blue[600]}`,
  titleColor = '#000',
  maxWidth,
  overrideClass,
  keepMounted = false,
  padding = '0 1em',
  titleStyles,
}: Props): ReactElement => {
  const classes = useStyles();

  return (
    <PassiveUnmount keepMounted={keepMounted} mounted={open}>
      <Dialog
        fullScreen={fullScreen}
        onClose={onClose}
        open={open}
        onBackdropClick={onClose}
        keepMounted={keepMounted}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        className={clsx(classes.dialogRoot, overrideClass, {
          fullHeight,
        })}
      >
        <Box className={clsx(classes.dialogContainer)} style={{ padding }}>
          {!isEmpty(title) && (
            <Box
              className={classes.headerContainer}
              style={{ background: titleBackground, color: titleColor }}
            >
              <DialogTitle className={classes.title}>
                <span style={titleStyles}>{title}</span>
              </DialogTitle>
            </Box>
          )}
          <Box className={classes.content}>{children}</Box>
        </Box>
      </Dialog>
    </PassiveUnmount>
  );
};

export default Modal;
