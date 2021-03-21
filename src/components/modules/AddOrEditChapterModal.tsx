import Modal from '@elements/Modal';
import ModalBody from '@elements/ModalBody';
import ModalFooter from '@elements/ModalFooter';
import * as Button from '@elements/Button';
import ListBox from './ListBox';
import dummySubjects from '@data/dummies/subjects';
import { FormEvent, LegacyRef, MutableRefObject, useEffect, useState } from 'react';
import * as OutlineIcon from '@elements/icon/Outline';

interface AddOrEditChapterModalProps {
  isModalShow: boolean,
  setIsModalShow: Function,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  selectedSubject: string,
  setSelectedSubject: Function,
  chapterNameRef: LegacyRef<HTMLInputElement>,
  chapterData?: any,
  subjectNames: Array<any>,
}

const AddOrEditChapterModal = ({ isModalShow, setIsModalShow, onSubmit, selectedSubject, setSelectedSubject, chapterNameRef, chapterData, subjectNames } : AddOrEditChapterModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const formHandler = async (e) => {
    setIsLoading(true);
    await onSubmit(e);
    setIsLoading(false);
  }

  return (
    <Modal isShow={isModalShow} setIsShow={setIsModalShow}>
      <form onSubmit={formHandler}>
        <ModalBody>
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                { chapterData ? 'Ubah' : 'Tambah' } Bab
              </h3>
              <div className="mt-4 flex flex-col space-y-3">   
                {
                  subjectNames.length > 0 &&  (
                    <div>
                      <ListBox items={subjectNames} label="Mata Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                    </div>
                  )
                }
                <div>
                    <label htmlFor="chapter-name" className="block text-sm font-medium text-gray-700">Nama Bab</label>
                    <input id="chapter-name" name="chapter-name" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" ref={chapterNameRef} placeholder="Nama Bab" defaultValue={chapterData?.chapterName ?? ''}/>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button.Primary  
            className={`${isLoading && 'cursor-not-allowed'} w-full inline-flex justify-center shadow-sm text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
            disabled={isLoading}
            >
              {
                isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"  /> 
              }
              { !isLoading ? (chapterData ? 'Ubah Bab' : 'Tambah Bab') : 'Memproses' } 
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