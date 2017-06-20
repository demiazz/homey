import { append } from "../../src";

describe("append", () => {
  afterEach(clearFixtures);

  it("inserts given HTML string to end of element", () => {
    useFixture(`
      <div class="root">
        Text Node
        <span>Existing Node</span>
      </div>
    `);

    const subject = document.querySelector(".root");

    append(subject, "New Text Node<span>Span Node</span>");

    expect(subject).toHaveSameHtml(`
      Text Node
      <span>Existing Node</span>
      New Text Node
      <span>Span Node</span>
    `);
  });

  it("inserts given node to begin of element", () => {
    useFixture(`
      <div class="root">
        Text Node
        <span>Existing Node</span>
      </div>
    `);

    const textNode = document.createTextNode("New Text Node");
    const elementNode = document.createElement("span");
    const subject = document.querySelector(".root");

    elementNode.textContent = "Span Node";

    append(subject, elementNode);
    append(subject, textNode);

    expect(subject).toHaveSameHtml(`
      Text Node
      <span>Existing Node</span>
      <span>Span Node</span>
      New Text Node
    `);
  });

  it("inserts given nodes from node list to begin of element", () => {
    useFixture(`
      <div class="root">
        Text Node
        <span>Existing Node</span>
      </div>
    `);

    const fragment = document.createDocumentFragment();
    const textNode = document.createTextNode("New Text Node");
    const elementNode = document.createElement("span");

    fragment.appendChild(textNode);
    fragment.appendChild(elementNode);

    elementNode.textContent = "Span Node";

    const subject = document.querySelector(".root");

    append(subject, fragment.childNodes);

    expect(subject).toHaveSameHtml(`
      Text Node
      <span>Existing Node</span>
      New Text Node
      <span>Span Node</span>
    `);
  });

  it("inserts given document fragment to begin of element", () => {
    useFixture(`
      <div class="root">
        Text Node
        <span>Existing Node</span>
      </div>
    `);

    const fragment = document.createDocumentFragment();
    const textNode = document.createTextNode("New Text Node");
    const elementNode = document.createElement("span");

    fragment.appendChild(textNode);
    fragment.appendChild(elementNode);

    elementNode.textContent = "Span Node";

    const subject = document.querySelector(".root");

    append(subject, fragment);

    expect(subject).toHaveSameHtml(`
      Text Node
      <span>Existing Node</span>
      New Text Node
      <span>Span Node</span>
    `);
  });

  it("inserts given multiple arguments to begin of element", () => {
    useFixture(`
      <div class="root">
        Text Node
        <span>Existing Node</span>
      </div>
    `);

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

    const subject = document.querySelector(".root");

    append(
      subject,
      html,
      standaloneTextNode,
      standaloneElementNode,
      fragment.childNodes
    );

    expect(subject).toHaveSameHtml(`
      Text Node
      <span>Existing Node</span>
      HTML Text Node
      <span>Span from HTML</span>
      Standalone Text Node
      <span>Standalone Element Node</span>
      Text Node from NodeList
      <span>Element Node from NodeList</span>
    `);
  });
});
