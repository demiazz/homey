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
});
