import * as Icon from '@elements/Icon';
import { Transition } from '@headlessui/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { AlertState, alertState } from '@atoms/alert';

interface AlertProps {
  type?: string;
  icon?: React.ReactNode;
  primary: string;
  secondary?: string;
  onClose?: Function;
}

function Alert(props: AlertProps) {
  const { type, icon, primary, secondary, onClose } = props;
  return (
    <div
      className={`relative border-t-4 rounded-b px-4 py-3 shadow-md my-2 alert-${type}`}
      role="alert"
    >
      <div className="absolute top-0 right-0 p-2">
        <div className="cursor-pointer" title="Close" onClick={() => onClose()}>
          <Icon.X className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="p-2 pr-4">{icon}</div>
        <div>
          <p className="font-bold">{primary}</p>
          <p className="text-sm">{secondary}</p>
        </div>
      </div>
    </div>
  );
}

function SuccessAlert(props: AlertProps) {
  return <Alert {...props} type="info" icon={<Icon.CheckCircle className="w-6 h-6"/>} />;
}

function ErrorAlert(props: AlertProps) {
  return <Alert {...props} type="error" icon={<Icon.Error className="w-6 h-6"/>} />;
}

function WarningAlert(props: AlertProps) {
  return <Alert {...props} type="warning" icon={<Icon.Warning className="w-6 h-6"/>} />;
}

export function useAlert() {
  const [alert, setAlert] = useRecoilState<AlertState>(alertState);
  
  const showAlert = (props) => {
    setAlert({
      ...alert,
      ...props,
    });
  };

  const resetAlert = () => {
     setAlert({
      ...alert,
      isOpen: false,
    });
  }

  useEffect(() => {
    if (alert?.isOpen && alert?.timeout) {
      setTimeout(() => {
        showAlert({
          isOpen: false,
        });
      }, alert?.timeout);
    }
  }, [alert?.isOpen, alert?.timeout]);
  return { alert, showAlert, resetAlert };
}

export default function Alerts() {
  const { alert, showAlert } = useAlert();
  const onClose = () => {
    showAlert({
      isOpen: false,
    });
  };
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
          primary={alert.primary}
          secondary={alert.secondary}
          onClose={() => onClose()}
        />
      )}
      {alert.type === 'error' && (
        <ErrorAlert
          primary={alert.primary}
          secondary={alert.secondary}
          onClose={() => onClose()}
        />
      )}
      {alert.type === 'warning' && (
        <WarningAlert
          primary={alert.primary}
          secondary={alert.secondary}
          onClose={() => onClose()}
        />
      )}
    </Transition>
  );
}