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

interface AddOrUpdateLearningMaterialsProps {
  user: User,
  title: string,
  learningMaterial?: LearningMaterial,
  permissions: any,
}

function AddOrUpdateLearningMaterials({ user, title, learningMaterial, permissions }: AddOrUpdateLearningMaterialsProps) {   
  const [selectedSubject, setSelectedSubject] = useState(() => learningMaterial?.subject ?? dummySubjects[0]);
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

  return (
    <LayoutWithSidebar title={title} user={user} permissions={permissions}>
      <form>
        <Container>
          <ContainerBody className="px-4 py-5 bg-white sm:p-6 rounded-t-xl">
            <div className="flex justify-between mb-2 items-end flex-wrap">
              <h2 className="text-4xl font-bold	text-black mb-2">{title}</h2>
              <div className="justify-end flex w-full sm:w-auto">
                <Button.Primary type="button" onClick={() => setIsModalShow(true)} className="inline-flex items-center">
                  <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" />
                  Tambah Bab
                </Button.Primary>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 mt-2">
              <div className="col-span-6 sm:col-span-6">
                <label htmlFor="order_of_the_material" className="block text-sm font-medium text-gray-700">Urutan Materi</label>
                <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Urutan Materi" defaultValue={learningMaterial?.order ?? ''}/>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <ListBox items={dummySubjects} label="Mata Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
              </div>
              <div className="col-span-6 sm:col-span-6">
                <ListBox items={dummyChapters} label="Bab" selectedItem={selectedChapter} setSelectedItem={setSelectedChapter}/>
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
      <Modal isShow={isModalShow} setIsShow={setIsModalShow}>
        <form onSubmit={createChapterHandler}>
          <ModalBody>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Tambahkan Bab
                </h3>
                <div className="mt-4 flex flex-col space-y-3">   
                  <div>
                    <ListBox items={dummySubjects} label="Mata Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </div>
                  <div>
                     <label htmlFor="chapter" className="block text-sm font-medium text-gray-700">Nama Bab</label>
                     <input id="chapter" name="chapter" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" ref={chapterNameRef} placeholder="Nama Bab" />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button.Primary className="w-full inline-flex justify-center shadow-sm text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
              Tambahkan Bab
            </Button.Primary>
            <Button.Secondary type="button" className="mt-3 w-full inline-flex justify-center shadow-sm text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsModalShow(false)}>
              Batal
            </Button.Secondary>
          </ModalFooter>
        </form>
      </Modal>
    </LayoutWithSidebar>
  );
};

export default AddOrUpdateLearningMaterials;
