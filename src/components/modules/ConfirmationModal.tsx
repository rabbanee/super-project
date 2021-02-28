import Modal from "@elements/Modal";
import ModalBody from "@elements/ModalBody";
import ModalFooter from "@elements/ModalFooter";
import * as Button from '@elements/Button';
import { ReactNode } from "react";
import * as OutlineIcon from '@elements/icon/Outline';

interface ConfirmationModalProps {
  isShow: boolean,
  setIsShow: Function,
  title: string,
  description: string,
  confirmText: string,
}

const ConfirmationModal = ({ isShow, setIsShow, title, description, confirmText }: ConfirmationModalProps) => {
  return (
    <Modal isShow={isShow} setIsShow={setIsShow}>
      <ModalBody className="sm:px-6 sm:flex sm:items-start">
        <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10`}>
          <OutlineIcon.Exclamation className="h-6 w-6 text-red-600"/>
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
            { title }
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              { description }
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="sm:px-6">
        <Button.Danger className="w-full inline-flex justify-center shadow-sm text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
          { confirmText }
        </Button.Danger>
        <Button.Secondary type="button" className="mt-3 w-full inline-flex justify-center shadow-sm text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsShow(false)}>
          Batal
        </Button.Secondary>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;