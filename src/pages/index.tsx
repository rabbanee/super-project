import { useEffect } from 'react';
import { withAuthServerSideProps } from '../lib/withAuthServerSide';
import LayoutWithSidebar from '../components/LayoutWithSidebar';

 function Home({ user }: {user: any}) {
  useEffect(() => {
    console.log(user);
    
  }, []);

  return (
    <LayoutWithSidebar title="Home" user={user}>
      <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <div className="z-10 relative">
          <h2 className="text-5xl font-bold	text-black mb-2">Hola, {user.name}</h2>
          <p className="text-2xl">Welcome Back</p>
        </div>
        <div className="bg-hola bg-left w-80 h-52 bg-cover opacity-75 bg-no-repeat absolute top-0 right-0 md:w-96 md:h-56" aria-label="hola image"></div>
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
