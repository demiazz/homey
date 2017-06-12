import { before } from "../../src";

describe("before", () => {
  afterEach(clearFixtures);

  it("inserts given HTML string before of element", () => {
    useFixture(`
      <div class="root">
        <div class="child"></div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const child = document.querySelector(".child");

    before(child, "Text Node<span>Span Node</span>");

    expect(subject).toHaveSameHtml(`
      Text Node
      <span>Span Node</span>
      <div class="child"></div>
    `);
  });

  it("inserts given node before of element", () => {
    useFixture(`
      <div class="root">
        <div class="child"></div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const child = document.querySelector(".child");
    const textNode = document.createTextNode("Text Node");
    const elementNode = document.createElement("span");

    elementNode.textContent = "Span Node";

    before(child, textNode);
    before(child, elementNode);

    expect(subject).toHaveSameHtml(`
      Text Node
      <span>Span Node</span>
      <div class="child"></div>
    `);
  });

  it("inserts given nodes from node list before of element", () => {
    useFixture(`
      <div class="root">
        <div class="child"></div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const child = document.querySelector(".child");
    const fragment = document.createDocumentFragment();
    const textNode = document.createTextNode("Text Node");
    const elementNode = document.createElement("span");

    fragment.appendChild(textNode);
    fragment.appendChild(elementNode);

    elementNode.textContent = "Span Node";

    before(child, fragment.childNodes);

    expect(subject).toHaveSameHtml(`
      Text Node
      <span>Span Node</span>
      <div class="child"></div>
    `);
  });

  it("inserts given document fragment before of element", () => {
    useFixture(`
      <div class="root">
        <div class="child"></div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const child = document.querySelector(".child");
    const fragment = document.createDocumentFragment();
    const textNode = document.createTextNode("Text Node");
    const elementNode = document.createElement("span");

    fragment.appendChild(textNode);
    fragment.appendChild(elementNode);

    elementNode.textContent = "Span Node";

    before(child, fragment);

    expect(subject).toHaveSameHtml(`
      Text Node
      <span>Span Node</span>
      <div class="child"></div>
    `);
  });

  it("inserts given multiple arguments before of element", () => {
    useFixture(`
      <div class="root">
        <div class="child"></div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const child = document.querySelector(".child");
    const html = "HTML Text Node<span>Span from HTML</span>";
    const standaloneTextNode = document.createTextNode("Standalone Text Node");
    const standaloneElementNode = document.createElement("span");
    const fragment = document.createDocumentFragment();
    const textNode = document.createTextNode("Text Node from NodeList");
    const elementNode = document.createElement("span");

    standaloneElementNode.textContent = "Standalone Element Node";
    elementNode.textContent = "Element Node from NodeList";

    fragment.appendChild(textNode);
    fragment.appendChild(elementNode);

    before(
      child,
      html,
      standaloneTextNode,
      standaloneElementNode,
      fragment.childNodes
    );

    expect(subject).toHaveSameHtml(`
      HTML Text Node
      <span>Span from HTML</span>
      Standalone Text Node
      <span>Standalone Element Node</span>
      Text Node from NodeList
      <span>Element Node from NodeList</span>
      <div class="child"></div>
    `);
  });

  it("throws error when element haven't parent", () => {
    const subject = document.createElement("div");

    expect(() => before(subject, "<span>Node</span>")).toThrow(
      new Error("The element has no parent")
    );
  });
});
