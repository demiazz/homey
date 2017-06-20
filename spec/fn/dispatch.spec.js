import dispatch from "../../src/fn/dispatch";

describe("fn/dispatch", () => {
  afterEach(clearFixtures);

  let subject;
  let listener;

  beforeEach(() => {
    useFixture(`<div class="root"></div>`);

    subject = document.querySelector(".root");
    listener = jasmine.createSpy("listener");
  });

  describe("event types", () => {
    it("triggers DOM event", () => {
      listener.and.callFake(event => {
        expect(event.type).toBe("click");
      });

      subject.addEventListener("click", listener);

      expect(listener).not.toHaveBeenCalled();

      dispatch(subject, "click");

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it("triggers custom event", () => {
      listener.and.callFake(event => {
        expect(event.type).toBe("custom");
      });

      subject.addEventListener("custom", listener);

      expect(listener).not.toHaveBeenCalled();

      dispatch(subject, "custom");

      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe("event detail", () => {
    it("triggers event with `detail` equals to `null` by default", () => {
      listener.and.callFake(event => {
        expect(event.detail).toEqual({});
      });

      subject.addEventListener("click", listener);

      dispatch(subject, "click");

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it("triggers event with given `detail`", () => {
      const detail = { hello: "world" };

      listener = jasmine.createSpy("listener").and.callFake(event => {
        expect(event.detail).toBe(detail);
      });

      subject.addEventListener("click", listener);

      dispatch(subject, "click", detail);

      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe("event options", () => {
    describe("`bubbles` option", () => {
      it("triggers event with `bubbles` equals to `true` by default", () => {
        listener.and.callFake(event => {
          expect(event.bubbles).toBe(true);
        });

        subject.addEventListener("click", listener);

        dispatch(subject, "click");

        expect(listener).toHaveBeenCalledTimes(1);
      });

      it("triggers event with given `bubbles` option", () => {
        [true, false].forEach(bubbles => {
          listener = jasmine.createSpy("listener").and.callFake(event => {
            expect(event.bubbles).toBe(bubbles);
          });

          subject.addEventListener("click", listener);

          dispatch(subject, "click", null, { bubbles });

          expect(listener).toHaveBeenCalledTimes(1);

          subject.removeEventListener("click", listener);
        });
      });
    });

    describe("`cancelable` option", () => {
      it("triggers event with `cancelable` equals to `true` by default", () => {
        listener.and.callFake(event => {
          expect(event.cancelable).toBe(true);
        });

        subject.addEventListener("click", listener);

        dispatch(subject, "click");

        expect(listener).toHaveBeenCalledTimes(1);
      });

      it("triggers event with given `cancelable` option", () => {
        [true, false].forEach(cancelable => {
          listener = jasmine.createSpy("listener").and.callFake(event => {
            expect(event.cancelable).toBe(cancelable);
          });

          subject.addEventListener("click", listener);

          dispatch(subject, "click", null, { cancelable });

          expect(listener).toHaveBeenCalledTimes(1);

          subject.removeEventListener("click", listener);
        });
      });
    });
  });

  describe("preventing", () => {
    it("returns `true` if no one listener doesn't call `preventDefault`", () => {
      subject.addEventListener("click", listener);

      expect(dispatch(subject, "click")).toBe(true);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it("returns `false` if any listener calls `preventDefault`", () => {
      listener.and.callFake(event => {
        event.preventDefault();
      });

      subject.addEventListener("click", listener);

      expect(dispatch(subject, "click")).toBe(false);
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
});
