import delegate from "../../src/fn/delegate";

describe("fn/delegate", () => {
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

      delegate(subject, ".child", "click", listener);

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

      delegate(subject, ".child", "click", listener, true);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(event);
    });
  });

  describe("`delegateTarget`", () => {
    it("adds element as `delegateTarget` to event", () => {
      useFixture(`
        <div class="root">
          <div class="child"></div>
        </div>
      `);

      const subject = document.querySelector(".root");
      const child = document.querySelector(".child");
      const listener = jasmine.createSpy("listener").and.callFake(event => {
        expect(event.delegateTarget).toBe(subject);
      });

      delegate(subject, ".child", "click", listener);

      expect(listener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it("adds element as `delegateTarget` to event for each listener", () => {
      useFixture(`
        <div class="parent">
          <div class="root">
            <div class="child"></div>
          </div>
        </parent>
      `);

      const subject = document.querySelector(".root");
      const parent = document.querySelector(".parent");
      const child = document.querySelector(".child");

      const parentListener = jasmine
        .createSpy("parentListener")
        .and.callFake(event => {
          expect(event.delegateTarget).toBe(parent);
        });

      const subjectListener = jasmine
        .createSpy("subjectListener")
        .and.callFake(event => {
          expect(event.delegateTarget).toBe(subject);
        });

      delegate(parent, ".child", "click", parentListener);
      delegate(subject, ".child", "click", subjectListener);

      expect(parentListener).not.toHaveBeenCalled();
      expect(subjectListener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(parentListener).toHaveBeenCalledTimes(1);
      expect(subjectListener).toHaveBeenCalledTimes(1);
    });

    it("adds `delegateEvent` only for listener", () => {
      useFixture(`
        <div class="parent">
          <div class="root">
            <div class="child"></div>
          </div>
        </div>
      `);

      const subject = document.querySelector(".root");
      const child = document.querySelector(".child");
      const parent = document.querySelector(".parent");
      const subjectListener = jasmine
        .createSpy("subjectListener")
        .and.callFake(event => {
          expect(event.delegateTarget).toBe(subject);
        });
      const childListener = jasmine
        .createSpy("childListener")
        .and.callFake(event => {
          expect(event.delegateTarget).toBe(undefined);
        });
      const parentListener = jasmine
        .createSpy("parentListener")
        .and.callFake(event => {
          expect(event.delegateTarget).toBe(undefined);
        });

      delegate(subject, ".child", "click", subjectListener);
      child.addEventListener("click", childListener);
      parent.addEventListener("click", parentListener);

      expect(subjectListener).not.toHaveBeenCalled();
      expect(childListener).not.toHaveBeenCalled();
      expect(parentListener).not.toHaveBeenCalled();

      const event = createEvent("click");

      child.dispatchEvent(event);

      expect(subjectListener).toHaveBeenCalledTimes(1);
      expect(childListener).toHaveBeenCalledTimes(1);
      expect(parentListener).toHaveBeenCalledTimes(1);
    });
  });
});
