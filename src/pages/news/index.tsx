import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { User } from '@interface/User';
import NewsCard from '@modules/NewsCard';
import Container from '@elements/container/Index';
import BodyContainer from '@elements/container/Body';
import NewsContainer from '@elements/container/News';

interface NewsProps { 
  user: User
}

function News({ user }: NewsProps) {
  return (
    <LayoutWithSidebar title="Berita" user={user}>
      <Container>
        <BodyContainer className="rounded-b-xl">
          <h2 className="text-4xl font-bold	text-black mb-2">Berita</h2>
          <NewsContainer>
            <NewsCard date="29 May 2020" title="Pentingnya Liburan" description="lorem" />
          </NewsContainer>
        </BodyContainer>
      </Container>
    </LayoutWithSidebar>
  );
}

export default News;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});
