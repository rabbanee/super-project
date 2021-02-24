import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Title from '@elements/Title';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import Link from 'next/link';
import React, { useState } from 'react';
import * as SolidIcon from '@elements/icon/Solid';
import * as Button from '@elements/Button';
import Table from '@elements/Table';
import Th from '@elements/Th';
import Td from '@elements/Td';
import Pagination from '@modules/Pagination';
import ConfirmationModal from '@modules/ConfirmationModal';

interface AnnouncementManagementProps {
  user: User,
}

const AnnouncementManagement = ({ user }: AnnouncementManagementProps) => {
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Pengumuman" description="Apakah Anda yakin ingin menghapus pengumuman ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" />
      <LayoutWithSidebar user={user} title="Pengelolaan Pengumuman">
        <Container>
          <ContainerBody className="rounded-b-xl">
            <div className="flex justify-between flex-wrap items-start">
              <Title>Pengelolaan Pengumuman</Title>
              <Link href={`/announcement/add`}>
                <a className="btn btn-primary inline-flex items-center">
                  <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" />
                  Tambah Pengumuman
                </a>
              </Link>
            </div>
            <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
              <thead className="bg-primary">
                <tr>
                  <Th className="text-center">
                    No
                  </Th>
                  <Th className="text-center">
                    Judul
                  </Th>
                  <Th className="text-center">
                    Aksi
                  </Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td className="text-center">1</Td>
                  <Td className="text-center">Piket setiap pagi</Td>
                  <Td className="text-center flex justify-center space-x-2">
                    <Link href={`/announcement/edit/1`}>
                      <a className="btn btn-primary inline-flex items-center">
                        <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" />
                        Ubah
                      </a>
                    </Link>
                    <Button.Danger onClick={() => setIsConfirmationModalShow(true)} type="button" className="inline-flex items-center">
                      <SolidIcon.Trash className="-ml-1 mr-1 h-5 w-5" /> 
                      Hapus
                    </Button.Danger>
                  </Td>
                </tr>
              </tbody>
            </Table>
            <Pagination />
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default AnnouncementManagement;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    context,
    currentRole: user.role,
    forRoles: [
      1, 2, 3,
    ],
  });

  return {
    props: {
      user, 
    }
  };
});
