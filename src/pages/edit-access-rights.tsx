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


interface EditAccessRightsProps {
  user: User,
}

const EditAccessRights = ({ user }: EditAccessRightsProps) => {
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);
  return (
    <>
    <LayoutWithSidebar title="EditAccessRights" user={user}>
      <Container>
        <ContainerBody className="rounded-b-xl space-y-2">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold	text-black mb-2">EditAccessRights</h2>
          </div>
          <div className="flex justify-between space-y-3">
            <div className="flex justify-center items-center self-end space-x-1">
              <span className="text-md">Tampilkan</span>
              <ListBox items={showEntries} selectedItem={selectedShowEntry} setSelectedItem={setSelectedShowEntry} />
              <span>Role</span>
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
                  Aksi
                </Th>
              </tr>
            </thead>
          </Table>
          <Pagination />
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  </>
  );
};

export default EditAccessRights;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    context,
    currentRole: user.role,
    forRoles: [3]
  }); 
});