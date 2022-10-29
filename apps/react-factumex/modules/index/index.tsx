import withDefaultPageDecorator from '../../decorators/withDefaultPage';
import { withDynamicPortals } from '@factumex/core/decorators';
import withDefaultDecorators from '../../decorators/withDefault';
import useLoader from '../../hooks/use-loader';
import { useSelector } from 'react-redux';
import { selectAuth } from './../../config/redux/store/auth/slice';
import useNavigation, { Page } from '../../hooks/use-navigation';
import { useIsomorphicLayoutEffect } from '@factumex/core/hooks';

export function MainPageIndex(): null {
  const { token } = useSelector(selectAuth);
  const {
    withEvents: { login, employees },
  } = useNavigation(Page.main);

  useIsomorphicLayoutEffect(
    function redirect() {
      // this will be so fast, a delay to see an "effect"...

      const timeout = setTimeout(() => {
        if (token) {
          employees();
        } else {
          login();
        }
      }, 2_000);

      return () => clearTimeout(timeout);
    },
    [token]
  );

  useLoader(true);
  return null;
}

export default withDynamicPortals(
  withDefaultPageDecorator(withDefaultDecorators(MainPageIndex))
);
