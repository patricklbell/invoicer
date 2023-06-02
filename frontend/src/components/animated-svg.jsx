import { useEffect, useId } from 'react';
import Vivus from 'vivus';

const AnimatedSvg = ({ config, resize = true, as: As, ...otherProps }) => {
  const id = useId();

  useEffect(() => {
    const vivusObject = new Vivus(id, config);

    if (resize) {
      // Create your observer and set up a callback on resize
      const resizeObserver = new ResizeObserver(() => {
        // Recalculate the line lengths
        vivusObject.recalc();
      });
      resizeObserver.observe(vivusObject.el);
    }
  }, []);

  return <As id={id} {...otherProps} />;
};

export default AnimatedSvg;
