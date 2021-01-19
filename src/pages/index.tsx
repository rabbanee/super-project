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
      <h1 className="dark:text-gray-200 text-black font-bold text-2xl">Dashboard</h1>
      <p className="dark:text-gray-200 text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat ducimus distinctio eius voluptatum temporibus repudiandae obcaecati soluta minus, perferendis beatae aliquid, rerum labore! Officiis fugit iusto nisi architecto explicabo laboriosam aliquam, quaerat nobis libero accusamus? Dolorum, libero esse! Eligendi minima placeat magnam officiis alias id, doloribus molestias reprehenderit quia tenetur autem fugit, fuga praesentium, dignissimos quisquam ex soluta. Corporis nulla neque beatae error consectetur assumenda atque amet dicta pariatur, sunt, unde maiores incidunt sapiente nesciunt explicabo, minima quo accusamus inventore ab omnis esse cum deserunt dolores rem. Alias consequatur iste sed expedita cupiditate ad sit maiores excepturi? Harum, ipsa alias.</p>
    </LayoutWithSideBar>
  );
}

export default withAuthComponent(Home);
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(props)  {
  return {props: null};
});
