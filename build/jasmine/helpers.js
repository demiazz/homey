function createEvent(type) {
  const event = document.createEvent("HTMLEvents");

  event.initEvent(type, true, true);

  return event;
}

function filterNodes(nodes, predicate) {
  const filteredNodes = [];

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes.item(i);

    if (predicate(node)) {
      filteredNodes.push(node);
    }
  }

  return filteredNodes;
}

function isSignificantNode(node) {
  if (node.nodeType === 1) {
    return true;
  }

  if (node.nodeType === 3 && node.wholeText.trim().length > 0) {
    return true;
  }

  return false;
}

function getSignificantNodes(element) {
  return filterNodes(element.childNodes, isSignificantNode);
}

window.createEvent = createEvent;
window.getSignificantNodes = getSignificantNodes;
