import on from "../../src/fn/on";

describe("fn/on", () => {
  afterEach(clearFixtures);

  it("adds listener for DOM event", () => {
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

  it("adds listener for custom event", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    on(subject, "custom", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = createEvent("custom");

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it("adds listener which called on each event trigger", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

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

    const unlistenedEvent = createEvent("click");

    subject.dispatchEvent(unlistenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);
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

      on(subject, "click", listener);

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

      on(subject, "click", listener, true);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(event);
    });
  });
});
