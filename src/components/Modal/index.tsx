import { useEffect } from 'react';

export default function Modal({
  modalEl,
  setIsOpen,
}: {
  readonly modalEl: any;
  readonly setIsOpen: (isOpen: boolean) => void;
}) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!modalEl.current) return;

      if (!modalEl.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document?.addEventListener('click', handler, true);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [modalEl, setIsOpen]);
  return <></>;
}
