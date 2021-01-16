import 'tailwindcss/tailwind.css';
import "../styles/main.css";
import { Provider } from "react-redux";
import { useStore } from '../redux/store'
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  useEffect(()=> {
   document.querySelector('html').classList.add(localStorage.getItem('theme'));
  }, []);
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
};