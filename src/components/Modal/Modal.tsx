import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { ModalProps } from './ModalPropTypes';

export const Modal = ({ ...props }: ModalProps) => {
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const native = (e as any).nativeEvent;
    if (native && typeof native.stopImmediatePropagation === 'function') {
      native.stopImmediatePropagation();
    }
  };

  const handleModalMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const native = (e as any).nativeEvent;
    if (native && typeof native.stopImmediatePropagation === 'function') {
      native.stopImmediatePropagation();
    }
  };
  const handleCloseOutsideClick = () => {
    if (props.closeOnOutsideClick) props.modal.closeModal();
  };

  const modalRoot =
    typeof document !== 'undefined'
      ? (document.getElementById('root') ?? document.body)
      : null;

  const el = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const div = document.createElement('div');
    div.className = 'modal-container'; // Optional: for debug or styling
    return div;
  }, []);

  useEffect(() => {
    if (!modalRoot || !el || !props.modal.isOpen) return;

    modalRoot.appendChild(el);
    return () => {
      if (modalRoot.contains(el)) {
        modalRoot.removeChild(el);
      }
    };
  }, [props.modal.isOpen, modalRoot, el]);

  useEffect(() => {
    if (props?.closeOnEscape !== false && props?.modal.isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          props?.parentRequestManager?.current?.abort?.();
          props.modal.closeModal();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('overflow-hidden');
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.classList.remove('overflow-hidden');
      };
    }
  }, [props.modal.isOpen, props?.closeOnEscape]);

  if (!el || !props.modal.isOpen) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 w-full h-screen pt-4 px-4 flex items-center justify-center z-5 !bg-transparent"
      onClick={handleCloseOutsideClick}
    >
      <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50" />
      <div
        className={`modal-wrapper relative z-10 w-full ${props.width ? props.width : ' max-w-[800px]'} mx-auto`}
        onClick={handleModalClick}
        onMouseDown={handleModalMouseDown}
      >
        <div className="modal-inner bg-white rounded-xl relative">
          {props.headerSubText || props.headerTitle ? <Header {...props} /> : ''}
          <div className={`modal-body py-5 px-4 ${props.modalBodyClassName ?? ''}`}>
            <div
              className={`max-h-[calc(100vh_-_200px)] overflow-y-auto overflow-x-hidden p-1 style-scroll flex flex-col gap-4 ${
                props.modalBodyInnerClassName ?? ''
              }`}
            >
              {props.children}
            </div>
          </div>
          {props.showFooter && <Footer {...props} />}
        </div>
      </div>
    </div>,
    el
  );
};
