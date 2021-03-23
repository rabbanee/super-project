import * as Button from '@elements/Button';

type ErrorAndRefreshProps = {
  onRefresh: Function,
  title: string,
}

const ErrorAndRefresh = ({ onRefresh, title }: ErrorAndRefreshProps) => {
  return (
    <div className="flex justify-center flex-col items-center">
      <img src="svg/error_illustration.svg" alt="No data" className="h-80 w-80"/>
      <p>{title}</p>
      <Button.Primary 
        type="button"
        onClick={() => onRefresh()}
      >
        Dapatkan ulang
      </Button.Primary>
    </div>
  );
};

export default ErrorAndRefresh;