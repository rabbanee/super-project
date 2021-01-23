import { useEffect } from 'react';
import { withAuthServerSideProps } from '../lib/withAuthServerSide';
import LayoutWithSidebar from '../components/LayoutWithSidebar';

 function Announcement({ user }: {user: any}) {
  useEffect(() => {
    console.log(user);
    
  }, []);

  return (
    <LayoutWithSidebar title="Announcement" user={user}>
      <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <p>Hello Gaises</p>
      </div>
    </LayoutWithSidebar>
  );
}

export default Announcement;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: object)  {
  return {
    props: {
      user, 
    }
  };
});
