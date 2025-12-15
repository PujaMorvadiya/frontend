import Image from 'components/Image';
import SearchComponent from 'components/search';
import React, { Children, cloneElement, useEffect, useState } from 'react';
import { TabComponentProps, TabProps } from './types';

const TabComponent: React.FC<TabComponentProps> & { Tab: React.FC<TabProps> } = ({
  current,
  children,
  searchable,
  onSearch,
  onTabChange,
  sideComponent,
  className,
  scrollable,
  hideContent = false,
}: TabComponentProps) => {
  const [currentTabKey, setCurrentTabKey] = useState<string | undefined>(current);

  useEffect(() => {
    setCurrentTabKey(current);
  }, [current]);

  const handleTabClick = (tabKey: string) => {
    setCurrentTabKey(tabKey);
    if (onTabChange) {
      onTabChange(tabKey);
    }
  };

  const getActiveTabTitle = (): string => {
    const activeTabElement = Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) && child.props.uniqueKey === currentTabKey
    );

    if (React.isValidElement<TabProps>(activeTabElement)) {
      return activeTabElement.props.title ?? '';
    }

    return '';
  };

  return (
    <div className={`tab-wrapper ${className || ''}`}>
      <div className="tab-header flex flex-wrap justify-between w-full gap-y-4">
        <div
          className={`tab-items w-full flex items-center relative [&:has(.tab-item.fill)]:w-auto  ${scrollable ? 'style-scroll overflow-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-black/10 pb-1' : ''}`}
        >
          {Children.map(children, (child) =>
            React.isValidElement<TabProps>(child)
              ? cloneElement(child, {
                isActive: child.props.uniqueKey === currentTabKey,
                onClick: () => handleTabClick(child.props.uniqueKey),
              })
              : null
          )}
        </div>
        {sideComponent}
        {searchable && (
          <SearchComponent
            parentClass="mb-2.5 max-w-[320px]"
            onSearch={onSearch}
            placeholder={`Search ${getActiveTabTitle()}`}
          />
        )}
      </div>
      {hideContent ? null : (
        <div className="tab-content  mt-4">
          {Children.map(children, (child) =>
            React.isValidElement<TabProps>(child) &&
              child.props.uniqueKey === currentTabKey
              ? child.props.children
              : null
          )}
        </div>
      )}
    </div>
  );
};

const Tab: React.FC<TabProps> = ({
  title,
  isActive,
  onClick,
  icon,
  count,
  variant,
}: Omit<TabProps, 'children'>) => {
  return (
    <div
      className={`tab-item cursor-pointer leading-none px-18px pb-4 text-lg  relative flex items-center gap-2 text-center
        ${variant === 'fill' ? 'fill bg-white text-black py-4 px-6 rounded-full border border-solid border-LightWood before:opacity-0 transition-all duration-300 ml-2 first:ml-0' : ' '} 
        ${isActive ? ' active font-medium text-black' : ' text-black/50'}
        ${isActive && variant === 'fill' ? ' !bg-black text-white border-black' : ''}
      `}
      onClick={onClick}
    // TODO: add logic to do conditional blurring for paid variations in dictionary
    // style={{ filter: 'blur(3px)' }}
    >
      {icon && (
        <span className="inline-block w-4 h-4 me-1">
          <Image iconClassName="w-full h-full" iconName={icon} />
        </span>
      )}
      {title}
      {count && count >= 0 && (
        <span className="update w-6 h-6 bg-PrimaryRed text-white leading-none aspect-square px-1 rounded-full text-sm flex items-center justify-center">
          {count >= 10 ? count : `0${count}`}
        </span>
      )}
    </div>
  );
};

TabComponent.Tab = Tab;

export default TabComponent;
