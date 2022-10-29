import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { ComponentType } from 'react';

const MainPageIndex = dynamic(
  () => import('../modules/index/index')
) as ComponentType<unknown>;

export default MainPageIndex;

// expose getServerSideProps (query)
export const getServerSideProps: GetServerSideProps = (
  appContext
): ReturnType<GetServerSideProps> => {
  return {
    props: { ...appContext.query },
  } as unknown as ReturnType<GetServerSideProps>;
};
