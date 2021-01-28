import React from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import { withAuthServerSideProps } from '../lib/withAuthServerSide';

const Tugas = ({ user }: {user: object}) => {
  return (
    <LayoutWithSidebar title="Tugas - E-ZEEY" user={user}>
      <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <p>Hello Gaises</p>
      </div>
    </LayoutWithSidebar>
  );
};

export default Tugas;

export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: object)  {
  return {
    props: {
      user, 
    }
  };
});