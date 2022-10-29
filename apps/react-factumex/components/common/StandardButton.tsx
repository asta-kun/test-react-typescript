import { useIsMounted } from '@factumex/core/hooks';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import clsx from 'clsx';
import React, { ForwardedRef, forwardRef, useState, MouseEvent } from 'react';
import classes from './StandardButton.module.sass';

const StandardButton = forwardRef(function StandardButton(
  { className, onClick, startIcon, disabled, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const isMounted = useIsMounted();
  const [loading, setLoading] = useState(false);

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>): void => {
    if (!onClick) return;

    setLoading(true);
    Promise.resolve(onClick(e))
      .catch(() => {
        // do nothing
      })
      .finally(() => {
        if (isMounted()) setLoading(false);
      });
  };

  return (
    <Button
      disableElevation
      variant="contained"
      className={clsx(classes.button, className)}
      startIcon={
        loading ? <CircularProgress size={20} color="inherit" /> : startIcon
      }
      onClick={handleOnClick}
      disabled={disabled || loading}
      {...props}
      ref={ref}
    />
  );
});

export default StandardButton;
