import dynamic from 'next/dynamic';
import withDefaultPageDecorator from '../decorators/withDefaultPage';
import { GetServerSideProps } from 'next';
import { ComponentType } from 'react';
import withDefaultDecorators from '../decorators/withDefault';
import { withDynamicPortals } from '@factumex/core/decorators';
import withSessionOnLogin from '../decorators/withSessionOnLogin';

const SignInPage = dynamic(
  () => import('../modules/login/index')
) as ComponentType<unknown>;

export default withDynamicPortals(
  withDefaultPageDecorator(
    withDefaultDecorators(withSessionOnLogin(SignInPage))
  )
);

// expose getServerSideProps (query)
export const getServerSideProps: GetServerSideProps = (
  appContext
): ReturnType<GetServerSideProps> => {
  return {
    props: { ...appContext.query },
  } as unknown as ReturnType<GetServerSideProps>;
};
