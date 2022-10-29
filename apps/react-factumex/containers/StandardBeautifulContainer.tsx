import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React, { ComponentProps, ReactElement, ReactNode } from 'react';
import classes from './StandardBeautifulContainer.module.sass';
import logo from '../public/images/logo.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useNavigation, { Page } from '../hooks/use-navigation';

interface Props {
  children: ReactNode;
  page: Page;
  showBackButton?: boolean;
  display?: Partial<{
    logo: boolean;
    backButton: boolean;
  }>;
  imageBoxProps?: ComponentProps<typeof Box>;
}

const StandardBeautifulContainer = ({
  children,
  display,
  page,
  showBackButton = true,
  imageBoxProps = {},
}: Props): ReactElement => {
  const { withEvents: navigation, disabled: disabledNavigation } =
    useNavigation(page);

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        {showBackButton && (
          <Box>
            <Box>
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
            </Box>
          </Box>
        )}
        <Box {...imageBoxProps}>
          <Image
            {...logo}
            width={200}
            height={40}
            alt="logo"
            priority={false}
          />
        </Box>
      </Box>
      <Box className={classes.mainContainer}>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default StandardBeautifulContainer;
