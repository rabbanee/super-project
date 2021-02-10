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
       <table className="table table-borderless tab">
         <tbody>
         <tr>
           <th>Tanggal</th>
           <th>:</th>
         </tr>
         <tr>
           <th>Pengampu</th>
           <th>:</th>
         </tr>
         <tr>
           <th>Mata Pelajaran</th>
           <th>:</th>
         </tr>
         </tbody>
       </table>
       <hr className="height:2px;border-width:0;color:black;background-color:black"></hr>
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
