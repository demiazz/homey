import once from "../../src/fn/once";

describe("fn/once", () => {
  afterEach(clearFixtures);

  it("adds listener for DOM event", () => {
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

  it("adds listener for custom event", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    once(subject, "custom", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = createEvent("custom");

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it("adds listener which called on first event trigger only", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

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

  describe("supports events capturing", () => {
    it("doesn't use capturing by default", () => {
      useFixture(`
        <div class="root">
          <div class="child"></div>
        </div>
      `);

      const subject = document.querySelector(".root");
      const child = document.querySelector(".child");
      const listener = jasmine.createSpy("listener").and.callFake(event => {
        expect(event.eventPhase).toBe(Event.BUBBLING_PHASE);
      });

      once(subject, "click", listener);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(event);
    });

    it("uses capturing when flag given", () => {
      useFixture(`
        <div class="root">
          <div class="child"></div>
        </div>
      `);

      const subject = document.querySelector(".root");
      const child = document.querySelector(".child");
      const listener = jasmine.createSpy("listener").and.callFake(event => {
        expect(event.eventPhase).toBe(Event.CAPTURING_PHASE);
      });

      once(subject, "click", listener, true);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(event);
    });
  });
});
