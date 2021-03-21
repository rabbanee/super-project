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
import Title from '@elements/Title';
import findPermissionByName from '@utils/findPermissionByName';
import usePermissions from '@lib/usePermissions';
import { useDispatch, useSelector } from 'react-redux';
import WithAuth from '@lib/WithAuth';
interface NewsProps { 
  user: User,
  permissions: any,
}

function News() {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);

  return (
    <LayoutWithSidebar title="Berita" user={user} permissions={permissions.list}>
      <Container>
        <ContainerBody className="rounded-b-xl">
          <div className="flex justify-between items-start">
            <Title className=" mb-2">Berita</Title>
            { findPermissionByName(permissions.list, 'crud news') &&
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

export default WithAuth(News, 'view news');
