import { useEffect } from 'react';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';

 function Pengumuman({ user }: {user: object}) {
  useEffect(() => {
    console.log(user);
    
  }, []);

  return (git 
    <LayoutWithSidebar title="Pengumuman" user={user}>
      <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <p>Hello Gaises</p>
      </div>
    </LayoutWithSidebar>
  );
}

export default Pengumuman;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: object)  {
  return {
    props: {
      user, 
    }
  };
});
