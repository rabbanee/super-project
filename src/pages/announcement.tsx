import { useEffect } from 'react';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { User } from '@interface/User';

interface AnnouncementProps {
  user: User
}

function Announcement({ user }: AnnouncementProps) {
  useEffect(() => {
    console.log(user);
    
  }, []);

  return (
    <LayoutWithSidebar title="Pengumuman" user={user}>
      <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <p>Hello Gaises</p>
      </div>
    </LayoutWithSidebar>
  );
}

export default Announcement;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});
