import { useCallbackRef } from '@factumex/core/hooks';
import useModal from '../../../hooks/use-modal';
import EmployeeForm from '../components/EmployeeForm';

interface Response {
  helper: () => void;
}

const useAddEmployee = (): Response => {
  const { open } = useModal({
    Component: EmployeeForm,
    props: {},
    ModalProps: { title: 'Add Employee' },
  });
  const helper = useCallbackRef(() => {
    open();
  });
  return { helper };
};

export default useAddEmployee;
