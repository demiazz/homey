window.createEvent = function createEvent(type) {
  const event = document.createEvent("HTMLEvents");

  event.initEvent(type, true, true);

  return event;
};
