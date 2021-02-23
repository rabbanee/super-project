import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import dynamic from 'next/dynamic';
import React from 'react';

interface AddQuestionsProps {
  user: User,
}

const Editor = dynamic(
  () => import('@modules/Editor'),
  { ssr: false }
)

const AddQuestions = ({ user }: AddQuestionsProps) => {
  return (
    <LayoutWithSidebar user={user} title="Tambah Soal">
      <Container>
        <ContainerBody>
          <Editor />
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  );
};

export default AddQuestions;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    context,
    currentRole: user.role,
    forRoles: [3],
  });
  return {
    props: {
      user, 
    }
  };
});
