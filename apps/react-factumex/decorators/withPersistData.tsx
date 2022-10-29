import { useIsomorphicLayoutEffect } from '@factumex/core/hooks';
import { Box } from '@mui/material';
import React, { ComponentType, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get } from '../config/indexedDB/basic-store';
import { slices as persistedSlices } from '../config/redux/middlewares/persist-store';
import { useIsMounted } from '@factumex/core/hooks';
import useLoader from '../hooks/use-loader';
import ErrorComponent from '../containers/Error';

// restore indexedDB data
function withPersistedData<T>(Component: ComponentType<T>): ComponentType<T> {
  return function PersistedDataDecorator(props) {
    const isMounted = useIsMounted();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useLoader(loading);
    const dispatch = useDispatch();

    useIsomorphicLayoutEffect(function restoreData() {
      Promise.all(
        persistedSlices.map(async (item) => {
          const state = await get(item.key);

          if (!state) return; // does nothing if no data is found

          if (isMounted()) dispatch(item.slice.actions.reset(state));
        })
      )
        .catch((e) => {
          if (isMounted()) setError(true);
        })
        .finally(() => {
          if (isMounted()) setLoading(false);
        });
    }, []);

    if (error)
      return (
        <Box textAlign="center" pt={20}>
          <ErrorComponent
            code={500}
            description="Error restoring the local state (IndexedDB)."
          />
        </Box>
      );
    if (loading) return null;

    return <Component {...props} />;
  };
}

export default withPersistedData;
