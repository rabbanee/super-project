import dummySubjects from '@data/dummies/subjects';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import ListBox from '@modules/ListBox';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
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
import { AsyncPaginate } from 'react-select-async-paginate';

interface AddOrUpdateLearningMaterialsProps {
  user: User,
  title: string,
  learningMaterial?: any,
  permissions: any,
  selectedSubject?: string,
  setSelectedSubject: Function,
  getSubjects: Function,
  onSubmit: FormEventHandler<HTMLFormElement>,
  getChapters: Function,
  selectedChapter?: string,
  setSelectedChapter: Function,
  getGrades: Function,
  selectedGrade?: string,
  setSelectedGrade: Function,
  titleRef: any,
  onEditorChanges: Function,
  isLoading: boolean,
}

const Editor = dynamic(
  () => import('@modules/Editor'),
  { ssr: false }
);

function AddOrUpdateLearningMaterials({ user, title, learningMaterial, permissions, selectedSubject, setSelectedSubject, getSubjects, onSubmit, getChapters, selectedChapter, setSelectedChapter, getGrades, selectedGrade, setSelectedGrade, titleRef, onEditorChanges, isLoading }: AddOrUpdateLearningMaterialsProps) {   

  useEffect(() => {
    console.log(learningMaterial);
  }, [learningMaterial]);

  return (
    <LayoutWithSidebar title={title} user={user} permissions={permissions}>
      <Container>
        <form onSubmit={onSubmit}>
          <ContainerBody className="px-4 py-5 bg-white sm:p-6 rounded-t-xl">
            <div className="flex justify-between flex-wrap items-start mb-2">
              <Title>{title}</Title>
              <Link href={`/learning-materials`}>
                <a className="btn btn-secondary inline-flex items-center">
                  <SolidIcon.ArrowNarrowLeft className="-ml-1 mr-1 h-5 w-5" />
                  Kembali
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-6 gap-4 mt-2">
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Materi</label>
                <input id="title" name="title" type="text" ref={titleRef} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Judul Materi" defaultValue={learningMaterial?.title || ''}/>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <div className="col-span-6 sm:col-span-6">
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Kelas</label>
                  <AsyncPaginate
                    key={''}
                    value={selectedGrade || ''}
                    loadOptions={getGrades}
                    getOptionValue={(option) => option.name}
                    getOptionLabel={(option) => option.name}
                    onChange={(item) => setSelectedGrade(item)}
                    isSearchable={false}
                    placeholder="Kelas"
                    additional={{
                      page: 1,
                    }}
                  />
                </div>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Mata Pelajaran</label>
                <AsyncPaginate
                  key={''}
                  value={selectedSubject || ''}
                  loadOptions={getSubjects}
                  getOptionValue={(option) => option.name}
                  getOptionLabel={(option) => option.name}
                  onChange={(item) => setSelectedSubject(item)}
                  isSearchable={false}
                  placeholder="Mata Pelajaran"
                  additional={{
                    page: 1,
                  }}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="chapter" className="block text-sm font-medium text-gray-700">Bab</label>
                <AsyncPaginate
                  key={''}
                  value={selectedChapter || ''}
                  loadOptions={getChapters}
                  getOptionValue={(option) => option.name}
                  getOptionLabel={(option) => option.name}
                  onChange={(item) => setSelectedChapter(item)}
                  isSearchable={false}
                  placeholder="Bab"
                  additional={{
                    page: 1,
                  }}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Konten</label>
                <Editor onEditorChanges={onEditorChanges} data={learningMaterial?.content ?? ''} />
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
        </form>
      </Container>
    </LayoutWithSidebar>
  );
};

export default AddOrUpdateLearningMaterials;
