import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect } from 'react';
import { withAuthComponent } from '../lib/withAuthComponent';
import { withAuthServerSideProps } from '../lib/withAuthServerSide';
import LayoutWithSideBar from '../components/LayoutWithSideBar';

 function Home({ user   }: {user: any}) {
  const router = useRouter();
  const tokenFromCookie =  cookie.get('token');

  useEffect(() => {
    
  }, []);

  return (
    <LayoutWithSideBar title="Home">
      <p className="dark:text-white text-black">hai</p>
    </LayoutWithSideBar>
  );
}

export default withAuthComponent(Home);
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(props)  {
  return {props: null};
});
