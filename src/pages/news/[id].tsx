import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';

interface ReadNewsProps {
  user: User,
  permissions: any,
}

function ReadNews() {
   const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  return (
    <LayoutWithSidebar title="Berita" user={user} permissions={permissions.list}>
      <div className="bg-white p-6 md:px-7 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <h2 className="text-4xl font-bold	text-black mb-2">Definition of Cooperative Learning Type Jigsaw </h2>
        <div className="date-excerpt single skwp-news-meta">
          <span className="thedate">29</span>
          <span className="month">May</span>
          <span className="year">2020</span>
          </div>
      </div>
    </LayoutWithSidebar>  
    );
  };

  
  export default WithAuth(ReadNews);
  // export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  //   checkPermissions({
  //     context,
  //     permissions,
  //     permissionName: 'view news',
  //   });
  //   return {
  //     props: {
  //       user, 
  //       permissions,
  //     }
  //   };
  // });
