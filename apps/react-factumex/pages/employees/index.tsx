import dynamic from 'next/dynamic';
import withDefaultPageDecorator from '../../decorators/withDefaultPage';
import { GetServerSideProps } from 'next';
import { ComponentType } from 'react';
import withDefaultDecorators from '../../decorators/withDefault';
import { withDynamicPortals } from '@factumex/core/decorators';
import withProtected from '../../decorators/withProtected';

const EmployeesPage = dynamic(
  () => import('../../modules/employees/index')
) as ComponentType<unknown>;

export default withDynamicPortals(
  withDefaultPageDecorator(withDefaultDecorators(withProtected(EmployeesPage)))
);

// expose getServerSideProps (query)
export const getServerSideProps: GetServerSideProps = (
  appContext
): ReturnType<GetServerSideProps> => {
  return {
    props: { ...appContext.query },
  } as unknown as ReturnType<GetServerSideProps>;
};
