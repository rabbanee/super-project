import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar/>
      <Layout title="Home" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <p>hai</p>
     </Layout>
    </>
  );
}
