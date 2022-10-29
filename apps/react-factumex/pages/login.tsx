import dynamic from 'next/dynamic';
import withDefaultPageDecorator from '../decorators/withDefaultPage';
import { GetServerSideProps } from 'next';
import { ComponentType } from 'react';
import withDefaultDecorators from '../decorators/withDefault';
import { withDynamicPortals } from '@factumex/core/decorators';

const SignInPage = dynamic(
  () => import('../modules/login/index')
) as ComponentType<unknown>;

export default withDynamicPortals(
  withDefaultPageDecorator(withDefaultDecorators(SignInPage))
);

// expose getServerSideProps (query)
export const getServerSideProps: GetServerSideProps = (
  appContext
): ReturnType<GetServerSideProps> => {
  return {
    props: { ...appContext.query },
  } as unknown as ReturnType<GetServerSideProps>;
};
