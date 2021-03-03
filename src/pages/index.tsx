import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { User } from '@interface/User';
import NewsCard from '@modules/NewsCard';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import NewsContainer from '@elements/container/News';
import { useEffect } from 'react';
import Cookies from 'cookies';
// import ApiSource from "../../data/api-source";
// import { SignatureCookieHelper } from "../../utils/auth/signature-cookie-helper";
import cookieSignature from 'cookie-signature';
import { CookieSignatureHelper } from '@utils/auth/cookie-signature-helper';
import ApiSource from '@data/api-source';
import { CookieHelper } from '@utils/auth/cookie-helper';
import findPermissionByName from '@utils/findPermissionByName';

interface HomeProps {
  user: User,
  permissions: any,
}

function Home({ user, permissions }: HomeProps) {

  useEffect(() => {
    console.log(permissions);
    
  }, [permissions]);

  return (
    <LayoutWithSidebar title="Beranda" user={user} permissions={permissions}>
      <div className="bg-white dark:bg-gray-700 p-6 md:px-7 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <div className="z-10 relative">
          <h2 className="text-5xl font-bold	text-black mb-2 dark:text-gray-100">Halo, {user.name}</h2>
          <p className="text-2xl dark:text-gray-100">Selamat Datang</p>
        </div>
        <div className="bg-hola bg-left w-80 h-52 bg-cover opacity-75 bg-no-repeat absolute top-0 right-0 md:w-96 md:h-56" aria-label="hola image"></div>
      </div>
      {
        findPermissionByName(permissions, 'view announcement') && (
          <Container className="mt-5">
            <ContainerBody className="rounded-b-xl">
              <h2 className="text-4xl font-bold	text-black mb-2 dark:text-gray-100">Pengumuman</h2>
              <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto">
                <table className="table table-borderless tab mt-2">
                  <tbody>
                    <tr>
                      <th className="w-1/4">Tanggal</th>
                      <th className="w-1/4">:</th>
                      <td>22 Januari 2021</td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Pengampu</th>
                      <th className="w-1/4">:</th>
                      <td>Siapa Saja</td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Mata Pelajaran</th>
                      <th className="w-1/4">:</th>
                      <td>Mekanika</td>
                    </tr>
                  </tbody>
                </table>
                <hr className="mt-2"/>
                <div className="mt-2">
                  dasdas 
                </div>
              </div>
            </ContainerBody>
          </Container>
        ) 
      }
      {
        findPermissionByName(permissions, 'view news') && (
          <Container className="mt-5">
            <ContainerBody className="rounded-b-xl">
              <h2 className="text-4xl font-bold	text-black mb-2 dark:text-gray-100">Berita</h2>
              <NewsContainer>
                <NewsCard date="29 May 2020" title="Pentingnya Liburan" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet pulvinar tellus. Aliquam diam lectus, vehicula a ultrices vel, aliquam nec orci. Nulla dignissim rhoncus turpis nec malesuada. Praesent euismod pulvinar mi, at mollis purus suscipit et. Nunc facilisis vulputate purus quis placerat. Fusce maximus, ex nec gravida pharetra, tellus leo dignissim tellus, eu dapibus lorem felis vitae tortor. Integer et molestie elit." />
                <NewsCard date="29 May 2020" title="Pentingnya Liburan" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet pulvinar tellus. Aliquam diam lectus, vehicula a ultrices vel, aliquam nec orci. Nulla dignissim rhoncus turpis nec malesuada. Praesent euismod pulvinar mi, at mollis purus suscipit et. Nunc facilisis vulputate purus quis placerat. Fusce maximus, ex nec gravida pharetra, tellus leo dignissim tellus, eu dapibus lorem felis vitae tortor. Integer et molestie elit." />
              </NewsContainer>
            </ContainerBody>
          </Container>
        ) 
      }
    </LayoutWithSidebar>
  );
}

export default Home;
export const getServerSideProps = withAuthServerSideProps(async function getServerSidePropsFunc(context: any, user: User, permissions: any)  {

  return {
    props: {
      user,
      permissions, 
    }
  };
});
