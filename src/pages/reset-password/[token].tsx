import Layout from "@layouts/Layout";
import { useRef, useState } from "react";
import * as Button from '@elements/Button';
import * as OutlineIcon from '@elements/icon/Outline';
import { useDispatch } from "react-redux";
import { closeAlert, showAlert } from "@actions/index";
import axios from "axios";
import { useRouter } from 'next/router';

const ResetPassword = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: Function = useDispatch();
  const formRef = useRef(null);
  const router = useRouter();

  const ResetPasswordHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = formRef.current
    const password = form['password'].value;
    const passwordConfirmation = form['password_confirmation'].value;
    dispatch(closeAlert());
    if (password !== passwordConfirmation) {
      dispatch(showAlert({
        title: 'Kata sandi harus sama dengan konfirmasi kata sandi',
        type: 'error',
      }));

      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      dispatch(showAlert({
        title: 'Kata sandi minimal 8 karakter',
        type: 'error',
      }));     
      setIsLoading(false);
      return;
    }
    let response;
    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}password/reset`, {
        email: user.email,
        token: user.token,
        password,
        password_confirmation: passwordConfirmation,
      });
    } catch (error) {
      console.log(error.response);
      
      dispatch(showAlert({
        title: 'Gagal mereset kata sandi',
        type: 'error',
      }));     
      setIsLoading(false);
      return;
    }
    
    dispatch(showAlert({
      title: 'Berhasil mereset kata sandi',
      type: 'success',
    }));     
    await router.replace('/');
    setIsLoading(false);
  }

  return (
    <Layout title="Reset Kata Sandi" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-28 w-auto" src="/images/icons/icon-512x512.png" alt={process.env.NEXT_PUBLIC_APP_NAME} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Reset Kata Sandi
          </h2>
        </div>
        <form className="space-y-1" onSubmit={ResetPasswordHandler}  ref={formRef}>
          <input type="hidden" name="remember" value="true"/>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">Password</label>
              <input id="password" name="password"  type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Password"/>
            </div>
           <span>
            <div>
              <label  className="sr-only">Konfirmasi Password</label>
              <input id="password_confirmation" name="password_confirmation" type="password"  required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Konfirmasi Password"/>
            </div>
           </span>
          </div>

          <div>
            <Button.Primary  
            className={`${isLoading && 'cursor-not-allowed'} group relative w-full flex justify-center`}
            disabled={isLoading}
            >
              {
                isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"  />
              }
              {
                isLoading ? 'Memproses' : 'Kirim Permintaan '
              }
            </Button.Primary>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
export async function getServerSideProps(context: any) {
  const { query } = context;
  let response;
  
  try {
    response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}password/find/${query.token}`);
  } catch (error) {
    return {
      // returns the default 404 page with a status code of 404
      notFound: true
    }
  }

  
  
  if (!response.data.error) {
    return {
      props: {
        user: response.data.reset_password_token,
      }
    };
  }

  return {
    notFound: true
  }
}
