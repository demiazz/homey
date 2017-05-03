import { once } from "../src";

describe("once", () => {
  let subject;
  let listener;

  beforeEach(() => {
    useFixture(`<div class="root"></div>`);

    subject = document.querySelector(".root");
    listener = jasmine.createSpy("listener");
  });

  afterEach(clearFixtures);

  it("adds listener for DOM event", () => {
    once(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = createEvent("click");

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it("adds listener for custom event", () => {
    once(subject, "custom", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = createEvent("custom");

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it("adds listener which called on first event trigger only", () => {
    once(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const listenedEvent = createEvent("click");

    subject.dispatchEvent(listenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);

    const unlistenedEvent = createEvent("click");

    subject.dispatchEvent(unlistenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);
  });

  it("returns function for removing listener", () => {
    const off = once(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    off();

    const event = createEvent("click");

    subject.dispatchEvent(event);

    expect(listener).not.toHaveBeenCalled();
  });

  describe("when given space-separated events types list", () => {
    it("adds listener for DOM events", () => {
      once(subject, "click dblclick", listener);

      expect(listener).not.toHaveBeenCalled();

      const events = [createEvent("click"), createEvent("dblclick")];

      events.forEach(event => {
        subject.dispatchEvent(event);

        expect(listener).toHaveBeenCalledWith(event);
      });

      expect(listener).toHaveBeenCalledTimes(events.length);
    });

    it("adds listener for custom events", () => {
      once(subject, "foo bar", listener);

      expect(listener).not.toHaveBeenCalled();

      const events = [createEvent("foo"), createEvent("bar")];

      events.forEach(event => {
        subject.dispatchEvent(event);

        expect(listener).toHaveBeenCalledWith(event);
      });

      expect(listener).toHaveBeenCalledTimes(events.length);
    });

    it("adds listener which called on first trigger for each event", () => {
      once(subject, "click custom", listener);

      expect(listener).not.toHaveBeenCalled();

      const listenedEvents = [createEvent("click"), createEvent("custom")];

      listenedEvents.forEach(event => {
        subject.dispatchEvent(event);

        expect(listener).toHaveBeenCalledWith(event);
      });

      expect(listener).toHaveBeenCalledTimes(listenedEvents.length);

      const unlistenedEvents = [createEvent("click"), createEvent("custom")];

      unlistenedEvents.forEach(event => {
        subject.dispatchEvent(event);
      });

      expect(listener).toHaveBeenCalledTimes(listenedEvents.length);
    });

    it("returns function for removing listener for all event types", () => {
      const off = once(subject, "click custom", listener);

      expect(listener).not.toHaveBeenCalled();

      off();

      const events = [createEvent("click"), createEvent("custom")];

      events.forEach(event => {
        subject.dispatchEvent(event);
      });

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
