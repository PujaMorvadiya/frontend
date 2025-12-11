import Button from 'components/Button/Button';
import ToolTip from 'components/Tooltip';
import { JSX } from 'react';

export enum statusVariants {
  green = 'green',
  gray = 'gray',
  LightWood = 'LightWood',
  lightgray = 'lightgray',
  lightwoodBorder = 'lightwoodBorder',
  yellow = 'yellow',
  red = 'red',
  lightYellow = 'lightYellow',
  blue = 'blue',
  darkBlue = 'darkBlue',
  darkRed = 'darkRed',
  darkGreen = 'darkGreen',
  wood = 'wood',
  eventBlue = 'eventLightBlue',
  eventOrange = 'eventLightOrange',
  eventLightGreen = 'eventLightGreen',
  eventDarkGreen = 'eventDarkGreen',
  eventBlueTint = 'eventBlueTint',
  eventOrangeTint = 'eventOrangeTint',
  eventLightGreenTint = 'eventLightGreenTint',
  eventDarkGreenTint = 'eventDarkGreenTint',
  eventPurple = 'eventPurple',
  eventPurpleTint = 'eventPurpleTint',
}

interface StatusLabelProps {
  className?: string;
  text?: string | JSX.Element;
  variants?: statusVariants;
  style?: React.CSSProperties;
  onClickHandler?: (e?: any) => Promise<void>;
  isTooltip?: boolean;
  isBullet?: boolean;
}

const getLabelvariant = (variant: statusVariants | string) => {
  switch (variant) {
    case statusVariants.green:
      return 'bg-PrimaryGreen/10 text-PrimaryGreen';
    case statusVariants.lightYellow:
      return 'bg-PrimaryYellow/10 text-PrimaryYellow';
    case statusVariants.lightgray:
      return 'bg-LightGray text-PrimaryWood';
    case statusVariants.lightwoodBorder:
      return ' pb-1 border border-solid bg-transparent border-LightWood text-PrimaryWood';
    case statusVariants.gray:
      return 'text-black bg-LightGray';
    case statusVariants.LightWood:
      return 'text-PrimaryWood bg-LightWood';
    case statusVariants.red:
      return 'bg-PrimaryRed/10 text-PrimaryRed';
    case statusVariants.blue:
      return 'bg-PrimaryBlue/10 text-PrimaryBlue';
    case statusVariants.darkRed:
      return 'bg-PrimaryRed text-white';
    case statusVariants.darkBlue:
      return 'bg-PrimaryBlue text-white';
    case statusVariants.darkGreen:
      return 'bg-PrimaryGreen text-white';
    case statusVariants.wood:
      return 'bg-PrimaryWood text-LightWood';
    case statusVariants.eventBlue:
      return 'bg-eventBlue text-eventBlueTint';
    case statusVariants.eventPurple:
      return 'bg-eventPurple text-eventPurpleTint';
    case statusVariants.eventPurpleTint:
      return 'bg-eventPurpleTint text-eventPurple';
    case statusVariants.eventOrange:
      return 'bg-eventOrange text-eventOrangeTint';
    case statusVariants.eventLightGreen:
      return 'bg-eventLightGreen text-eventLightGreenTint';
    case statusVariants.eventDarkGreen:
      return 'bg-eventDarkGreen text-eventDarkGreenTint';
    case statusVariants.eventBlueTint:
      return 'bg-eventBlueTint text-eventBlue';
    case statusVariants.eventOrangeTint:
      return 'bg-eventOrangeTint text-eventOrange';
    case statusVariants.eventLightGreenTint:
      return 'bg-eventLightGreenTint text-eventLightGreen';
    case statusVariants.eventDarkGreenTint:
      return 'bg-eventDarkGreenTint text-eventDarkGreen';
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
  isBullet,
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
      {isBullet && (
        <span className="w-2 h-2 bg-current rounded-full inline-block mr-2" />
      )}
      {isTooltip ? (
        <ToolTip value={text} spanClass="capitalize" />
      ) : (
        <span className="capitalize">{text}</span>
      )}
    </Button>
  );
};

export default StatusLabel;
