import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import Table from '@elements/Table';
import Th from '@elements/Th';
import Td from '@elements/Td';
import ListBox from '@modules/ListBox';
import InputWithIcon from '@modules/InputWithIcon';
import * as SolidIcon from '@elements/icon/Solid';
import showEntries from '@data/show-entries';
import { useState } from 'react';
import Pagination from '@modules/Pagination';
import * as Button from '@elements/Button';
import Link from 'next/link';
import learningMaterials from '@data/learning-materials';
import ConfirmationModal from '@modules/ConfirmationModal';
import WithAuth from '@lib/WithAuth';
import { useDispatch, useSelector } from 'react-redux';

interface LearningMaterialsProps {
  user: User,
  permissions: any,
}

const LearningMaterials = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Materi Pembelajaran" description="Apakah Anda yakin ingin menghapus materi pembelajaran ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" />
      <LayoutWithSidebar title="Materi Pembelajaran" user={user} permissions={permissions.list}>
        <Container>
          <ContainerBody className="rounded-b-xl space-y-2">
            <div className="flex justify-between items-baseline flex-wrap">
              <h2 className="text-3xl font-bold	text-black mb-2">Materi Pembelajaran</h2>
              <Link href="/learning-materials/add">
                <a className="btn btn-primary inline-flex items-center">
                  <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" /> 
                  Tambah Materi Pembelajaran
                </a>
              </Link>
            </div>
            <div className="flex justify-end space-y-3">
              <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />}/>
            </div>
            <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
              <thead className="bg-primary">
                <tr>
                  <Th className="text-center">
                    No
                  </Th>
                  <Th className="text-center">
                    Mata Pelajaran
                  </Th>
                  <Th className="text-center">
                    Bab
                  </Th>
                  <Th className="text-center">
                    Judul Materi
                  </Th>
                  <Th className="text-center">
                    Di-update pada
                  </Th>
                  <Th className="text-center">
                    Aksi
                  </Th>
                </tr>
              </thead>
              <tbody>
                {
                  learningMaterials.map((learningMaterial, learningMaterialIndex) => 
                    <tr key={learningMaterial.id}>
                      <Td className="text-center">{ learningMaterialIndex += 1 }</Td>
                      <Td className="text-center">{ learningMaterial.subject }</Td>
                      <Td className="text-center">{ learningMaterial.chapter }</Td>
                      <Td className="text-center truncate">{ learningMaterial.material }</Td>
                      <Td className="text-center">{ learningMaterial.updatedAt }</Td>
                      <Td className="text-center flex justify-center space-x-2">
                        <Link href={`/learning-materials/update/${learningMaterial.id}`} passHref>
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
                  )
                }
              </tbody>
            </Table>
            <Pagination />
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default WithAuth(LearningMaterials, 'crud learning materials');
