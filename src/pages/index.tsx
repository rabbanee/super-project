import { useEffect } from 'react';
import { withAuthServerSideProps } from '../lib/withAuthServerSide';
import LayoutWithSidebar from '../components/LayoutWithSidebar';

 function Home({ user }: {user: any}) {
  useEffect(() => {
    console.log(user);
    
  }, []);

  return (
    <LayoutWithSidebar title="Home" user={user}>
      <div className="bg-white p-6 md:px-7 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <div className="z-10 relative">
          <h2 className="text-5xl font-bold	text-black mb-2">Hola, {user.name}</h2>
          <p className="text-2xl">Welcome Back</p>
        </div>
        <div className="bg-hola bg-left w-80 h-52 bg-cover opacity-75 bg-no-repeat absolute top-0 right-0 md:w-96 md:h-56" aria-label="hola image"></div>
      </div>
      
      <div className="bg-white p-6 md:px-7 rounded-xl shadow-md relative overflow-hidden container mx-auto mt-5">
        <h2 className="text-3xl font-bold	text-black mb-2">News</h2>
        <div className="flex w-full bg-white lg:space-x-4 flex-col space-y-5 lg:space-y-0 lg:flex-row">
          <div className="bg-white shadow-lg w-full lg:w-80">
            <div className="bg-red-200 h-44 w-full">

            </div>
            <div className="p-4">
              <p className="text-sm flex space-x-1">
                <span className="text-blue-400 font-bold mr-1">NEWS</span> 
                <span className="mr-1">/</span>  
                <span>29 May 2020</span>
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2">The important of weekend</h3>
              <p>
                We know that all children 
              </p>
              <button className="px-4 py-2 bg-primary-light text-gray-50 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-primary">Read More</button>
            </div>
          </div>
          <div className="bg-white shadow-lg w-full lg:w-80">
            <div className="bg-red-200 h-44 w-full">

            </div>
            <div className="p-4">
              <p className="text-sm flex space-x-1">
                <span className="text-blue-400 font-bold mr-1">NEWS</span> 
                <span className="mr-1">/</span>  
                <span>29 May 2020</span>
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2">The important of weekend</h3>
              <p>
                We know that all children 
              </p>
              <button className="px-4 py-2 bg-primary-light text-gray-50 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-primary">Read More</button>
            </div>
          </div>
          <div className="bg-white shadow-lg w-full lg:w-80">
            <div className="bg-red-200 h-44 w-full">

            </div>
            <div className="p-4">
              <p className="text-sm flex space-x-1">
                <span className="text-blue-400 font-bold mr-1">NEWS</span> 
                <span className="mr-1">/</span>  
                <span>29 May 2020</span>
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2">The important of weekend</h3>
              <p>
                We know that all children 
              </p>
              <button className="px-4 py-2 bg-primary-light text-gray-50 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-primary">Read More</button>
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
