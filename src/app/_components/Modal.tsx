import ReactModal from 'react-modal';
import styles from './modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaHideApp: boolean;
};

const SearchModal = ({ isOpen, onClose, children, ariaHideApp }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Modal"
      className={styles.modalContainer}
    >
      {children}
    </ReactModal>
  );
};

export default SearchModal;
