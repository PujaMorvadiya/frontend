export interface IconInputProps {
  className?: string;
  onclick?: (
    e: React.MouseEvent<
      React.HTMLAttributes<HTMLElement> | React.SVGAttributes<SVGElement>
    >
  ) => void;
}
