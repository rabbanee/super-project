import { useState } from 'react';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { User } from '@interface/User';
import * as Button from '@elements/Button';
import Modal from '@elements/Modal';
import dynamic from 'next/dynamic'
import ListBox from '@modules/ListBox';
import dummySubjects from '@data/dummies/subjects';
import grades from '@data/grades';
import ModalBody from '@elements/ModalBody';
import ModalFooter from '@elements/ModalFooter';
import Title from '@elements/Title';
import { isAdmin } from '@utils/roles/isAdmin';
import { isHeadmaster } from '@utils/roles/isHeadmaster';
import { isTeacher } from '@utils/roles/isTeacher';
import Link from 'next/link';
import * as SolidIcon from '@elements/icon/Solid';

interface AnnouncementProps {
  user: User
}

const Editor = dynamic(
  () => import('@modules/Editor'),
  { ssr: false }
)

function Announcement({ user }: AnnouncementProps) {
  const [isModalShow, setIsModalShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState(dummySubjects[0]);
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);


  const announcementHandler = (e) => {
    e.preventDefault();
  }

  return (
    <LayoutWithSidebar title="Pengumuman" user={user}>
      <div className="flex justify-between items-start">
        <Title className="mb-2">Pengumuman</Title>
        { (isAdmin(user.role) || isHeadmaster(user.role) || isTeacher(user.role))  &&
          <Link href={`/announcement/management`}>
            <a className="btn btn-primary inline-flex items-center">
              <SolidIcon.Adjustments className="-ml-1 mr-1 h-5 w-5" />
              Pengelolaan Pengumuman
            </a>
          </Link>
        }
      </div>
      {/* <div className="flex items-end flex-col mb-2">
        <Button.Primary onClick={() => setIsModalShow(true)}>Tambahkan Pengumuman</Button.Primary>
      </div> */}
      <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <table className="table table-borderless tab mt-2">
          <tbody>
            <tr>
              <th className="w-1/4">Tanggal</th>
              <th className="w-1/4">:</th>
              <td>22 Januari 2021</td>
            </tr>
            <tr>
              <th className="w-1/4">Pengampu</th>
              <th className="w-1/4">:</th>
              <td>Siapa Saja</td>
            </tr>
            <tr>
              <th className="w-1/4">Mata Pelajaran</th>
              <th className="w-1/4">:</th>
              <td>Mekanika</td>
            </tr>
          </tbody>
        </table>
       <hr className="mt-2"/>
      </div>
      <Modal isShow={isModalShow} setIsShow={setIsModalShow}>
        <form onSubmit={announcementHandler}>
          <ModalBody>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Tambahkan Pengumuman
                </h3>
                <div className="mt-4 flex flex-col space-y-3">   
                  <div>
                    <ListBox items={dummySubjects} label="Mata Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </div>
                  <div>
                    <ListBox items={grades} label="Kelas" selectedItem={selectedGrade} setSelectedItem={setSelectedGrade}/>
                  </div>
                  <div>
                    <Editor />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button.Primary className="w-full inline-flex justify-center shadow-sm text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
              Tambahkan Pengumuman
            </Button.Primary>
            <Button.Secondary type="button" className="mt-3 w-full inline-flex justify-center shadow-sm text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsModalShow(false)}>
              Batal
            </Button.Secondary>
          </ModalFooter>
        </form>
      </Modal>
    </LayoutWithSidebar>
  );
}

export default Announcement;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});
