import { useEffect } from 'react';

const useClickaway = (ref, callback, escape = true) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(ref);
      }
    }
    // Bind the event listener
    document.addEventListener('click', handleClickOutside, false);
    if (escape) {
      document.addEventListener(
        'keydown',
        (event) => {
          if (event.key === 'Escape') {
            handleClickOutside(event);
          }
        },
        false
      );
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, [ref]);
};

export default useClickaway;
