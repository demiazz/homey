import { dispatch } from "../../src";

describe("dispatch", () => {
  let root;
  let listener;

  beforeEach(() => {
    useFixture(`<div class="root"></div>`);

    root = document.querySelector(".root");
    listener = jasmine.createSpy("listener");
  });

  afterEach(clearFixtures);

  it("trigger DOM event", () => {
    root.addEventListener("click", listener);

    expect(listener).not.toHaveBeenCalled();

    dispatch(root, "click");

    expect(listener).toHaveBeenCalledTimes(1);

    const eventType = listener.calls.first().args[0].type;

    expect(eventType).toBe("click");
  });

  it("trigger custom event", () => {
    root.addEventListener("custom", listener);

    expect(listener).not.toHaveBeenCalled();

    dispatch(root, "custom");

    expect(listener).toHaveBeenCalledTimes(1);

    const eventType = listener.calls.first().args[0].type;

    expect(eventType).toBe("custom");
  });

  describe("`bubbles` option", () => {
    it("triggers event with `bubbles` equals to `true` by default", () => {
      root.addEventListener("click", listener);

      dispatch(root, "click");

      expect(listener.calls.first().args[0].bubbles).toBe(true);
    });

    it("triggers event with `bubbles` equals to given option", () => {
      root.addEventListener("click", listener);

      [true, false].forEach((bubbles, index) => {
        dispatch(root, "click", null, { bubbles });

        expect(listener.calls.argsFor(index)[0].bubbles).toBe(bubbles);
      });
    });
  });

  describe("`cancelable` option", () => {
    it("triggers event with `cancelable` equals to `true` by default", () => {
      root.addEventListener("click", listener);

      dispatch(root, "click");

      expect(listener.calls.first().args[0].cancelable).toBe(true);
    });

    it("triggers event with `cancelable` equals to given option", () => {
      root.addEventListener("click", listener);

      [true, false].forEach((cancelable, index) => {
        dispatch(root, "click", null, { cancelable });

        expect(listener.calls.argsFor(index)[0].cancelable).toBe(cancelable);
      });
    });
  });

  it("trigger event with empty details by default", () => {
    root.addEventListener("click", listener);

    dispatch(root, "click");

    const details = listener.calls.first().args[0].details;

    expect(details).toEqual({});
  });

  it("trigger event with given details", () => {
    const details = { key: "value" };

    root.addEventListener("click", listener);

    dispatch(root, "click", details);

    const eventDetails = listener.calls.first().args[0].details;

    expect(eventDetails).toBe(details);
  });

  it("returns `true` if no one listener doesn't call `preventDefault`", () => {
    root.addEventListener("click", () => {});

    expect(dispatch(root, "click")).toBe(true);
  });

  it("returns `false` if any listener calls `preventDefault`", () => {
    root.addEventListener("click", event => event.preventDefault());

    expect(dispatch(root, "click")).toBe(false);
  });
});
