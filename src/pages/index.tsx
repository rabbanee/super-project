import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import { withAuth } from '../hoc/withAuth';
import cookie from 'js-cookie';
import { useDispatch } from "react-redux";
import { getUser } from '../redux/actions';
import { useEffect } from 'react';
import { withAuthComponent } from '../lib/withAuthComponent';
import { withAuthServerSideProps } from '../lib/withAuthServerSide';

 function Home({ user   }: {user: any}) {
  const router = useRouter();
  const tokenFromCookie =  cookie.get('token');

  useEffect(() => {
    
  }, []);

  return (
    <>
      <Sidebar/>
      <Layout title="Home" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <p>hai</p>
        <button className="py-3 px-3 bg-white ring-1 outline-none" onClick={() => router.push('/login')}>Go to login</button>
     </Layout>
    </>
  );
}

export default withAuthComponent(Home);
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(props)  {
  return {props: null};
});
