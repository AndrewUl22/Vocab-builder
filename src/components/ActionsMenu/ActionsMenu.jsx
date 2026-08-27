import { useEffect, useRef, useState } from 'react';
import { DotsIcon, EditIcon, TrashIcon } from '../icons/MenuIcons';
import styles from './ActionsMenu.module.css';

const ActionsMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Word actions"
        aria-expanded={isOpen}
      >
        <DotsIcon />
      </button>

      {isOpen && (
        <div className={styles.popover} role="menu">
          <button
            type="button"
            className={styles.item}
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
          >
            <EditIcon /> Edit
          </button>
          <button
            type="button"
            className={`${styles.item} ${styles.danger}`}
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
          >
            <TrashIcon /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsMenu;
