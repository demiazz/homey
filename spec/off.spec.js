import { off } from "../src";

describe("off", () => {
  afterEach(clearFixtures);

  it("removes event listener", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    subject.addEventListener("click", listener);

    expect(listener).not.toHaveBeenCalled();

    const listenedEvent = document.createEvent("HTMLEvents");
    listenedEvent.initEvent("click", true, true);

    subject.dispatchEvent(listenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);

    off(subject, "click", listener);

    const event = document.createEvent("HTMLEvents");
    event.initEvent("click", true, true);

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);
  });
});
