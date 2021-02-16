import { useState } from 'react';
import * as SolidIcon from '@elements/icon/Solid';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { User } from '@interface/User';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import ContainerFooter from '@elements/container/Footer';

interface EditProfileProps {
  user: User
}

const EditProfile = ({ user }: EditProfileProps) => {
  const [image, setImage] = useState(null);

  const imageHandler = (event: any) => setImage(URL.createObjectURL(event.target.files[0]));

  const editHandler = (e: any) => {
    e.preventDefault();
  };

  return (
   <LayoutWithSidebar title="Edit Profile" user={user}>
      {/* <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto"> */}
      <form onSubmit={editHandler}>
        <Container>
          <ContainerBody>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Nama" defaultValue={user.name}/>
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
                    <span className="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100">
                      <SolidIcon.UserCircle className="h-full w-full text-gray-300" />
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
          <ContainerFooter>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-darkest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Simpan
            </button>
          </ContainerFooter>
        </Container>
      </form>
      {/* </div> */}
   </LayoutWithSidebar>
  );
};

export default EditProfile;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});