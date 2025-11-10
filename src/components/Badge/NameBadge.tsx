import { generateFirstLetter } from './Constants';

type Props = {
  parentClass?: string;
  FirstName?: string;
  LastName?: string;
  imgClassName?: string;
};

const NameBadge = (props: Props) => {
  const { parentClass, FirstName, LastName, imgClassName } = props;
  return (
    <div
      className={`${imgClassName ? `${imgClassName} flex items-center justify-center bg-PrimaryWood rounded-full text-white leading-none` : 'text-dark font-semibold text-sm rounded-full flex items-center justify-center w-full h-full bg-white border border-solid border-black/5'} ${parentClass || ''}`}
    >
      <span>
        {generateFirstLetter(FirstName)}
        {generateFirstLetter(LastName ? LastName?.slice(0) : '')}
      </span>
    </div>
  );
};

export default NameBadge;
