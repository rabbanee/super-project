import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import Link from 'next/link';
import * as SolidIcon from '@elements/icon/Solid';
import Table from '@elements/Table';
import Th from '@elements/Th';
import Pagination from '@modules/Pagination';
import Td from '@elements/Td';
import * as Button from '@elements/Button';
import ConfirmationModal from '@modules/ConfirmationModal';
import { useState } from 'react';
import { thisPageFor } from '@utils/thisPageFor';

interface QuestionsBankProps {
  user: User;
}

const QuestionsBank = ({ user }: QuestionsBankProps) => {
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Soal" description="Apakah Anda yakin ingin menghapus Soal ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" />
      <LayoutWithSidebar user={user} title="Bank Soal">
        <Container>
          <ContainerBody className="rounded-b-xl">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold	text-black">Soal Saya</h1>
                <p>{user.name}</p>
              </div>
              <Link href="/questions-bank/add">
                <a className="btn btn-primary inline-flex items-center">
                  <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" /> 
                  Tambah Soal
                </a>
              </Link>
            </div>
            <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
              <thead className="bg-primary">
                <tr>
                  <Th className="text-center">
                    Soal
                  </Th>
                  <Th className="text-center">
                    Jawaban
                  </Th>
                  <Th className="text-center">
                    Pelajaran
                  </Th>
                  <Th className="text-center">
                    Kelas
                  </Th>
                  <Th className="text-center">
                    Aksi
                  </Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td className="text-center">Bagian positif di atom?</Td>
                  <Td className="text-center">Proton</Td>
                  <Td className="text-center">Kimia</Td>
                  <Td className="text-center truncate">XII RPL</Td>
                  <Td className="text-center flex justify-center space-x-2">
                    <Link href={`/questions-bank/update/1`}>
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

export default QuestionsBank;
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
