import React, { useState } from 'react';
import Layout from '@layouts/Layout';
import * as Icon from '@elements/Icon';
import * as Button from '@elements/Button';
import { withoutAuthServerSideProps } from '@lib/withoutAuthServerSide';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { closeAlert, showAlert } from '@actions/index';

const Login: React.FC = () => {
  const [loading, setLoading]  = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch: Function = useDispatch();

  const handleLogin = async (e : any) => {
    e.preventDefault();
    let response : any;
    dispatch(closeAlert());
    setLoading(true);
    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/login`, { email, password });
    } catch (error) {
      const { response } = error;
      if (response.data.error) {
        dispatch(showAlert({
          title: 'Terjadi Kesalahan',
          description: response.data.message || 'Mohon coba kembali :)',
          type: 'error'
        }));
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
            Masuk ke akun Anda
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true"/>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input id="email-address" name="email" onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Email"/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Kata Sandi</label>
              <input id="password" name="password" onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Kata Sandi"/>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-primary-darkest focus:ring-primary-dark border-gray-300 rounded"/>
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900 dark:text-gray-50">
                Ingat saya
              </label>
            </div>

            <div className="text-sm">
            <Link href="/forgot-password">
                <a className="font-medium text-primary-darkest hover:text-primary">
                  Lupa kata sandi?
                </a>
            </Link>
            </div>
          </div>

          <div>
            <Button.Primary  
            className={`${loading && 'cursor-not-allowed'}`}
            disabled={loading}
            >
              {
                loading && <Icon.loadingIndicatorButton /> 
              }
              {
                loading ? 'Memproses' : 'Masuk'
              }
            </Button.Primary>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
export const getServerSideProps = withoutAuthServerSideProps();