import { after } from "../../src";

describe("after", () => {
  afterEach(clearFixtures);

  it("inserts given HTML string after of element", () => {
    useFixture(`
      <div class="root">
        <div class="child"></div>
      </div>
    `);

    const subject = document.querySelector(".root");
    const child = document.querySelector(".child");

    after(child, "Text Node<span>Span Node</span>");

    expect(subject).toHaveSameHtml(`
      <div class="child"></div>
      Text Node
      <span>Span Node</span>
    `);
  });

  it("inserts given node after of element", () => {
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

    after(child, textNode);
    after(child, elementNode);

    expect(subject).toHaveSameHtml(`
      <div class="child"></div>
      <span>Span Node</span>
      Text Node
    `);
  });

  it("inserts given nodes from node list after of element", () => {
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

    after(child, fragment.childNodes);

    expect(subject).toHaveSameHtml(`
      <div class="child"></div>
      Text Node
      <span>Span Node</span>
    `);
  });

  it("inserts given document fragment after of element", () => {
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

    after(child, fragment);

    expect(subject).toHaveSameHtml(`
      <div class="child"></div>
      Text Node
      <span>Span Node</span>
    `);
  });

  it("inserts given multiple arguments after of element", () => {
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

    after(
      child,
      html,
      standaloneTextNode,
      standaloneElementNode,
      fragment.childNodes
    );

    expect(subject).toHaveSameHtml(`
      <div class="child"></div>
      HTML Text Node
      <span>Span from HTML</span>
      Standalone Text Node
      <span>Standalone Element Node</span>
      Text Node from NodeList
      <span>Element Node from NodeList</span>
    `);
  });

  it("throws error when element haven't parent", () => {
    const subject = document.createElement("div");

    expect(() => after(subject, "<span>Node</span>")).toThrow(
      new Error("The element has no parent")
    );
  });
});
