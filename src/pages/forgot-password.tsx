import Layout from "@layouts/Layout";
import { useState } from "react";
import * as Button from '@elements/Button';
import * as Icon from '@elements/icon';

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const forgotPasswordHandler = () => {

  }

  return (
    <Layout title="Lupa Kata Sandi" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-28 w-auto" src="/images/icons/icon-512x512.png" alt={process.env.NEXT_PUBLIC_APP_NAME} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Lupa Kata Sandi
          </h2>
        </div>
        <form className="space-y-1" onSubmit={forgotPasswordHandler}>
          <input type="hidden" name="remember" value="true"/>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input id="email-address" name="email" onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Email"/>
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
                loading ? 'Memproses' : 'Kirim Permintaan '
              }
            </Button.Primary>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;