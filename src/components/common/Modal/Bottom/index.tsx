import { ReactNode, useEffect, useRef } from 'react';
import classNames from 'classnames';
import useIsModalOpen from '@/hooks/useIsModalOpen';
import styles from './styles.module.scss';

interface ModalProps {
  variant?: 'default' | 'primary';
  headerText?: string;
  isModalOpen: boolean;
  onClickCloseModal: () => void;
  children: ReactNode;
}

interface VariantTypes {
  default: string;
  primary: string;
}

const VARIANTS: VariantTypes = {
  default: styles.modal_section__default,
  primary: styles.modal_section__primary,
};

export default function ModalBottom({
  variant = 'default',
  headerText,
  isModalOpen,
  onClickCloseModal,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node | null)
      ) {
        onClickCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClickCloseModal]);

  const isOpen = useIsModalOpen(isModalOpen, 100);
  if (!isOpen) return null;

  return (
    <div
      className={
        isOpen
          ? `${styles.modal} ${styles.modal__opened}`
          : `${styles.modal} ${styles.closed}`
      }
    >
      <div className={styles.modal_container}>
        <section
          className={classNames(
            VARIANTS[variant as keyof VariantTypes],
            isModalOpen
              ? `${styles.modal_section} ${styles.modal_section__opened}`
              : `${styles.modal_section} ${styles.modal_section__closed}`,
          )}
        >
          <header className={styles.modal_header}>
            {headerText}
            <button
              className={styles.modal_header__button}
              onClick={onClickCloseModal}
            >
              &times;
            </button>
          </header>
          <main className={styles.modal_main}>{children}</main>
        </section>
      </div>
    </div>
  );
}
