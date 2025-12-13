import Button from 'components/Button/Button';
import React, { useEffect, useRef, useState } from 'react';
import { CourseTypeEnum } from './constants';

interface FilterComponentProps {
  setFilterOption: any;
  filterOption?: string;
}
const FilterComponent: React.FC<FilterComponentProps> = ({
  setFilterOption,
  filterOption,
}) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  // Ref to the options container
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const toggleOptionsVisibility = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click event from propagating
    setIsOptionsVisible((prev) => !prev);
  };

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    setFilterOption(option);
  };

  // Close the options if click is outside of the options container
  const handleClickOutside = (event: MouseEvent) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
      setIsOptionsVisible(false);
    }
  };

  // Add event listener for clicks outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className="calendar-filter-wrap">
      {/* Options container that is shown when isOptionsVisible is true */}
      {isOptionsVisible && (
        <div
          ref={optionsRef} // Attach ref to the options container
          className="calendar-filter-options options-container"
        >
          {Object.values(CourseTypeEnum).map((option) => (
            <Button
              key={option}
              className={`option ${filterOption === option ? 'selected' : ''}`}
              onClickHandler={() => handleOptionSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
