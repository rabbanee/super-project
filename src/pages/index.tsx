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
      
      <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <div className="z-10 relative">
          <div className="dash-item skwp-column skwp-column-1">
            <div className="dash-item skwp-column skwp-column-1">
             <h1 className="text-3xl font-bold	text-black mb-2">News</h1>
            </div>
             <div className="bg-white p-6 shadow-md relative overflow-hidden container mx-auto">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea nemo quasi quod dignissimos officiis vel facere magnam perferendis, recusandae quas quaerat expedita. Nisi sequi vel ut asperiores, adipisci praesentium ratione.
             </div>
             <div className="bg-blue p-6 shadow-md relative overflow-hidden container mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat provident hic esse sit delectus voluptatem placeat laboriosam doloribus harum molestias officia, nihil mollitia dignissimos omnis quidem libero voluptatum, modi eum.
             </div>
             <div className="bg-yellow p-6 shadow-md relative overflow-hidden container mx-auto">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia ipsam aliquid et consectetur quis aliquam eveniet facere placeat, quo obcaecati quasi nobis ipsa vero tenetur architecto enim molestias saepe in. 
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
