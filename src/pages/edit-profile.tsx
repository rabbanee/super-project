import { useRef, useState } from 'react';
import * as OutlineIcon from '@elements/icon/Outline';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { User } from '@interface/User';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import ContainerFooter from '@elements/container/Footer';
import * as Button from '@elements/Button';
import axios from 'axios';
import ApiSource from '@data/api-source';
import Cookies from 'js-cookie';
import usePermissions from '@lib/usePermissions';
import { useDispatch, useSelector } from 'react-redux';
import WithAuth from '@lib/WithAuth';
import { setUser, showAlert } from '@actions/index';

interface EditProfileProps {
  user: User,
  permissions: any,
}

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const tokenFromCookie = Cookies.get('token');
  const checkPermissions = usePermissions({
    permissionName: 'edit profile',
  });
  const dispatch: Function = useDispatch();

  const imageHandler = (event: any) => setImage(URL.createObjectURL(event.target.files[0]));

  const editHandler = async (e: any) => {
    const fd = new FormData();
    e.preventDefault();
    setIsLoading(true);
    const form = formRef.current
    let response = null;
    if (image) {
      fd.append('image', form['file-upload'].files[0]);
    }
    fd.append('email', form['email_address'].value);
    fd.append('name', form['name'].value);
    fd.append('_method', 'put');
    console.log(form['file-upload'].files[0]);
    
    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}users`, fd, {
        headers: {
          'Authorization': `Bearer ${tokenFromCookie}`,
        }
      });
    } catch (error) {
      console.log(error.response.data);
    }
    const imageId = response.data.user.image_id;
    delete response.data.user.image_id;
    const user: User = {
      ...response.data.user,
      imageId,
    };
    dispatch(setUser(user))
    dispatch(showAlert({
      title: 'Berhasil merubah pengguna!',
      type: 'success',
    })); 
    setIsLoading(false);
  };

  return (
   <LayoutWithSidebar title="Edit Profile" user={user} permissions={permissions.list}>
      {/* <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto"> */}
      <form onSubmit={editHandler} ref={formRef}>
        <Container>
          <ContainerBody>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Nama" defaultValue={user.name} />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email_address" id="email_address" autoComplete="email" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Email" defaultValue={user.email} />
              </div>
              
              <div className="col-span-6 sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Foto
                </label>
                <div className="mt-2 flex items-center">
                  {
                    image ? 
                    <span className="inline-block h-14 w-14 overflow-hidden rounded-full">
                      <img src={image} alt="User"  />
                    </span>  :  
                    <span className="inline-block h-14 w-14 overflow-hidden rounded-full">
                      <img src={`${process.env.NEXT_PUBLIC_API_HOST}images/${user.imageId}`} alt="User"  />
                    </span> 
                  }
                   <div className="flex text-sm text-gray-600 ml-2">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-darkest focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-dark">
                      <span>Ganti</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={imageHandler}/>
                    </label>
                  </div>
                  {/* <button type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Change
                  </button> */}
                </div>
              </div>

            </div>
          </ContainerBody>
          <ContainerFooter className="justify-end flex">
            <Button.Primary  
              className={`${isLoading && 'cursor-not-allowed'} group relative flex justify-center`}
              disabled={isLoading}
            >
                {
                  isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 
                }
                {
                  isLoading ? 'Memproses' : 'Ubah'
                }
            </Button.Primary>
          </ContainerFooter>
        </Container>
      </form>
      {/* </div> */}
   </LayoutWithSidebar>
  );
};

export default WithAuth(EditProfile);
// export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any) {
//   checkPermissions({
//     context,
//     permissions,
//     permissionName: 'edit profile',
//   });

//   return {
//     props: {
//       user, 
//       permissions,
//     }
//   };
// });