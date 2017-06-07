import { append } from "../../src";

describe("append", () => {
  afterEach(clearFixtures);

  it("inserts given HTML string to end of element", () => {
    useFixture(`
      <div class="root">
        <span>Existing Node</span>
      </div>
    `);

    const subject = document.querySelector(".root");

    append(subject, "Text Node<span>Span Node</span>");

    const nodes = getSignificantNodes(subject);

    expect(nodes.length).toBe(3);

    expect(nodes[0]).toBeElementNode();
    expect(nodes[0]).toBeTag("span");
    expect(nodes[0]).toHaveText("Existing Node");

    expect(nodes[1]).toBeTextNode();
    expect(nodes[1]).toHaveText("Text Node");

    expect(nodes[2]).toBeElementNode();
    expect(nodes[2]).toBeTag("span");
    expect(nodes[2]).toHaveText("Span Node");
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

    const nodes = getSignificantNodes(subject);

    expect(nodes.length).toBe(4);

    expect(nodes[0]).toBeTextNode();
    expect(nodes[0]).toHaveText("Text Node");

    expect(nodes[1]).toBeElementNode();
    expect(nodes[1]).toBeTag("span");
    expect(nodes[1]).toHaveText("Existing Node");

    expect(nodes[2]).toBeElementNode();
    expect(nodes[2]).toBeTag("span");
    expect(nodes[2]).toHaveText("Span Node");

    expect(nodes[3]).toBeTextNode();
    expect(nodes[3]).toHaveText("New Text Node");
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

    const nodes = getSignificantNodes(subject);

    expect(nodes.length).toBe(4);

    expect(nodes[0]).toBeTextNode();
    expect(nodes[0]).toHaveText("Text Node");

    expect(nodes[1]).toBeElementNode();
    expect(nodes[1]).toBeTag("span");
    expect(nodes[1]).toHaveText("Existing Node");

    expect(nodes[2]).toBeTextNode();
    expect(nodes[2]).toHaveText("New Text Node");

    expect(nodes[3]).toBeElementNode();
    expect(nodes[3]).toBeTag("span");
    expect(nodes[3]).toHaveText("Span Node");
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

    const nodes = getSignificantNodes(subject);

    expect(nodes.length).toBe(4);

    expect(nodes[0]).toBeTextNode();
    expect(nodes[0]).toHaveText("Text Node");

    expect(nodes[1]).toBeElementNode();
    expect(nodes[1]).toBeTag("span");
    expect(nodes[1]).toHaveText("Existing Node");

    expect(nodes[2]).toBeTextNode();
    expect(nodes[2]).toHaveText("New Text Node");

    expect(nodes[3]).toBeElementNode();
    expect(nodes[3]).toBeTag("span");
    expect(nodes[3]).toHaveText("Span Node");
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

    const nodes = getSignificantNodes(subject);

    expect(nodes.length).toBe(8);

    expect(nodes[0]).toBeTextNode();
    expect(nodes[0]).toHaveText("Text Node");

    expect(nodes[1]).toBeElementNode();
    expect(nodes[1]).toBeTag("span");
    expect(nodes[1]).toHaveText("Existing Node");

    expect(nodes[2]).toBeTextNode();
    expect(nodes[2]).toHaveText("HTML Text Node");

    expect(nodes[3]).toBeElementNode();
    expect(nodes[3]).toBeTag("span");
    expect(nodes[3]).toHaveText("Span from HTML");

    expect(nodes[4]).toBeTextNode();
    expect(nodes[4]).toHaveText("Standalone Text Node");

    expect(nodes[5]).toBeElementNode();
    expect(nodes[5]).toBeTag("span");
    expect(nodes[5]).toHaveText("Standalone Element Node");

    expect(nodes[6]).toBeTextNode();
    expect(nodes[6]).toHaveText("Text Node from NodeList");

    expect(nodes[7]).toBeElementNode();
    expect(nodes[7]).toBeTag("span");
    expect(nodes[7]).toHaveText("Element Node from NodeList");
  });
});
