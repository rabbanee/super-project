import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { User } from '@interface/User';
import NewsCard from '@modules/NewsCard';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import NewsContainer from '@elements/container/News';

interface HomeProps {
  user: User,
}

function Home({ user }: HomeProps) {
  return (
    <LayoutWithSidebar title="Beranda" user={user}>
      <div className="bg-white dark:bg-gray-700 p-6 md:px-7 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <div className="z-10 relative">
          <h2 className="text-5xl font-bold	text-black mb-2 dark:text-gray-100">Halo, {user.name}</h2>
          <p className="text-2xl dark:text-gray-100">Selamat Datang</p>
        </div>
        <div className="bg-hola bg-left w-80 h-52 bg-cover opacity-75 bg-no-repeat absolute top-0 right-0 md:w-96 md:h-56" aria-label="hola image"></div>
      </div>
      <Container className="mt-5">
        <ContainerBody className="rounded-b-xl">
          <h2 className="text-4xl font-bold	text-black mb-2 dark:text-gray-100">Berita</h2>
          <NewsContainer>
            <NewsCard date="29 May 2020" title="Pentingnya Liburan" description="lorem" />
            <NewsCard date="29 May 2020" title="Pentingnya Liburan" description="lorem" />
          </NewsContainer>
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  );
}

export default Home;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  
  return {
    props: {
      user, 
    }
  };
});
