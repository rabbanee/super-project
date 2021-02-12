import React from 'react';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';

interface ManageLearningMaterialsProps {
  user: User
}


    function ManageLearningMaterials({ user }:ManageLearningMaterialsProps) {   
  return (
    <LayoutWithSidebar title="Managelearningmaterials" user={user}>
    <form>
      <div className="shadow-md overflow-hidden rounded-xl container mx-auto">
        <div className="px-4 py-5 bg-white sm:p-6">
          <h2 className="text-4xl font-bold	text-black mb-2">Tambahkan Pengguna</h2>
          <div className="grid grid-cols-6 gap-4 mt-2">
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
              <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Nama" />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email_address" id="email_address" autoComplete="email" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm"placeholder="Email" />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Kata Sandi</label>
              <input type="password" name="password" id="password" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm"placeholder="Kata Sandi" />
            </div>
            
            <div className="col-span-6 sm:col-span-6">
              <label htmlFor="password-confirmation" className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
              <input type="password" name="password-confirmation" id="password-confirmation" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Konfirmasi Kata Sandi" />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
         
        </div>
      </div>
    </form>
  </LayoutWithSidebar>
  );
};

export default ManageLearningMaterials;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
    return {
      props: {
        user, 
      }
    };
  });