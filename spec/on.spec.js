import { on } from "../src";

describe("on", () => {
  afterEach(clearFixtures);

  it("adds event listener", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    on(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = document.createEvent("HTMLEvents");
    event.initEvent("click", true, true);

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it("returns function for removing event listener", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    const off = on(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const listenedEvent = document.createEvent("HTMLEvents");
    listenedEvent.initEvent("click", true, true);

    subject.dispatchEvent(listenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);

    off();

    const event = document.createEvent("HTMLEvents");
    event.initEvent("click", true, true);

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);
  });

  describe("when given space-separated events types", () => {
    it("adds event listener for each given event type", () => {
      useFixture(`<div class="root"></div>`);

      const subject = document.querySelector(".root");
      const listener = jasmine.createSpy("listener");

      on(subject, "click custom-event", listener);

      expect(listener).not.toHaveBeenCalled();

      const clickEvent = document.createEvent("HTMLEvents");
      clickEvent.initEvent("click", true, true);

      const customEvent = document.createEvent("HTMLEvents");
      customEvent.initEvent("click", true, true);

      subject.dispatchEvent(clickEvent);
      subject.dispatchEvent(customEvent);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledWith(clickEvent);
      expect(listener).toHaveBeenCalledWith(customEvent);
    });

    it("returns function for removing event listener for all given event types", () => {
      useFixture(`<div class="root"></div>`);

      const subject = document.querySelector(".root");
      const listener = jasmine.createSpy("listener");

      const off = on(subject, "click custom-event", listener);

      expect(listener).not.toHaveBeenCalled();

      const listenedClickEvent = document.createEvent("HTMLEvents");
      listenedClickEvent.initEvent("click", true, true);

      const listenedCustomEvent = document.createEvent("HTMLEvents");
      listenedCustomEvent.initEvent("custom-event", true, true);

      subject.dispatchEvent(listenedClickEvent);
      subject.dispatchEvent(listenedCustomEvent);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledWith(listenedClickEvent);
      expect(listener).toHaveBeenCalledWith(listenedCustomEvent);

      off();

      const clickEvent = document.createEvent("HTMLEvents");
      clickEvent.initEvent("click", true, true);

      const customEvent = document.createEvent("HTMLEvents");
      customEvent.initEvent("custom-event", true, true);

      subject.dispatchEvent(clickEvent);
      subject.dispatchEvent(customEvent);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledWith(listenedClickEvent);
      expect(listener).toHaveBeenCalledWith(listenedCustomEvent);
    });
  });
});
