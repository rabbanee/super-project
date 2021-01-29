import { useEffect, useState } from 'react';
import * as Alert from '../components/elements/Alert';
import ApiSource from '../data/api-source';
import * as Icon from '../components/elements/Icon';
import * as Button from '../components/elements/Button';
import { Listbox, Transition } from '@headlessui/react'
import LayoutWithSidebar from '../components/layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '../lib/withAuthServerSide';
import { isAdmin } from '../utils/roles/isAdmin';
import { redirectToHome } from '../utils/redirectToHome';
import { listRoleName } from '../data/listRoleName';
import { convertRoleNameToRoleNumber } from '../utils/roles/convertRoleNameToRoleNumber';

const AddUser = ({ user }: { user: object }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(listRoleName[0]);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({isShow: false, description: '', title: ''});
  const resetAlert = {isShow: false, description: '', title: ''};

  useEffect(() => {
    
  }, []);

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

    let role = convertRoleNameToRoleNumber(selectedRole);
    console.log(passwordConfirmation);

    try {
      response = await ApiSource.register(name, email, role, password, passwordConfirmation);
    } catch (error) {
      console.log(error.response);
      
      setAlert({...resetAlert, isShow: true, description: 'Please try again.'});
      setIsLoading(false);
      return;
    }
    // console.log(response.data);
    // router.replace('/');
    setIsLoading(false);
  }

  return (
   <LayoutWithSidebar title="Tambahkan Pengguna" user={user}>
      <form onSubmit={handleRegister}>
        <div className="shadow-md overflow-hidden rounded-xl container mx-auto">
          <div className="px-4 py-5 bg-white sm:p-6">
            <h2 className="text-4xl font-bold	text-black mb-2">Tambahkan Pengguna</h2>
            {
              alert.isShow && <Alert.danger description={alert.description}></Alert.danger>
            }
            <div className="grid grid-cols-6 gap-4 mt-2">
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" onChange={(e) => setName(e.target.value)}   placeholder="Nama" />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email_address" id="email_address" autoComplete="email" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <Listbox value={selectedRole} onChange={setSelectedRole}>
                  {({open}) => (
                    <>
                      <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
                        Role
                      </Listbox.Label>
                      <div className="relative">
                        <span className="inline-block w-full rounded-md shadow-md">
                          <Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-primary-dark focus:border-primary-dark transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            <span className="block truncate">{selectedRole}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path
                                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </Listbox.Button>
                        </span>
                        <Transition
                          show={open}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10"
                        >
                           <Listbox.Options
                              static
                              className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                           >
                            {listRoleName.map((role, i) => (
                              <Listbox.Option key={i} value={role}>
                                {({ selected, active }) => (
                                  <div
                                    className={`${
                                      active
                                        ? "text-white bg-primary-darkest"
                                        : "text-gray-900"
                                    } cursor-default select-none relative py-2 pl-8 pr-4`}
                                  >
                                    <span
                                      className={`${
                                        selected ? "font-semibold" : "font-normal"
                                      } block truncate`}
                                    >
                                      {role}
                                    </span>
                                    {selected && (
                                      <span
                                        className={`${
                                          active ? "text-white" : "text-primary-darkest"
                                        } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                      >
                                        <svg
                                          className="h-5 w-5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
             
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                <input type="password" name="password" id="password" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" onChange={(e) => setPassword(e.target.value)} placeholder="Kata Sandi" />
              </div>
              
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="password-confirmation" className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
                <input type="password" name="password-confirmation" id="password-confirmation" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Konfirmasi Kata Sandi" />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button.primary  
              className={`${isLoading && 'cursor-not-allowed'}`}
              disabled={isLoading}
              >
                {
                  isLoading && <Icon.loadingIndicatorButton /> 
                }
                {
                  isLoading ? 'Memproses' : 'Tambahkan'
                }
            </Button.primary>
          </div>
        </div>
      </form>
      {/* </div> */}
   </LayoutWithSidebar>
  );
};

export default AddUser;

export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: any)  {
  if (!isAdmin(user.role)) {
    redirectToHome(context);
  }

  return {
    props: {
      user, 
    }
  };
});