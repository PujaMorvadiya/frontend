import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  url: string;
  label: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  variant?: 'slash' | 'arrow';
  className?: string;
}

const Breadcrumbs = ({
  items = [],
  variant = 'arrow',
  className = '',
}: BreadcrumbsProps) => {
  return (
    <div className={`breadcrumbs  mb-3  ${className}`}>
      <ul className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              className={`breadcrumb-item  text-black/50 hover:no-underline ${variant === 'arrow' ? 'after:content-[""] after:bg-rightArrow after:bg-no-repeat after:w-[18px] after:h-[18px] after:justify-center after:items-center after:inline-flex flex items-center last:after:hidden after:opacity-20' : ' after:mx-1 after:content-["/"] last:after:hidden '}`}
              key={item.url + index}
            >
              {isLast ? (
                <span title={item.label} className="text-sm text-black ">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    className="text-sm text-black hover:underline"
                    to={item.url}
                    title={item.label}
                  >
                    {item.label}
                  </Link>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
