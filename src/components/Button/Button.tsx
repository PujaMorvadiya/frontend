import { Tooltip } from 'react-tooltip';
import Loaders from '../Loaders';
import './style/index.css';
import { IButtonProps } from './types';

const getButtonClasses = (variant: string) => {
  switch (variant) {
    case 'black':
      return 'button black ';
    case 'blackBorder':
      return 'button blackBorder ';
    case 'PrimaryWoodBorder':
      return 'button PrimaryWoodBorder ';
    case 'PrimaryWood':
      return 'button PrimaryWood ';
    case 'PrimaryWoodLight':
      return 'button PrimaryWoodLight ';
    case 'PrimaryWoodLightBorder':
      return 'button PrimaryWoodLightBorder ';
    case 'RedOpacity':
      return 'button RedOpacity ';
    case 'Red':
      return 'button Red ';
    case 'GreenOpacity':
      return 'button GreenOpacity ';
    case 'Green':
      return 'button Green ';
    case 'OffWhite':
      return 'button OffWhite ';
    case 'Orange':
      return 'button Orange ';
    case 'Blue':
      return 'button Blue ';
    case 'White':
      return 'button White ';
    case 'Yellow':
      return 'button Yellow ';
    default:
      return '';
  }
};

const Button = ({
  small,
  className,
  children,
  type = 'button',
  disabled,
  onClickHandler,
  variants,
  value,
  name,
  isLoading,
  customStyle,
  tooltipText,
  tooltipPosition,
  isIcon,
}: IButtonProps) => {
  const tooltipId = name ? `btn-tooltip-${name}` : `btn-tooltip-${Math.random()}`;

  return (
    <>
      {onClickHandler || type !== 'button' ? (
        <>
          {tooltipText && (
            <Tooltip
              id={tooltipId}
              place={tooltipPosition ?? 'top'}
              className="!bg-black !text-xs font-bold !opacity-100 z-3 whitespace-normal break-words !rounded-md"
              style={{ maxWidth: '200px' }}
            />
          )}
          <button
            type={type}
            style={customStyle}
            disabled={disabled || isLoading}
            className={`${className ?? ''} 
              ${variants ? getButtonClasses(variants) : ''}  
              ${small ? '!py-1.5 !px-2.5 !font-normal' : ''} 
              ${isIcon ? '!px-2.5 h-fit !font-normal' : ''} 
              ${isLoading ? 'flex justify-center items-center gap-0.5' : ''}  
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={onClickHandler}
            name={name}
            data-tooltip-id={tooltipText ? tooltipId : undefined}
            data-tooltip-content={tooltipText}
          >
            {value}
            {children}
            {isLoading && <Loaders />}
          </button>
        </>
      ) : (
        <>
          {tooltipText && (
            <Tooltip
              id={tooltipId}
              place={tooltipPosition ?? 'top'}
              className="!bg-black !text-xs font-bold !opacity-100 z-3 whitespace-normal break-words !rounded-md"
              style={{ maxWidth: '200px' }}
            />
          )}
          <span
            style={customStyle}
            className={` ${small ? '!py-1.5 !px-2.5 !font-normal' : ''} 
              ${variants ? getButtonClasses(variants) : ''} 
              ${isIcon ? '!px-2.5 h-fit !font-normal' : ''}  
              ${className ?? ''}
            `}
            data-tooltip-id={tooltipId}
            data-tooltip-content={tooltipText}
          >
            {value}
            {children}
          </span>
        </>
      )}
    </>
  );
};

export default Button;
