import * as Button from '@elements/Button';

interface RecapTypeButtonProps {
  recapTypes: Array<string>,
  setActiveRecapType: Function,
  activeRecapType: number,
}

const RecapTypeButton = ({ recapTypes, setActiveRecapType, activeRecapType }: RecapTypeButtonProps) => {
  return (
    <>
      {
        recapTypes.map((recapType, recapTypeIndex) => 
          recapTypeIndex === activeRecapType ?
          <Button.Primary key={recapTypeIndex}>{recapType}</Button.Primary> :
          <Button.Secondary key={recapTypeIndex} onClick={() => setActiveRecapType(recapTypeIndex)}>{recapType}</Button.Secondary>
        )
      }
    </>
  );
};

export default RecapTypeButton;