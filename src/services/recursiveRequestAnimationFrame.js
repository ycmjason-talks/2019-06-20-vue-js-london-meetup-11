const recursiveRequestAnimationFrame = fn => {
  let stop = () => {};

  const id = window.requestAnimationFrame(() => {
    fn();
    stop = recursiveRequestAnimationFrame(fn);
  });

  return () => {
    window.cancelAnimationFrame(id);
    stop();
  };
};

export default recursiveRequestAnimationFrame;
