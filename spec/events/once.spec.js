import { once } from "../../src";

describe("once", () => {
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
        <div class="parent">
          <div class="root">
            <div class="child"></child>
          </div>
        </div>
      `);

      const parent = document.querySelector(".parent");
      const subject = document.querySelector(".root");
      const child = document.querySelector(".child");
      const parentListener = jasmine.createSpy("parentListener");
      const subjectListener = jasmine.createSpy("subjectListener");

      once(parent, "click", parentListener);
      once(subject, "click", subjectListener);

      expect(parentListener).not.toHaveBeenCalled();
      expect(subjectListener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(parentListener).toHaveBeenCalledTimes(1);
      expect(parentListener).toHaveBeenCalledWith(event);
      expect(subjectListener).toHaveBeenCalledTimes(1);
      expect(subjectListener).toHaveBeenCalledWith(event);
      expect(subjectListener).toHaveBeenCalledBefore(parentListener);
    });

    it("uses capturing when flag given", () => {
      useFixture(`
        <div class="parent">
          <div class="root">
            <div class="child"></child>
          </div>
        </div>
      `);

      const parent = document.querySelector(".parent");
      const subject = document.querySelector(".root");
      const child = document.querySelector(".child");
      const parentListener = jasmine.createSpy("parentListener");
      const subjectListener = jasmine.createSpy("subjectListener");

      once(parent, "click", parentListener, true);
      once(subject, "click", subjectListener, true);

      expect(parentListener).not.toHaveBeenCalled();
      expect(subjectListener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(parentListener).toHaveBeenCalledTimes(1);
      expect(parentListener).toHaveBeenCalledWith(event);
      expect(subjectListener).toHaveBeenCalledTimes(1);
      expect(subjectListener).toHaveBeenCalledWith(event);
      expect(parentListener).toHaveBeenCalledBefore(subjectListener);
    });
  });
});
