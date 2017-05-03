import { on } from "../src";

describe("on", () => {
  afterEach(clearFixtures);

  it("adds event listener", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    on(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = createEvent("click");

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

    const listenedEvent = createEvent("click");

    subject.dispatchEvent(listenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);

    off();

    const event = createEvent("click");

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

      const clickEvent = createEvent("click");
      const customEvent = createEvent("custom-event");

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

      const listenedClickEvent = createEvent("click");
      const listenedCustomEvent = createEvent("custom-event");

      subject.dispatchEvent(listenedClickEvent);
      subject.dispatchEvent(listenedCustomEvent);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledWith(listenedClickEvent);
      expect(listener).toHaveBeenCalledWith(listenedCustomEvent);

      off();

      const clickEvent = createEvent("click");
      const customEvent = createEvent("custom-event");

      subject.dispatchEvent(clickEvent);
      subject.dispatchEvent(customEvent);

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledWith(listenedClickEvent);
      expect(listener).toHaveBeenCalledWith(listenedCustomEvent);
    });
  });
});
