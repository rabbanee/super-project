/* eslint-disable react/jsx-props-no-spreading */
import 'tailwindcss/tailwind.css';
import '../styles/main.css';
import { Provider } from 'react-redux';
import { useStore } from '../redux/store';
import Alerts from '@modules/Alerts';

export default function MyApp({ Component, pageProps }) {
 
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Alerts />
    </Provider>
  );
}
