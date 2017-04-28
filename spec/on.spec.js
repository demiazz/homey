import { on } from "../src";

describe("on", () => {
  afterEach(clearFixtures);

  it("adds event listener", () => {
    useFixture(`<div class="root"></div>`);

    const subject = document.querySelector(".root");
    const listener = jasmine.createSpy("listener");

    on(subject, "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = document.createEvent("HTMLEvents");
    event.initEvent("click", true, true);

    subject.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });
});
