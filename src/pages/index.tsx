import { useEffect } from 'react';
import { withAuthServerSideProps } from '../lib/withAuthServerSide';
import LayoutWithSidebar from '../components/layouts/LayoutWithSidebar';

 function Home({ user }: {user: any}) {
  useEffect(() => {
    
  }, []);

  return (
    <LayoutWithSidebar title="Beranda" user={user}>
      <div className="bg-white p-6 md:px-7 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <div className="z-10 relative">
          <h2 className="text-5xl font-bold	text-black mb-2">Halo, {user.name}</h2>
          <p className="text-2xl">Selamat Datang</p>
        </div>
        <div className="bg-hola bg-left w-80 h-52 bg-cover opacity-75 bg-no-repeat absolute top-0 right-0 md:w-96 md:h-56" aria-label="hola image"></div>
      </div>
      
      <div className="bg-white p-6 md:px-7 rounded-xl shadow-md relative overflow-hidden container mx-auto mt-5">
        <h2 className="text-4xl font-bold	text-black mb-2">Berita</h2>
        <div className="flex w-full bg-white lg:space-x-4 flex-col space-y-5 lg:space-y-0 lg:flex-row">
          <div className="bg-white shadow-lg w-full rounded-t-lg rounded-b-lg lg:w-72">
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

export default Home;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: object)  {
  
  return {
    props: {
      user, 
    }
  };
});
