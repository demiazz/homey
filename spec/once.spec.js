import { once } from "../src";

describe("once", () => {
  afterEach(clearFixtures);

  it("adds event listener", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    once(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = document.createEvent("HTMLEvents");
    event.initEvent("click", true, true);

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it("adds event listener which will be raised only once", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    once(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const listenedEvent = document.createEvent("HTMLEvents");
    listenedEvent.initEvent("click", true, true);

    subject.dispatchEvent(listenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);

    const event = document.createEvent("HTMLEvents");
    event.initEvent("click", true, true);

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);
  });

  it("returns function for removing event listener", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    const off = once(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    off();

    const event = document.createEvent("HTMLEvents");
    event.initEvent("click", true, true);

    subject.dispatchEvent(event);

    expect(listener).not.toHaveBeenCalled();
  });

  describe("when given space-separated events types", () => {
    it("adds event listener for each given event type", () => {
      useFixture(`<div class="root"></div>`);

      const subject = document.querySelector(".root");
      const listener = jasmine.createSpy("listener");

      once(subject, "click custom-event", listener);

      expect(listener).not.toHaveBeenCalled();

      const clickEvent = document.createEvent("HTMLEvents");
      clickEvent.initEvent("click", true, true);

      const customEvent = document.createEvent("HTMLEvents");
      customEvent.initEvent("custom-event", true, true);

      subject.dispatchEvent(clickEvent);
      subject.dispatchEvent(customEvent);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledWith(clickEvent);
      expect(listener).toHaveBeenCalledWith(customEvent);
    });

    it("adds event listener which will be raised only once for each event type", () => {
      useFixture(`<div class="root"></div>`);

      const subject = document.querySelector(".root");
      const listener = jasmine.createSpy("listener");

      once(subject, "click custom-event", listener);

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

    it("returns function for removing listener for all event types", () => {
      useFixture(`<div class="root"></div>`);

      const subject = document.querySelector(".root");
      const listener = jasmine.createSpy("listener");

      const off = once(subject, "click custom-event", listener);

      expect(listener).not.toHaveBeenCalled();

      const clickEvent = document.createEvent("HTMLEvents");
      clickEvent.initEvent("click", true, true);

      const customEvent = document.createEvent("HTMLEvents");
      customEvent.initEvent("custom-event", true, true);

      off();

      subject.dispatchEvent(clickEvent);
      subject.dispatchEvent(customEvent);

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
