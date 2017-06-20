import prepend from "../../src/fn/prepend";

describe("fn/prepend", () => {
  afterEach(clearFixtures);

  it("inserts given HTML string to begin of element", () => {
    useFixture(`
      <div class="root">
        <span>Existing Node</span>
      </div>
    `);

    const subject = document.querySelector(".root");

    prepend(subject, "Text Node<span>Span Node</span>");

    expect(subject).toHaveSameHtml(`
      Text Node
      <span>Span Node</span>
      <span>Existing Node</span>
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

    prepend(subject, elementNode);
    prepend(subject, textNode);

    expect(subject).toHaveSameHtml(`
      New Text Node
      <span>Span Node</span>
      Text Node
      <span>Existing Node</span>
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

    prepend(subject, fragment.childNodes);

    expect(subject).toHaveSameHtml(`
      New Text Node
      <span>Span Node</span>
      Text Node
      <span>Existing Node</span>
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

    prepend(subject, fragment);

    expect(subject).toHaveSameHtml(`
      New Text Node
      <span>Span Node</span>
      Text Node
      <span>Existing Node</span>
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

    prepend(
      subject,
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
      Text Node
      <span>Existing Node</span>
    `);
  });
});
