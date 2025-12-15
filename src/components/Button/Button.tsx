import ToolTip from 'components/Tooltip';
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
      return 'button Blue';
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
  isIcon,
  tooltipPosition,
  spanClass,
  ariaLabel,
  // parentClass,
}: IButtonProps) => {
  return (
    <>
      {onClickHandler || type !== 'button' ? (
        <button
          type={type}
          style={customStyle}
          disabled={disabled || isLoading}
          className={`${className ?? ''} 
          ${variants ? getButtonClasses(variants) : ''}  
          ${tooltipText ? 'relative group' : ''} 
          ${small ? ' !py-1.5 !px-2.5 !font-normal ' : ''} 
          ${isIcon ? ' !px-2.5 h-fit !font-normal ' : ''} 
          ${isLoading ? 'flex justify-center items-center gap-0.5' : ''}  
          ${disabled && 'opacity-80 cursor-not-allowed'}
          `}
          onClick={onClickHandler}
          name={name}
          aria-label={ariaLabel}
        >
          {value}
          {children}
          {isLoading && <Loaders />}
          {tooltipText && (
            <ToolTip
              text={tooltipText}
              position={`${tooltipPosition ?? 'left'}`}
              spanClass={spanClass}
            />
          )}
        </button>
      ) : (
        <span
          style={customStyle}
          className={` ${tooltipText ? 'relative group' : ''} 
          ${small ? ' !py-1.5 !px-2.5 !font-normal ' : ''} 
          ${variants ? getButtonClasses(variants) : ''} 
          ${isIcon ? ' !px-2.5 h-fit !font-normal ' : ''}  
          ${className ?? ''}
          `}
          aria-label={ariaLabel}
        >
          {value}
          {children}
          {tooltipText && (
            <ToolTip
              text={tooltipText}
              position={`${tooltipPosition ?? 'left'}`}
              spanClass={spanClass}
            />
          )}
        </span>
      )}
      {/* <div className={parentClass || ''}>
    </div> */}
    </>
  );
};

export default Button;
