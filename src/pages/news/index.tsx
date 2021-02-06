import { useEffect } from 'react';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';

 function News({ user }: {user: object}) {
  useEffect(() => {
    
  }, []);

  return (
    <LayoutWithSidebar title="Berita" user={user}>
      <div className="bg-white p-6 md:px-7 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <h2 className="text-4xl font-bold	text-black mb-2">Berita</h2>
        <div className="grid w-full bg-white grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-6">
          <div className="bg-white shadow-lg w-full rounded-t-lg rounded-b-lg">
            <div className="bg-red-200 h-44 w-full rounded-t-lg">

            </div>
            <div className="p-4">
              <p className="text-sm flex space-x-1">
                <span className="text-primary font-bold mr-1">BERITA</span> 
                <span className="mr-1">/</span>  
                <span>29 May 2020</span>
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">Pentingnya Liburan</h3>
              <p className="truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime officiis omnis asperiores eligendi beatae iure excepturi. Quis provident nisi deleniti alias? Ullam temporibus suscipit facere ut nam. Nam fuga quasi doloremque ducimus, et iste dicta dolorem ipsa, repudiandae quia ex distinctio blanditiis illum. Ipsa harum eveniet rerum pariatur ab? Alias?
              </p>
              <button className="px-3 py-1 bg-primary-light text-gray-50 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-white focus:ring-offset-2 hover:bg-primary-dark">Baca lebih banyak</button>
            </div>
          </div>
          <div className="bg-white shadow-lg w-full rounded-t-lg rounded-b-lg">
            <div className="bg-red-200 h-44 w-full rounded-t-lg">

            </div>
            <div className="p-4">
              <p className="text-sm flex space-x-1">
                <span className="text-primary font-bold mr-1">BERITA</span> 
                <span className="mr-1">/</span>  
                <span>29 May 2020</span>
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">Pentingnya Liburan</h3>
              <p className="truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime officiis omnis asperiores eligendi beatae iure excepturi. Quis provident nisi deleniti alias? Ullam temporibus suscipit facere ut nam. Nam fuga quasi doloremque ducimus, et iste dicta dolorem ipsa, repudiandae quia ex distinctio blanditiis illum. Ipsa harum eveniet rerum pariatur ab? Alias?
              </p>
              <button className="px-3 py-1 bg-primary-light text-gray-50 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-white focus:ring-offset-2 hover:bg-primary-dark">Baca lebih banyak</button>
            </div>
          </div>
          <div className="bg-white shadow-lg w-full rounded-t-lg rounded-b-lg">
            <div className="bg-red-200 h-44 w-full rounded-t-lg">

            </div>
            <div className="p-4">
              <p className="text-sm flex space-x-1">
                <span className="text-primary font-bold mr-1">BERITA</span> 
                <span className="mr-1">/</span>  
                <span>29 May 2020</span>
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">Pentingnya Liburan</h3>
              <p className="truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime officiis omnis asperiores eligendi beatae iure excepturi. Quis provident nisi deleniti alias? Ullam temporibus suscipit facere ut nam. Nam fuga quasi doloremque ducimus, et iste dicta dolorem ipsa, repudiandae quia ex distinctio blanditiis illum. Ipsa harum eveniet rerum pariatur ab? Alias?
              </p>
              <button className="px-3 py-1 bg-primary-light text-gray-50 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-white focus:ring-offset-2 hover:bg-primary-dark">Baca lebih banyak</button>
            </div>
          </div>
          <div className="bg-white shadow-lg w-full rounded-t-lg rounded-b-lg">
            <div className="bg-red-200 h-44 w-full rounded-t-lg">

            </div>
            <div className="p-4">
              <p className="text-sm flex space-x-1">
                <span className="text-primary font-bold mr-1">BERITA</span> 
                <span className="mr-1">/</span>  
                <span>29 May 2020</span>
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">Pentingnya Liburan</h3>
              <p className="truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime officiis omnis asperiores eligendi beatae iure excepturi. Quis provident nisi deleniti alias? Ullam temporibus suscipit facere ut nam. Nam fuga quasi doloremque ducimus, et iste dicta dolorem ipsa, repudiandae quia ex distinctio blanditiis illum. Ipsa harum eveniet rerum pariatur ab? Alias?
              </p>
              <button className="px-3 py-1 bg-primary-light text-gray-50 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-white focus:ring-offset-2 hover:bg-primary-dark">Baca lebih banyak</button>
            </div>
          </div>
          <div className="bg-white shadow-lg w-full rounded-t-lg rounded-b-lg">
            <div className="bg-red-200 h-44 w-full rounded-t-lg">

            </div>
            <div className="p-4">
              <p className="text-sm flex space-x-1">
                <span className="text-primary font-bold mr-1">BERITA</span> 
                <span className="mr-1">/</span>  
                <span>29 May 2020</span>
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">Pentingnya Liburan</h3>
              <p className="truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime officiis omnis asperiores eligendi beatae iure excepturi. Quis provident nisi deleniti alias? Ullam temporibus suscipit facere ut nam. Nam fuga quasi doloremque ducimus, et iste dicta dolorem ipsa, repudiandae quia ex distinctio blanditiis illum. Ipsa harum eveniet rerum pariatur ab? Alias?
              </p>
              <button className="px-3 py-1 bg-primary-light text-gray-50 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-white focus:ring-offset-2 hover:bg-primary-dark">Baca lebih banyak</button>
            </div>
          </div>
          <div className="bg-white shadow-lg w-full rounded-t-lg rounded-b-lg">
            <div className="bg-red-200 h-44 w-full rounded-t-lg">

            </div>
            <div className="p-4">
              <p className="text-sm flex space-x-1">
                <span className="text-primary font-bold mr-1">BERITA</span> 
                <span className="mr-1">/</span>  
                <span>29 May 2020</span>
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">Pentingnya Liburan</h3>
              <p className="truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime officiis omnis asperiores eligendi beatae iure excepturi. Quis provident nisi deleniti alias? Ullam temporibus suscipit facere ut nam. Nam fuga quasi doloremque ducimus, et iste dicta dolorem ipsa, repudiandae quia ex distinctio blanditiis illum. Ipsa harum eveniet rerum pariatur ab? Alias?
              </p>
              <button className="px-3 py-1 bg-primary-light text-gray-50 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-white focus:ring-offset-2 hover:bg-primary-dark">Baca lebih banyak</button>
            </div>
          </div>
        </div>
      </div>
    </LayoutWithSidebar>
  );
}

export default News;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: object)  {
  return {
    props: {
      user, 
    }
  };
});
