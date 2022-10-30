import { withoutSSR } from '@factumex/core/decorators';
import { Box } from '@mui/material';
import React, { ReactElement, useEffect, useMemo } from 'react';

interface Props {
  blob: Blob;
  height?: number;
}

const BlobImage = withoutSSR(({ blob, height = 225 }: Props): ReactElement => {
  console.log('blob:', blob);
  const URL = useMemo(() => {
    return !(blob instanceof Blob) ? null : window.URL.createObjectURL(blob);
  }, [blob]);

  useEffect(() => {
    return () => {
      if (URL) {
        window.URL.revokeObjectURL(URL);
      }
    };
  }, [blob]);

  return (
    <Box
      style={{
        height,
        background: `url(${URL}) no-repeat center center`,
        backgroundSize: 'cover',
        overflow: 'hidden',
      }}
    ></Box>
  );
});

export default BlobImage;
