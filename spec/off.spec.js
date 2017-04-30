import { off } from "../src";

describe("off", () => {
  afterEach(clearFixtures);

  it("removes event listener", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    subject.addEventListener("click", listener);

    expect(listener).not.toHaveBeenCalled();

    const listenedEvent = document.createEvent("HTMLEvents");
    listenedEvent.initEvent("click", true, true);

    subject.dispatchEvent(listenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);

    off(subject, "click", listener);

    const event = document.createEvent("HTMLEvents");
    event.initEvent("click", true, true);

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);
  });

  describe("when given space-separated events types", () => {
    it("removes listener for each event type", () => {
      useFixture(`<div class="root"></div>`);

      const subject = document.querySelector(".root");
      const listener = jasmine.createSpy("listener");

      subject.addEventListener("click", listener);
      subject.addEventListener("custom-event", listener);

      expect(listener).not.toHaveBeenCalled();

      const listenedClickEvent = document.createEvent("HTMLEvents");
      listenedClickEvent.initEvent("click", true, true);

      const listenedCustomEvent = document.createEvent("HTMLEvents");
      listenedCustomEvent.initEvent("click", true, true);

      subject.dispatchEvent(listenedClickEvent);
      subject.dispatchEvent(listenedCustomEvent);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledWith(listenedClickEvent);
      expect(listener).toHaveBeenCalledWith(listenedCustomEvent);

      off(subject, "click custom-event", listener);

      const clickEvent = document.createEvent("HTMLEvents");
      clickEvent.initEvent("click", true, true);

      const customEvent = document.createEvent("HTMLEvents");
      customEvent.initEvent("click", true, true);

      subject.dispatchEvent(clickEvent);
      subject.dispatchEvent(customEvent);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledWith(listenedClickEvent);
      expect(listener).toHaveBeenCalledWith(listenedCustomEvent);
    });
  });
});
