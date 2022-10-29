import { Box, Button, ButtonProps, Grid } from '@mui/material';
import clsx from 'clsx';
import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
} from 'react';
import classes from './BeautifulButton.module.sass';

interface Props extends ButtonProps {
  text: string;
  description: string;
  icon: ReactNode;
}

const BeautifulButton = forwardRef(function BeautifulButton(
  { text, description, icon, ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  return (
    <Button
      {...props}
      className={clsx(classes.root, props.className)}
      variant={props.variant ?? 'contained'}
      color={props.color ?? 'inherit'}
      ref={ref}
    >
      <Grid container direction="column">
        <Grid item>
          <Box className={clsx(classes.icon, 'icon')}>{icon}</Box>
        </Grid>
        <Grid item>
          <Box className={clsx(classes.text, 'text')}>{text}</Box>
        </Grid>
        <Grid item>
          <Box className={clsx(classes.description, 'description')}>
            {description}
          </Box>
        </Grid>
      </Grid>
    </Button>
  );
});

export default BeautifulButton;
