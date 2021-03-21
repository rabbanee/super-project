/* eslint-disable react/jsx-props-no-spreading */
import '../styles/main.css';
import '../styles/ck-content.css';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
import Alerts from '@modules/Alerts';

interface MyAppProps {
  Component: React.FC,
  pageProps: any
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Alerts />
    </Provider>
  );
}
