import { useRef, useState, useCallback } from 'react';

function useMenu() {
  const ref = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const open = useCallback(() => {
    setMenuOpen(true);
  }, [setMenuOpen]);

  const close = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  return {
    ref,
    open,
    close,
    menuProps: {
      anchorEl: ref.current,
      open: isMenuOpen,
      onClose: close,
    }
  };
}

export default useMenu;