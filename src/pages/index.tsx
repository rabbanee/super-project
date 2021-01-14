import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import { withAuth } from '../hoc/withAuth';
import cookie from 'js-cookie';

 function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar/>
      <Layout title="Home" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <p>hai</p>
        <button className="py-3 px-3 bg-white ring-1 outline-none" onClick={() => router.push('/login')}>Go to login</button>
     </Layout>
    </>
  );
}

export default withAuth(Home);