import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { withoutAuth } from '../hoc/withoutAuth';
import * as Alert from '../components/Alert';
import ApiSource from '../data/api-source';
import * as Icon from '../components/Icon';
import * as Button from '../components/Button';
import { login } from '../redux/actions';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const[alert, setAlert] = useState({isShow: false, description: '', title: ''});
  const resetAlert = {isShow: false, description: '', title: ''};
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    let response;
    e.preventDefault();
    setIsLoading(true);
    setAlert({...resetAlert});

    if (password !== passwordConfirmation) {
      setAlert({...resetAlert, isShow: true, description: 'Password must be equal with password confirmation.'});
      setIsLoading(false);
      return;
    }
    
    if (password.length < 8) {
      setAlert({...resetAlert, isShow: true, description: 'Password must be at least 8 characters.'});
      setIsLoading(false);
      return;
    }

    try {
      response = await ApiSource.register(name, email, password);
    } catch (error) {
      setAlert({...resetAlert, isShow: true, description: 'Please try again.'});
      return;
    }
    console.log(response);
    await dispatch(login(response.data.success.token));
    router.replace('/');
    setIsLoading(false);
  }

  return (
      <Layout title="Register" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-28 w-auto" src="/images/icons/icon-512x512.png" alt="E-ZEEY"/>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Register
          </h2>
        </div>
        {
          alert.isShow && <Alert.danger description={alert.description}></Alert.danger>
        }
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <input type="hidden" name="remember" value="true"/>
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" name="name" type="text" onChange={(e) => setName(e.target.value)}  autoComplete="name" required className="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Name"/>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Email address"/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)}  autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Password"/>
            </div>
            <div>
              <label htmlFor="password-confirmation" className="sr-only">Password Confirmation</label>
              <input id="password-confirmation" name="password-confirmation" type="password" onChange={(e) => setPasswordConfirmation(e.target.value)}  autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Password Confirmation"/>
            </div>
          </div>


          <div>
           <Button.primary  
            className={`${isLoading && 'cursor-not-allowed'}`}
            disabled={isLoading}
            >
              {
                isLoading && <Icon.loadingIndicatorButton /> 
              }
              {
                isLoading ? 'Processing' : 'Register'
              }
            </Button.primary>
          </div>
        </form>
        <div className="bg-white px-0 py-3 text-center border border-gray-300 rounded-md">
          Already have an account? <Link href="/login"><a className="text-primary-darkest hover:text-primary font-medium">Login</a></Link>
        </div>
      </div>
      </Layout>
  );
};

export default withoutAuth(Register);