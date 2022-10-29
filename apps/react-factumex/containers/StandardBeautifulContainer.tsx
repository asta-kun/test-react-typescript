import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React, { ComponentProps, ReactElement, ReactNode } from 'react';
import classes from './StandardBeautifulContainer.module.sass';
import logo from '../public/images/logo.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useNavigation, { Page } from '../hooks/use-navigation';
import { defaults } from 'lodash';

interface Props {
  children: ReactNode;
  page: Page;
  display?: Partial<{
    logo: boolean;
    backButton: boolean;
  }>;
  imageBoxProps?: ComponentProps<typeof Box>;
}

const StandardBeautifulContainer = ({
  children,
  display: rawDisplay,
  page,
  imageBoxProps = {},
}: Props): ReactElement => {
  const display = defaults(rawDisplay, { logo: true, backButton: true });
  const { withEvents: navigation, disabled: disabledNavigation } =
    useNavigation(page);

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Box>
          <Box>
            {display.backButton && (
              <Button
                variant="contained"
                color="secondary"
                disabled={disabledNavigation}
                startIcon={<ArrowBackIcon />}
                className={classes.backButton}
                onClick={navigation.back}
              >
                &nbsp;&nbsp;Back
              </Button>
            )}
          </Box>
        </Box>
        {display.logo && (
          <Box {...imageBoxProps}>
            <Image
              {...logo}
              width={200}
              height={40}
              alt="logo"
              priority={false}
            />
          </Box>
        )}
      </Box>
      <Box className={classes.mainContainer}>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default StandardBeautifulContainer;
