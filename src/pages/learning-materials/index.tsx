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
import Modal from '@elements/Modal';
import ModalBody from '@elements/ModalBody';
import ModalFooter from '@elements/ModalFooter';
import * as OutlineIcon from '@elements/icon/Outline';
import Link from 'next/link';
import learningMaterials from '@data/learning-materials';
import ConfirmationModal from '@modules/ConfirmationModal';

interface LearningMaterialsProps {
  user: User
}

const LearningMaterials = ({ user }: LearningMaterialsProps) => {
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Materi Pembelajaran" description="Apakah Anda yakin ingin menghapus materi pembelajaran ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" />
      <LayoutWithSidebar title="Materi Pembelajaran" user={user}>
        <Container>
          <ContainerBody className="rounded-b-xl space-y-2">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold	text-black mb-2">Materi Pembelajaran</h2>
              <Link href="/learning-materials/add">
                <Button.Primary type="button" className="inline-flex items-center">
                  <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" /> 
                  Tambah Materi Pembelajaran
                </Button.Primary>
              </Link>
            </div>
            <div className="flex justify-between space-y-3">
              <div className="flex justify-center items-center self-end space-x-1">
                <span className="text-md">Tampilkan</span>
                <ListBox items={showEntries} selectedItem={selectedShowEntry} setSelectedItem={setSelectedShowEntry} />
                <span>data</span>
              </div>
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
                    Materi
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
                        <Link href={`learning-materials/update/${learningMaterial.id}`}>
                          <Button.Primary type="button" className="inline-flex items-center">
                            <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" />
                            Ubah
                          </Button.Primary>
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

export default LearningMaterials;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});
