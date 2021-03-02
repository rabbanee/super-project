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
import grades from "@data/grades";
import { useState } from "react";
import ListBox from "@modules/ListBox";

interface AddOrEditAnnouncementProps {
  user: User,
  announcement?: Array<any>,
  permissions: any,
}

const Editor = dynamic(
  () => import('@modules/Editor'),
  { ssr: false }
)

const readers = [
  ...grades,
  'Seluruh Pengguna',
  // 'Wali Siswa',
];

const AddOrEditAnnouncement = ({ user, announcement, permissions }: AddOrEditAnnouncementProps) => {
  const [selectedGrade, setSelectedGrade] = useState(readers[0]);

  return (
    <LayoutWithSidebar user={user} title="Tambah Berita" permissions={permissions}>
      <Container>
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
          <div className="grid grid-cols-2 gap-4">
            {/* Title */}
            <div className="col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Pengumuman</label>
              <input id="title" name="title" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Judul Berita" />
            </div>
            {/* Readers */}
            <div className="col-span-2">
              <ListBox items={readers} label="Pembaca" selectedItem={selectedGrade} setSelectedItem={setSelectedGrade}/>
            </div>
            {/* Editor */}
            <div className="col-span-2">
              <label htmlFor="content" className="block text-md font-medium text-gray-700">Isi Konten</label>
              <Editor />
            </div>
          </div>
        </ContainerBody>
        <ContainerFooter>
          <Button.Primary>
            Simpan
          </Button.Primary>
        </ContainerFooter>
      </Container>
    </LayoutWithSidebar>
  );
};

export default AddOrEditAnnouncement;