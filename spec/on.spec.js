import { on } from "../src";

describe("on", () => {
  let subject;
  let listener;

  beforeEach(() => {
    useFixture(`<div class="root"></div>`);

    subject = document.querySelector(".root");
    listener = jasmine.createSpy("listener");
  });

  afterEach(clearFixtures);

  it("adds listener for DOM event", () => {
    on(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = createEvent("click");

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it("adds listener for custom event", () => {
    on(subject, "custom", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = createEvent("custom");

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it("adds listener which called on each event trigger", () => {
    on(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    for (let i = 0; i < 5; i += 1) {
      const event = createEvent("click");

      subject.dispatchEvent(event);

      expect(listener).toHaveBeenCalledWith(event);
    }

    expect(listener).toHaveBeenCalledTimes(5);
  });

  it("returns function for removing listener", () => {
    const off = on(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const listenedEvent = createEvent("click");

    subject.dispatchEvent(listenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);

    off();

    const unlistenedEvent = createEvent("click");

    subject.dispatchEvent(unlistenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);
  });

  describe("when given space-separated events types list", () => {
    it("adds listener for DOM events", () => {
      on(subject, "click dblclick", listener);

      expect(listener).not.toHaveBeenCalled();

      const events = [createEvent("click"), createEvent("dblclick")];

      events.forEach(event => {
        subject.dispatchEvent(event);

        expect(listener).toHaveBeenCalledWith(event);
      });

      expect(listener).toHaveBeenCalledTimes(events.length);
    });

    it("adds listener for custom events", () => {
      on(subject, "foo bar", listener);

      expect(listener).not.toHaveBeenCalled();

      const events = [createEvent("foo"), createEvent("bar")];

      events.forEach(event => {
        subject.dispatchEvent(event);

        expect(listener).toHaveBeenCalledWith(event);
      });

      expect(listener).toHaveBeenCalledTimes(events.length);
    });

    it("adds listener which called on each event trigger", () => {
      on(subject, "click custom", listener);

      expect(listener).not.toHaveBeenCalled();

      for (let i = 0; i < 5; i += 1) {
        const events = [createEvent("click"), createEvent("custom")];

        // eslint-disable-next-line
        events.forEach(event => {
          subject.dispatchEvent(event);

          expect(listener).toHaveBeenCalledWith(event);
        });
      }

      expect(listener).toHaveBeenCalledTimes(10);
    });

    it("returns function for removing listener for all event types", () => {
      const off = on(subject, "click custom", listener);

      expect(listener).not.toHaveBeenCalled();

      const listenedEvents = [createEvent("click"), createEvent("custom")];

      listenedEvents.forEach(event => {
        subject.dispatchEvent(event);

        expect(listener).toHaveBeenCalledWith(event);
      });

      expect(listener).toHaveBeenCalledTimes(listenedEvents.length);

      off();

      [createEvent("click"), createEvent("custom")].forEach(event => {
        subject.dispatchEvent(event);
      });

      expect(listener).toHaveBeenCalledTimes(listenedEvents.length);
    });
  });
});
