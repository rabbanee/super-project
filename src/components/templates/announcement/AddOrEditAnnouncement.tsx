import ContainerBody from "@elements/container/Body";
import Container from "@elements/container/Index";
import Title from "@elements/Title";
import { User } from "@interface/User";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import Link from "next/link";
import * as SolidIcon from '@elements/icon/Solid';
import * as Button from '@elements/Button';
import dynamic from "next/dynamic";
import ContainerFooter from "@elements/container/Footer";
<<<<<<< HEAD
import grades from "@data/grades";
import { useState } from "react";
import ListBox from "@modules/ListBox";
=======
import ListBox from "@modules/ListBox";
import grades from "@data/grades";
import * as OutlineIcon from '@elements/icon/Outline';
import { FormEventHandler, MouseEventHandler } from "react";
>>>>>>> ssg

interface AddOrEditAnnouncementProps {
  user: User,
  announcement?: any,
  permissions: any,
  selectedReader: string,
  setSelectedReader: Function,
  isLoading: boolean,
  onSave: FormEventHandler<HTMLFormElement>,
  onEditorChanges: Function,
  titleInputRef: any,
  readers: Array<string>,
}

const Editor = dynamic(
  () => import('@modules/Editor'),
  { ssr: false }
)

<<<<<<< HEAD
const readers = [
  ...grades,
  'Seluruh Pengguna',
  // 'Wali Siswa',
];

const AddOrEditAnnouncement = ({ user, announcement, permissions }: AddOrEditAnnouncementProps) => {
  const [selectedGrade, setSelectedGrade] = useState(readers[0]);

=======
const AddOrEditAnnouncement = ({ user, announcement, permissions, selectedReader, setSelectedReader, isLoading, onSave, onEditorChanges, titleInputRef, readers }: AddOrEditAnnouncementProps) => {
>>>>>>> ssg
  return (
    <LayoutWithSidebar user={user} title={`${ announcement ? 'Edit' : 'Tambah' } Pengumuman`} permissions={permissions}>
      <Container>
        <form onSubmit={onSave}>
          <ContainerBody>
            <div className="flex justify-between flex-wrap items-start mb-2">
              <Title>{ announcement ? 'Edit' : 'Tambah' } Pengumuman</Title>
              <Link href={`/announcement/management`}>
                <a className="btn btn-secondary inline-flex items-center">
                  <SolidIcon.ArrowNarrowLeft className="-ml-1 mr-1 h-5 w-5" />
                  Kembali
                </a>
              </Link>
            </div>
<<<<<<< HEAD
            {/* Readers */}
            <div className="col-span-2">
              <ListBox items={readers} label="Pembaca" selectedItem={selectedGrade} setSelectedItem={setSelectedGrade}/>
            </div>
            {/* Editor */}
            <div className="col-span-2">
              <label htmlFor="content" className="block text-md font-medium text-gray-700">Isi Konten</label>
              <Editor />
=======
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Pengumuman</label>
                <input id="title" name="title" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Judul Pengumuman" ref={titleInputRef} defaultValue={announcement?.title}/>
              </div>
              {/* Readers */}
              <div className="col-span-2">
                <ListBox items={readers} label="Pembaca" selectedItem={selectedReader} setSelectedItem={setSelectedReader}/>
              </div>
              {/* Editor */}
              <div className="col-span-2">
                <label htmlFor="content" className="block text-md font-medium text-gray-700">Isi Konten</label>
                <Editor onEditorChanges={onEditorChanges} data={announcement?.description ?? ''}/>
              </div>
>>>>>>> ssg
            </div>
          </ContainerBody>
          <ContainerFooter className="flex justify-end">
            <Button.Primary  
              className={`${isLoading && 'cursor-not-allowed'} group relative flex justify-center`}
              disabled={isLoading}
            >
                {
                  isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 
                }
                {
                  isLoading ? 'Memproses' : 'Simpan'
                }
            </Button.Primary>
          </ContainerFooter>
        </form>
      </Container>
    </LayoutWithSidebar>
  );
};

export default AddOrEditAnnouncement;