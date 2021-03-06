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
import Title from '@elements/Title';
import { roleNames } from '@data/roles';
import findPermissionByName from '@utils/findPermissionByName';
import checkPermissions from '@utils/checkPermissions';
import WithAuth from '@lib/WithAuth';
import usePermissions from '@lib/usePermissions';
import { useDispatch, useSelector } from 'react-redux';

interface EditAccessRightsProps {
  user: User,
  permissions: any,
}

const EditAccessRights = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [selectedRoleName, setSelectedRoleName] = useState(roleNames[0]);

  return (
    <>
    <LayoutWithSidebar title="Edit Hak Akses" user={user} permissions={permissions.list}>
      <Container>
        <ContainerBody className="rounded-b-xl">
          <div className="flex justify-between mb-2">
            <Title>Edit Hak Akses</Title>
          </div>
          <div className="flex justify-between space-y-3">
            <div className="flex justify-start items-center self-end space-x-1 w-full">
              <span className="text-md font-bold">Rol: </span>
              <ListBox items={roleNames} selectedItem={selectedRoleName} setSelectedItem={setSelectedRoleName} />
            </div>
          </div>
          <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
            <thead className="bg-primary">
              <tr>
                <Th className="text-center">
                   Main
                </Th>
                <Th className="text-center">
                  CRUD
                </Th>
                <Th className="text-center">
                  Rekap
                </Th>
                <Th className="text-center">
                  Edit
                </Th>
                <Th className="text-center">
                  Tambahan
                </Th>
              </tr>
            </thead>
            <tbody>
                {
                    <tr>
                      <Td className="text-center">
                        <Button.Primary >
                          Login
                        </Button.Primary>
                      </Td>
                      <Td className="text-center">
                        <Button.Primary >
                          Absensi Kehadiran Siswa
                        </Button.Primary>
                      </Td>
                      <Td className="text-center">
                        <Button.Primary >
                           User
                        </Button.Primary>
                      </Td>
                      <Td className="text-center">
                        <Button.Primary >
                           Profile
                        </Button.Primary>
                      </Td>
                      <Td className="text-center">
                        <Button.Primary >
                           Ujian
                        </Button.Primary>
                      </Td>
                     
                    </tr>  
                }
                {
                   <tr>
                   <Td className="text-center">
                     <Button.Primary >
                       Register
                     </Button.Primary>
                   </Td>
                   <Td className="text-center">
                     <Button.Primary >
                       Materi Pelajaran
                     </Button.Primary>
                   </Td>
                   <Td className="text-center">
                     <Button.Primary >
                      Absensi Siswa
                     </Button.Primary>
                   </Td>
                   <Td className="text-center">
                     <Button.Primary >
                       Hak Akses  
                     </Button.Primary>
                   </Td>
                   <Td className="text-center">
                     <Button.Primary >
                       Pengumuman
                     </Button.Primary>
                   </Td>
                 </tr>  
                }
                {
                   <tr>
                   <Td className="text-center">
                     <Button.Primary >
                       Forgot Password
                     </Button.Primary>
                   </Td>
                   <Td className="text-center">
                     <Button.Primary >
                       Bab
                     </Button.Primary>
                   </Td>
                 </tr>  
                }
                {
                   <tr>
                   <Td className="text-center">
                    
                   </Td>
                   <Td className="text-center">
                     <Button.Primary >
                       Ujian
                     </Button.Primary>
                   </Td>
                 </tr>  
                }
                {
                   <tr>
                   <Td className="text-center">
                     
                   </Td>
                   <Td className="text-center">
                     <Button.Primary >
                      Nilai      
                     </Button.Primary>
                   </Td>
                 </tr>  
                }
                {
                   <tr>
                   <Td className="text-center">
                    
                   </Td>
                   <Td className="text-center">
                     <Button.Primary >
                       Nilai Sikap
                     </Button.Primary>
                   </Td>
                 </tr>  
                }
                {
                   <tr>
                   <Td className="text-center">
                     
                   </Td>
                   <Td className="text-center">
                     <Button.Primary >
                       Pengumuman
                     </Button.Primary>
                   </Td>
                 </tr>  
                }
                {
                  
                }
              </tbody>
          </Table>
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  </>
  );
};

export default WithAuth(EditAccessRights, 'edit permission');