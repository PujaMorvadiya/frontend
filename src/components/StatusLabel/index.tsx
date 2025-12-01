import Button from 'components/Button/Button';
import ToolTip from 'components/Tooltip';

interface StatusLabelProps {
  className?: string;
  text?: string;
  variants?:
    | 'green'
    | 'gray'
    | 'LightWood'
    | 'lightgray'
    | 'lightwoodBorder'
    | 'yellow'
    | 'red';
  style?: React.CSSProperties;
  onClickHandler?: (e?: any) => Promise<void>;
  isTooltip?: boolean;
}

const getLabelvariant = (variant: string) => {
  switch (variant) {
    case 'green':
      return 'bg-PrimaryGreen/10 text-PrimaryGreen';
    case 'lightgray':
      return 'bg-LightGray text-PrimaryWood';
    case 'lightwoodBorder':
      return ' pb-1 border border-solid bg-transparent border-LightWood text-PrimaryWood';
    case 'gray':
      return 'text-black bg-LightGray';
    case 'LightWood':
      return 'text-PrimaryWood bg-LightWood';
    case 'red':
      return 'bg-PrimaryRed/10 text-PrimaryRed';
    case 'yellow':
      return 'bg-PrimaryYellow text-primary';
    default:
      return 'bg-PrimaryYellow text-primary';
  }
};

const StatusLabel = ({
  text,
  variants,
  className,
  style,
  onClickHandler,
  isTooltip,
}: StatusLabelProps) => {
  return (
    <Button
      customStyle={style}
      className={`status-label text-sm w-fit leading-4 px-2.5 py-1.5 inline-flex items-center justify-center rounded ${className ?? ''} ${
        variants
          ? getLabelvariant(variants)
          : 'ring-1 ring-gray-200 bg-white text-dark'
      }`}
      onClickHandler={onClickHandler}
    >
      {isTooltip ? (
        <ToolTip value={text} spanClass="capitalize" />
      ) : (
        <span className="capitalize">{text}</span>
      )}
    </Button>
  );
};

export default StatusLabel;
