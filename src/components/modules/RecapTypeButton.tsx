import * as Button from '@elements/Button';

interface RecapTypeButtonProps {
  recapTypes: Array<string>,
  setActiveRecapType: Function,
  activeRecapType: number,
}

const RecapTypeButton = ({ recapTypes, setActiveRecapType, activeRecapType }: RecapTypeButtonProps) => {
  return (
    <div className="flex space-x-2">
      {
        recapTypes.map((recapType, recapTypeIndex) => 
          recapTypeIndex === activeRecapType ?
          <Button.Primary>{recapType}</Button.Primary> :
          <Button.Secondary onClick={() => setActiveRecapType(recapTypeIndex)}>{recapType}</Button.Secondary>
        )
      }
    </div>
  );
};

export default RecapTypeButton;