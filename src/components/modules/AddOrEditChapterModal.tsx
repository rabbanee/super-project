import Modal from '@elements/Modal';
import ModalBody from '@elements/ModalBody';
import ModalFooter from '@elements/ModalFooter';
import * as Button from '@elements/Button';
import ListBox from './ListBox';
import dummySubjects from '@data/dummies/subjects';
import { FormEvent, LegacyRef, MutableRefObject } from 'react';


interface AddOrEditChapterModalProps {
  isModalShow: boolean,
  setIsModalShow: Function,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  selectedSubject: string,
  setSelectedSubject: Function,
  chapterNameRef: LegacyRef<HTMLInputElement>,
  chapterData?: object,
}

const AddOrEditChapterModal = ({ isModalShow, setIsModalShow, onSubmit, selectedSubject, setSelectedSubject, chapterNameRef, chapterData} : AddOrEditChapterModalProps) => {
  return (
    <Modal isShow={isModalShow} setIsShow={setIsModalShow}>
      <form onSubmit={onSubmit}>
        <ModalBody>
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                { chapterData ? 'Ubah' : 'Tambah' } Bab
              </h3>
              <div className="mt-4 flex flex-col space-y-3">   
                <div>
                  <ListBox items={dummySubjects} label="Mata Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                </div>
                <div>
                    <label htmlFor="chapter" className="block text-sm font-medium text-gray-700">Nama Bab</label>
                    <input id="chapter" name="chapter" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" ref={chapterNameRef} placeholder="Nama Bab" defaultValue={chapterData?.chapterName ?? ''}/>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button.Primary className="w-full inline-flex justify-center shadow-sm text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
            { chapterData ? 'Ubah' : 'Tambah' } Bab
          </Button.Primary>
          <Button.Secondary type="button" className="mt-3 w-full inline-flex justify-center shadow-sm text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsModalShow(false)}>
            Batal
          </Button.Secondary>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddOrEditChapterModal;