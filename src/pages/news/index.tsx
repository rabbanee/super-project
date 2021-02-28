import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { User } from '@interface/User';
import NewsCard from '@modules/NewsCard';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import NewsContainer from '@elements/container/News';
import * as Button from '@elements/Button';
import * as SolidIcon from '@elements/icon/Solid';
import Link from 'next/link';
import { isAdmin } from '@utils/roles/isAdmin';
import Title from '@elements/Title';
import findPermissionByName from '@utils/findPermissionByName';
import checkPermissions from '@utils/checkPermissions';

interface NewsProps { 
  user: User,
  permissions: any,
}

function News({ user, permissions }: NewsProps) {
  return (
    <LayoutWithSidebar title="Berita" user={user} permissions={permissions}>
      <Container>
        <ContainerBody className="rounded-b-xl">
          <div className="flex justify-between items-start">
            <Title className=" mb-2">Berita</Title>
            { findPermissionByName(permissions, 'crud news') &&
              <Link href={`/news/management`}>
                <a className="btn btn-primary inline-flex items-center">
                  <SolidIcon.Adjustments className="-ml-1 mr-1 h-5 w-5" />
                  Pengelolaan Berita
                </a>
              </Link>
            }
          </div>
          <NewsContainer>
            <NewsCard date="29 May 2020" title="Pentingnya Liburan" description="lorem" />
          </NewsContainer>
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  );
}

export default News;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  checkPermissions({
    context,
    permissions,
    permissionName: 'view news',
  });
  return {
    props: {
      user, 
      permissions, 
    }
  };
});
