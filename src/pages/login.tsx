import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/Layout';
import * as Icon from '../components/elements/Icon';
import ApiSource from '../data/api-source';
import * as Button from '../components/elements/Button';
import * as Alert from '../components/elements/Alert';
import { useDispatch } from "react-redux";
import { login } from '../redux/actions';
import { withoutAuthServerSideProps } from '../lib/withoutAuthServerSide';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const Login: React.FC = () => {
  const [loading, setLoading]  = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch: Function = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // console.log(cookie.get('token'));
     
  }, []);

  const handleLogin = async (e : any) => {
    e.preventDefault();
    let response : any;
    setError(null);
    setLoading(true);
    try {
      response = await axios.post('http://localhost:3000/api/login', { email, password });
    } catch (error) {
      const { response } = error;
      if (response.data.error) {
        setError(response.data.message ?? 'Please try again');
      }
      setLoading(false);
      return;
    }
    router.replace('/');
    setLoading(false);
  }

  return (
    <Layout title="Login" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-28 w-auto" src="/images/icons/icon-512x512.png" alt="E-ZEEY"/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Login to your account
          </h2>
        </div>
        {
          error && <Alert.danger description={error}></Alert.danger>
        }
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true"/>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Email address"/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Password"/>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-primary-darkest focus:ring-primary-dark border-gray-300 rounded"/>
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900 dark:text-gray-50">
                Remember me
              </label>
            </div>

            <div className="text-sm">
             <Link href="/forgot-password">
                <a className="font-medium text-primary-darkest hover:text-primary">
                  Forgot your password?
                </a>
             </Link>
            </div>
          </div>

          <div>
            <Button.primary  
            className={`${loading && 'cursor-not-allowed'}`}
            disabled={loading}
            >
              {
                loading && <Icon.loadingIndicatorButton /> 
              }
              {
                loading ? 'Processing' : 'Login'
              }
            </Button.primary>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
export const getServerSideProps = withoutAuthServerSideProps();