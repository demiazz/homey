import { delegate } from "../../src";

describe("delegate", () => {
  afterEach(clearFixtures);

  it("adds listener for DOM events", () => {
    useFixture(`
      <div class="root">
        <div class="child"></div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const child = document.querySelector(".child");
    const listener = jasmine.createSpy("listener");

    delegate(subject, ".child", "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = createEvent("click");

    child.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it("adds listener for custom events", () => {
    useFixture(`
      <div class="root">
        <div class="child"></div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const child = document.querySelector(".child");
    const listener = jasmine.createSpy("listener");

    delegate(subject, ".child", "custom", listener);

    expect(listener).not.toHaveBeenCalled();

    const event = createEvent("custom");

    child.dispatchEvent(event);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(event);
  });

  it("adds listener which called on each event trigger", () => {
    useFixture(`
      <div class="root">
        <div class="child"></div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const child = document.querySelector(".child");
    const listener = jasmine.createSpy("listener");

    delegate(subject, ".child", "click", listener);

    expect(listener).not.toHaveBeenCalled();

    for (let i = 0; i < 5; i += 1) {
      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(listener).toHaveBeenCalledWith(event);
    }

    expect(listener).toHaveBeenCalledTimes(5);
  });

  it("returns function for removing listener", () => {
    useFixture(`
      <div class="root">
        <div class="child"></div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const child = document.querySelector(".child");
    const listener = jasmine.createSpy("listener");

    const off = delegate(subject, ".child", "click", listener);

    expect(listener).not.toHaveBeenCalled();

    const listenedEvent = createEvent("click");

    child.dispatchEvent(listenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);

    off();

    const unlistenedEvent = createEvent("click");

    child.dispatchEvent(unlistenedEvent);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(listenedEvent);
  });

  describe("when event triggered on element", () => {
    let subject;
    let listener;

    beforeEach(() => {
      useFixture(`<div class="root"></div>`);

      subject = document.querySelector(".root");
      listener = jasmine.createSpy("listener");
    });

    it("calls listener if element is matches by selector", () => {
      delegate(subject, ".root", "click", listener);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      subject.dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(event);
    });

    it("doesn't call listener unless element is matches by selector", () => {
      delegate(subject, ".foo", "click", listener);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      subject.dispatchEvent(event);

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe("when event triggered on child", () => {
    let subject;
    let child;
    let listener;

    beforeEach(() => {
      useFixture(`
        <div class="root">
          <div>
            <div class="child"></div>
          </div>
        </div>
      `);

      subject = document.querySelector(".root");
      child = document.querySelector(".child");
      listener = jasmine.createSpy("listener");
    });

    it("calls listener if child is matches by selector", () => {
      delegate(subject, ".child", "click", listener);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(event);
    });

    it("doesn't call listener unless child is matches by selector", () => {
      delegate(subject, ".foo", "click", listener);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe("when event triggered on subchild", () => {
    it("calls listener if subchild has a closest child which matches by selector", () => {
      useFixture(`
        <div class="root">
          <div>
            <div class="child">
              <div>
                <div class="subchild"></div>
              </div>
            </div>
          </div>
        </div>
      `);

      const subject = document.querySelector(".root");
      const subchild = document.querySelector(".subchild");
      const listener = jasmine.createSpy("listener");

      delegate(subject, ".child", "click", listener);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      subchild.dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(event);
    });

    it("doesn't call listener if subchild hasn't a closest child which matches by selector", () => {
      useFixture(`
        <div class="root">
          <div class="child"></div>
          <div>
            <div class="subchild"></div>
          </div>
        </div>
      `);

      const subject = document.querySelector(".root");
      const subchild = document.querySelector(".subchild");
      const listener = jasmine.createSpy("listener");

      delegate(subject, ".child", "click", listener);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      subchild.dispatchEvent(event);

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe("when element parent matches by selector", () => {
    let subject;
    let child;
    let listener;

    beforeEach(() => {
      useFixture(`
        <div class="parent">
          <div>
            <div class="root">
              <div>
                <div class="child"></div>
              </div>
            </div>
          </div>
        </div>
      `);

      subject = document.querySelector(".root");
      child = document.querySelector(".child");
      listener = jasmine.createSpy("listener");
    });

    it("doesn't calls listener if event triggered on element", () => {
      delegate(subject, ".parent", "click", listener);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      subject.dispatchEvent(event);

      expect(listener).not.toHaveBeenCalled();
    });

    it("doesn't calls listener if event triggered on child", () => {
      delegate(subject, ".parent", "click", listener);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
