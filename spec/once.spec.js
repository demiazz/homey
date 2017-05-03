import { once } from "../src";

describe("once", () => {
  afterEach(clearFixtures);

  it("adds event listener", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    once(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = createEvent("click");

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

    const listenedEvent = createEvent("click");

    subject.dispatchEvent(listenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);

    const event = createEvent("click");

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

    const event = createEvent("click");

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

      const clickEvent = createEvent("click");
      const customEvent = createEvent("custom-event");

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

      const listenedClickEvent = createEvent("click");
      const listenedCustomEvent = createEvent("custom-event");

      subject.dispatchEvent(listenedClickEvent);
      subject.dispatchEvent(listenedCustomEvent);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledWith(listenedClickEvent);
      expect(listener).toHaveBeenCalledWith(listenedCustomEvent);

      const clickEvent = createEvent("click");
      const customEvent = createEvent("custom-event");

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

      const clickEvent = createEvent("click");
      const customEvent = createEvent("custom-event");

      off();

      subject.dispatchEvent(clickEvent);
      subject.dispatchEvent(customEvent);

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
