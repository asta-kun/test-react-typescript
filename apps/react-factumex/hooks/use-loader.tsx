import { Box, CircularProgress } from '@mui/material';
import Image from 'next/image';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useIsMounted } from '@factumex/core/hooks';
import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { PassiveUnmount } from '@factumex/core/components';
import clsx from 'clsx';
import { useDynamicPortals } from '@factumex/core/decorators';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    animation: 'fadeIn 1s ease-in-out',
    transition: 'opacity .5s ease-in-out',
    '&.fadeOut': {
      opacity: 0,
    },
  },
  background: {
    background: '#000000ab',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    borderRadius: 4,
    overflow: 'hidden',
    background: 'white',
    zIndex: 101,
    padding: '12px 7px 5px 7px',
  },
}));

interface Response {
  setState(state: boolean): void;
  loading: boolean;
  promise: <T>(callback: Promise<T>) => Promise<T>;
}

const useLoader = (state = false): Response => {
  const isMounted = useIsMounted();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(state);

  const Component = useCallback(
    (): ReactElement => (
      <PassiveUnmount mounted={loading} tolerance={500}>
        <Box
          className={clsx(classes.root, {
            fadeOut: !loading,
          })}
        >
          <Box className={classes.background}>
            <LinearProgress />
          </Box>
          <Box className={classes.image}>
            {/* <Image
              {...LoaderGif}
              alt="Loader"
              height={100}
              width={100}
              priority={false}
            /> */}
            <CircularProgress />
          </Box>
        </Box>
      </PassiveUnmount>
    ),
    []
  );

  const { mount, unmount } = useDynamicPortals(loading, Component, {});

  const setState = useCallback((state: boolean) => {
    setLoading(state);
  }, []);

  const promise = useCallback(<T,>(callback: Promise<T>): Promise<T> => {
    if (isMounted()) setState(true);
    return callback.finally(() => {
      if (isMounted()) setState(false);
    });
  }, []);

  // tracks state
  useEffect(() => {
    if (loading === state) return;

    setLoading(state);
  }, [state]);

  useEffect(() => {
    if (loading) {
      mount();
    } else {
      unmount();
    }
  }, [loading]);

  return {
    setState,
    loading,
    promise,
  };
};

export default useLoader;
