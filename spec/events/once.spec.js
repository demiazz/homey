import { once } from "../../src";

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
});
