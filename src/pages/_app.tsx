/* eslint-disable react/jsx-props-no-spreading */
import 'tailwindcss/tailwind.css';
import '../styles/main.css';
// import { Provider } from 'react-redux';
import { useEffect } from 'react';
// import { useStore } from '../redux/store';
import { RecoilRoot } from 'recoil';
import Alerts from '@modules/Alerts';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // document.querySelector('html').classList.add(localStorage.getItem('theme'));
  }, []);
  // const store = useStore(pageProps.initialReduxState);
  return (
    // <Provider store={store}>
    //   <Component {...pageProps} />
    // </Provider>
    <RecoilRoot>
      <Alerts />
      <Component {...pageProps} />
    </RecoilRoot>

  );
}
