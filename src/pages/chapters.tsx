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
import { useRef, useState } from 'react';
import Pagination from '@modules/Pagination';
import * as Button from '@elements/Button';
import Link from 'next/link';
import AddOrEditChapterModal from '@modules/AddOrEditChapterModal';
import dummySubjects from '@data/dummies/subjects';
import dummyChapters from '@data/dummies/chapters';
import ConfirmationModal from '@modules/ConfirmationModal';
import { thisPageFor } from '@utils/thisPageFor';


interface ChapterProps {
  user: User,
}

const Chapters = ({ user }: ChapterProps) => {
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [isEditChapterModalShow, setIsEditChapterModalShow] = useState(false);
  const chapterNameRef = useRef();
  const [selectedSubject, setSelectedSubject] = useState(dummySubjects[0]);
  const [selectedChapterData, setSelectedChapterData] = useState(null);
  const [isAddChapterModalShow, setIsAddChapterModalShow] = useState(false);

  const editChapterModalHandler = (chapterName: string, subjectName: string) => {
    setIsEditChapterModalShow(true);
    setSelectedChapterData({
      chapterName,
      subjectName
    });
    setSelectedSubject(subjectName);
  }

  const editChapterHandler = (e: any) => {
    e.preventDefault();
    console.log('clicked!');
  };

  const addChapterHandler = (e: any) => {
    e.preventDefault();
    console.log('clicked!');
  };

  return (
    <>
      <AddOrEditChapterModal isModalShow={isAddChapterModalShow} setIsModalShow={setIsAddChapterModalShow} chapterNameRef={chapterNameRef} onSubmit={addChapterHandler} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}  />
      <AddOrEditChapterModal isModalShow={isEditChapterModalShow} setIsModalShow={setIsEditChapterModalShow} chapterNameRef={chapterNameRef} onSubmit={editChapterHandler} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} chapterData={selectedChapterData} />
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Bab" description="Apakah Anda yakin ingin menghapus? Jika dihapus maka akan terhapus selamanya." confirmText="Hapus" />
      <LayoutWithSidebar title="Bab" user={user}>
        <Container>
          <ContainerBody className="rounded-b-xl space-y-2">
            <div className="flex justify-between items-baseline">
              <h2 className="text-3xl font-bold	text-black mb-2">Bab</h2>
              <Button.Primary type="button" onClick={() => setIsAddChapterModalShow(true)} className="inline-flex items-center">
                <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" />
                Tambah Bab
              </Button.Primary>
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
                    Aksi
                  </Th>
                </tr>
              </thead>
              <tbody>
                {
                  dummyChapters.map((chapterName, chapterNameIndex) => 
                    <tr key={chapterNameIndex}>
                      <Td className="text-center">
                        { chapterNameIndex + 1 }
                      </Td>
                      <Td className="text-center">
                        { dummySubjects[chapterNameIndex] }
                      </Td>
                      <Td className="text-center">
                        { chapterName }
                      </Td>
                      <Td className="text-center flex">
                        <Button.Primary onClick={() => editChapterModalHandler(chapterName, dummySubjects[chapterNameIndex])} type="button" className="inline-flex items-center mr-1.5">
                          <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" />
                          Ubah
                        </Button.Primary>
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

export default Chapters;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    context,
    currentRole: user.role,
    forRoles: [3]
  });
  return {
    props: {
      user, 
    }
  };
});
