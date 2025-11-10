import { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';

interface tooltipProps {
  id: number | undefined;
  value: string | undefined;
  characters: number;
  className?: string;
  emptyText?: string;
}

const TooltipShow = ({
  id,
  value,
  characters,
  className,
  emptyText = '-',
}: tooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const spanElement: any = spanRef.current;
      if (spanElement) {
        const spanWidth = spanElement.offsetWidth;
        const spanScrollWidth = spanElement.scrollWidth;
        setShowTooltip(spanScrollWidth > spanWidth);
      }
    };
    // Listen for window resize to update the showTooltip state
    window.addEventListener('resize', handleResize);

    // Initial check after the component has been mounted
    requestAnimationFrame(handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [value]);

  const name = value ? String(value)?.slice(0, characters) : null;
  const spanRef = useRef(null);
  return (
    <>
      {name && value ? (
        <>
          <span
            // className="cursor-pointer overflow-hidden"
            style={{
              whiteSpace: 'nowrap',
              position: 'relative',
              display: 'inline-block',
              maxWidth: '100%',
            }} // Ensure text remains on a single line and respects width
          >
            <span
              className="cursor-pointer overflow-hidden"
              data-tooltip-id={`index-${id || 1}-${name.replace(
                /[^a-zA-Z0-9]/g,
                ''
              )}`}
              ref={spanRef}
              data-tooltip-content={value}
              style={{
                textOverflow: 'ellipsis',
                display: 'inline-block',
                maxWidth: '100%',
              }}
            >
              {value}
            </span>
          </span>
          {showTooltip && (
            <Tooltip
              className="!bg-black !text-xs font-bold !opacity-100 z-3 whitespace-normal break-words !rounded-md"
              id={`index-${id || 1}-${name.replace(/[^a-zA-Z0-9]/g, '')}`}
              style={{ maxWidth: '200px' }}
              place="top"
            />
          )}
        </>
      ) : (
        <span className="cursor-pointer">{value ?? emptyText}</span>
      )}
    </>
  );
};
export default TooltipShow;
