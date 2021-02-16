import { useState } from 'react';
import ApiSource from '@data/api-source';
import * as OutlineIcon from '@elements/icon/Outline';
import * as Button from '@elements/Button';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { roleNames } from '@data/roles';
import { convertRoleNameToRoleNumber } from '@utils/roles/convertRoleNameToRoleNumber';
import ListBox from '@modules/ListBox';
import { useDispatch } from "react-redux";
import { closeAlert, showAlert } from 'redux/actions';
import { thisPageFor } from '@utils/thisPageFor';
import { User } from '@interface/User';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import ContainerFooter from '@elements/container/Footer';

interface AddUser {
  user: User
}

const AddUser = ({ user }: AddUser) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(roleNames[0]);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: Function = useDispatch();

  const handleRegister = async (e) => {
    let response;
    e.preventDefault();
    setIsLoading(true);
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

    const role = convertRoleNameToRoleNumber(selectedRole);

    try {
      response = await ApiSource.register(name, email, role, password, passwordConfirmation);
    } catch (error) {
      dispatch(showAlert({
        title: 'Terjadi Kesalahan',
        description: error.response.data.message || 'Mohon coba kembali :)',
        type: 'error',
      })); 
      setIsLoading(false);
      return;
    }
    dispatch(showAlert({
      title: 'Berhasil menambahkan pengguna!',
      type: 'success',
    })); 
    
    setIsLoading(false);
  };

  return (
    <LayoutWithSidebar title="Tambahkan Pengguna" user={user}>
      <form onSubmit={handleRegister}>
        <Container>
          <ContainerBody>
            <h2 className="text-4xl font-bold	text-black mb-2">Tambahkan Pengguna</h2>
            <div className="grid grid-cols-6 gap-4 mt-2">
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" onChange={(e) => setName(e.target.value)} placeholder="Nama" />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email_address" id="email_address" autoComplete="email" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <ListBox items={roleNames} label="Rol" selectedItem={selectedRole} setSelectedItem={setSelectedRole}/>
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
          </ContainerBody>
          <ContainerFooter>
            <Button.Primary  
              className={`${isLoading && 'cursor-not-allowed'}`}
              disabled={isLoading}
            >
                {
                  isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 
                }
                {
                  isLoading ? 'Memproses' : 'Tambahkan'
                }
            </Button.Primary>
          </ContainerFooter>
        </Container>
      </form>
    </LayoutWithSidebar>
  )
};

export default AddUser;

export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    currentRole: user.role, 
    forRoles: [1],
    context
  });

  return {
    props: {
      user, 
    },
  };
});