const disableScroll = function(disabled) {
  document.body.style.overflow = disabled ? 'hidden' : '';
};

export { disableScroll };
