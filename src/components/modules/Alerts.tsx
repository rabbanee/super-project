import * as OutlineIcon from '@elements/icon/Outline';
import * as SolidIcon from '@elements/icon/Solid';
import { Transition } from '@headlessui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from 'redux/actions';

interface AlertProps {
  type?: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  onClose?: Function;
}

function Alert(props: AlertProps) {
  const { type, icon, title, description, onClose } = props;
  return (
    <div
      className={`relative border-t-4 rounded-b px-4 py-3 shadow-md my-2 alert-${type}`}
      role="alert"
    >
      <div className="absolute top-0 right-0 p-2">
        <div className="cursor-pointer" title="Close" onClick={() => onClose()}>
          <SolidIcon.X className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="p-2 pr-4">{icon}</div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SuccessAlert(props: AlertProps) {
  return <Alert {...props} type="info" icon={<OutlineIcon.CheckCircle className="w-6 h-6"/>} />;
}

function ErrorAlert(props: AlertProps) {
  return <Alert {...props} type="error" icon={<OutlineIcon.Exclamation className="w-6 h-6"/>} />;
}

function WarningAlert(props: AlertProps) {
  return <Alert {...props} type="warning" icon={<OutlineIcon.Exclamation className="w-6 h-6"/>} />;
}

export default function Alerts() {
  const dispatch: Function = useDispatch();
  const alert = useSelector(state => state.alert);

  useEffect(() => {
    if (alert?.isOpen && alert?.timeout) {
      setTimeout(() => {
       dispatch(closeAlert());
      }, alert?.timeout);
    }
  }, [alert?.isOpen, alert?.timeout]);

  return (
    <Transition
      show={alert.isOpen}
      enter="transition ease-out duration-500"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-500"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      className="fixed inset-x-0 top-0 w-2/3 md:w-1/3 mx-auto z-50"
    >
      {alert.type === 'success' && (
        <SuccessAlert
          title={alert.title}
          description={alert.description}
          onClose={() => dispatch(closeAlert())}
        />
      )}
      {alert.type === 'error' && (
        <ErrorAlert
          title={alert.title}
          description={alert.description}
          onClose={() => dispatch(closeAlert())}
        />
      )}
      {alert.type === 'warning' && (
        <WarningAlert
          title={alert.title}
          description={alert.description}
          onClose={() => dispatch(closeAlert())}
        />
      )}
    </Transition>
  );
}