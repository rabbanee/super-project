import dummySubjects from '@data/dummies/subjects';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import ListBox from '@modules/ListBox';
import { useRef, useState } from 'react';
import * as Button from '@elements/Button';
import * as OutlineIcon from '@elements/icon/Outline';
import * as SolidIcon from '@elements/icon/Solid';
import dummyChapters from '@data/dummies/chapters';
import Modal from '@elements/Modal';
import ModalBody from '@elements/ModalBody';
import ModalFooter from '@elements/ModalFooter';
import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import ContainerFooter from '@elements/container/Footer';
import learningMaterials from '@data/learning-materials';
import LearningMaterial from '@interface/LearningMaterial';
import dynamic from 'next/dynamic';
import Title from '@elements/Title';
import Link from 'next/link';
import SelectAsyncPaginate from '@modules/SelectAsyncPaginate';

interface AddOrUpdateLearningMaterialsProps {
  user: User,
  title: string,
  learningMaterial?: LearningMaterial,
  permissions: any,
  grades?: any,
  subjects?: any,
  chapters?: any,
}

const Editor = dynamic(
  () => import('@modules/Editor'),
  { ssr: false }
);

function AddOrUpdateLearningMaterials({ user, title, learningMaterial, permissions, grades, subjects, chapters }: AddOrUpdateLearningMaterialsProps) {   
  const [selectedChapter, setSelectedChapter] = useState(() => learningMaterial?.chapter ??dummyChapters[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const chapterNameRef = useRef();

  const createChapterHandler = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('clicked!');
    console.log(chapterNameRef.current);
    setIsLoading(false);

  };

  const options = [
       { value: "The Crownlands" },
       { value: "Iron Islands" },
       { value: "The North" },
       { value: "The Reach" },
       { value: "The Riverlands" },
       { value: "The Vale" },
       { value: "The Westerlands" },
       { value: "The Stormlands" }
   ];
  const [region, setRegion] = useState(options[0]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const onchangeSelect = (item) => {
    setCurrentCountry(null);
    setRegion(item);
  };

  return (
    <LayoutWithSidebar title={title} user={user} permissions={permissions}>
      <form>
        <Container>
          <ContainerBody className="px-4 py-5 bg-white sm:p-6 rounded-t-xl">
            <div className="flex justify-between flex-wrap items-start mb-2">
              <Title>{ learningMaterials ? 'Edit' : 'Tambah' } Materi Pembelajaran</Title>
              <Link href={`/learning-materials`}>
                <a className="btn btn-secondary inline-flex items-center">
                  <SolidIcon.ArrowNarrowLeft className="-ml-1 mr-1 h-5 w-5" />
                  Kembali
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-6 gap-4 mt-2">
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="title_of_the_material" className="block text-sm font-medium text-gray-700">Judul Materi</label>
                <input id="title_of_the_material" name="title_of_the_material" type="text" autoComplete="title_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Judul Materi" defaultValue={learningMaterial?.order ?? ''}/>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <div className="col-span-6 sm:col-span-6">
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Kelas</label>
                  <select id="grade" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                    {
                      grades?.map((grade) => 
                        <option value={grade.id} key={grade.id}>{grade.name}</option>
                      )
                    }
                  </select>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Mata Pelajaran</label>
                 <SelectAsyncPaginate
                    regionName={region.value}
                    value={currentCountry}
                    onChange={(country) => setCurrentCountry(country)}
                  />
                {/* <select id="subject" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                  {
                    subjects?.map((subject) => 
                      <option value={subject.id} key={subject.id}>{subject.name}</option>
                    )
                  }
                </select> */}
                {/* <ListBox items={dummySubjects} label="Mata Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/> */}
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="chapter" className="block text-sm font-medium text-gray-700">Bab</label>
                <select id="chapter" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                  {
                    chapters?.map((chapter) => 
                      <option value={chapter.id} key={chapter.id}>{chapter.name}</option>
                    )
                  }
                </select>
                {/* <ListBox items={dummyChapters} label="Bab" selectedItem={selectedChapter} setSelectedItem={setSelectedChapter}/> */}
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="title_of_the_material" className="block text-sm font-medium text-gray-700">Konten</label>
                <Editor />
              </div>
            </div>
          </ContainerBody>
          <ContainerFooter className="flex justify-end">
            <Button.Primary  
              className={`${isLoading && 'cursor-not-allowed'} inline-flex items-center`}
              disabled={isLoading}
            >
                {
                  isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 
                }
                {
                  isLoading ? 'Memproses' : <><SolidIcon.Save className="-ml-1 mr-1 h-5 w-5" /> Simpan</>
                }
            </Button.Primary>
          </ContainerFooter>
        </Container>
      </form>
    </LayoutWithSidebar>
  );
};

export default AddOrUpdateLearningMaterials;
