import React, { ComponentProps, ReactElement, useState } from 'react';
import { useDynamicPortals } from '@factumex/core/decorators';
import Modal from '../containers/Modal';
import { useCallbackRef } from '@factumex/core/hooks';

interface Props<T> {
  Component: React.FC<T>;
  props: Omit<T, 'onClose'>;
  ModalProps?: Partial<ComponentProps<typeof Modal>>; // this can override the default props
}

interface Response {
  open: () => void;
  close: () => void;
}

const useModal = <T,>({
  Component,
  props,
  ModalProps = {},
}: Props<T>): Response => {
  const [open, setOpen] = useState(true);

  const handleOnClose = useCallbackRef(() => {
    setOpen(false);
  });

  const handleOpen = useCallbackRef(() => {
    setOpen(true);
  });

  useDynamicPortals(true, CustomModal, {
    open,
    onClose: handleOnClose,
    fullScreen: false,
    maxWidth: 'sm',
    titleBackground: '#1f88e5',
    titleColor: '#fff',
    padding: '0',
    ...ModalProps,
    CustomComponent: Component,
    CustomComponentProps: {
      onClose: handleOnClose,
      ...props,
    },
  });

  return {
    open: handleOpen,
    close: handleOnClose,
  };
};

export default useModal;

interface CustomModalProps extends ComponentProps<typeof Modal> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CustomComponent: React.FC<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CustomComponentProps: any;
  onClose: () => void;
}

function CustomModal({
  CustomComponent,
  CustomComponentProps = {},
  ...props
}: CustomModalProps): ReactElement {
  return (
    <Modal {...props}>
      <CustomComponent {...CustomComponentProps} />
    </Modal>
  );
}
