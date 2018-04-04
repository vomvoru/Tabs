import "./style.css";

import { getIdGenerator } from "../util";

const CLASS_NAMES = {
  HEADER: "tab-header",
  HEADER_ITEM: "tab-header-item",
  HEADER_CHECKED_ITEM: "tab-header-checked-item",
  BODY: "tab-body",
  BODY_ITEM: "tab-body-item",
  SHOW_BODY_ITEM: "tab-body-show-item"
};

const getName = getIdGenerator("");

const createBaseDOM = () => {
  const tabDOM = document.createElement("div");

  const headerDOM = document.createElement("div");
  headerDOM.className = CLASS_NAMES.HEADER;

  const bodyDOM = document.createElement("div");
  bodyDOM.className = CLASS_NAMES.BODY;

  tabDOM.appendChild(headerDOM);
  tabDOM.appendChild(bodyDOM);

  return {
    tabDOM,
    headerDOM,
    bodyDOM
  };
};

const create = () => {
  const tabName = getName();
  const getItemId = getIdGenerator(tabName);

  const { tabDOM, headerDOM, bodyDOM } = createBaseDOM();

  const makeHeaderItemId = itemId => "header_" + itemId;
  const makeBodyItemId = itemId => "body_" + itemId;

  const createHeaderItem = (itemId, name) => {
    const headerId = makeHeaderItemId(itemId);

    const headerItem = document.createElement("label");
    headerItem.setAttribute("for", headerId);
    headerItem.className = CLASS_NAMES.HEADER_ITEM;

    headerItem.innerHTML = `
      <span>${name}</span>
      <input type="radio" name="${tabName}" value="${itemId}" id="${headerId}">
    `;

    return headerItem;
  };

  const createBodyItem = (itemId, body) => {
    const bodyId = makeBodyItemId(itemId);
    const bodyItem = document.createElement("sction");

    bodyItem.id = bodyId;
    bodyItem.className = CLASS_NAMES.BODY_ITEM;
    bodyItem.appendChild(body);

    return bodyItem;
  };

  const addTab = (name, body, itemId = getItemId()) => {
    const headerItem = createHeaderItem(itemId, name);
    const bodyItem = createBodyItem(itemId, body);

    headerDOM.appendChild(headerItem);
    bodyDOM.appendChild(bodyItem);

    return itemId;
  };

  const showTab = itemId => {
    const headerId = makeHeaderItemId(itemId);
    const bodyId = makeBodyItemId(itemId);

    const targetHeaderItem = document.querySelector(`[for="${headerId}"`);
    const targetBodyItem = document.getElementById(bodyId);

    Array.from(
      bodyDOM.getElementsByClassName(CLASS_NAMES.SHOW_BODY_ITEM)
    ).forEach(tabBodyItem => {
      tabBodyItem.classList.remove(CLASS_NAMES.SHOW_BODY_ITEM);
    });
    Array.from(
      headerDOM.getElementsByClassName(CLASS_NAMES.HEADER_CHECKED_ITEM)
    ).forEach(tabHeaderItem => {
      tabHeaderItem.classList.remove(CLASS_NAMES.HEADER_CHECKED_ITEM);
    });

    targetHeaderItem.checked = true;
    targetHeaderItem.classList.add(CLASS_NAMES.HEADER_CHECKED_ITEM);
    targetBodyItem.classList.add(CLASS_NAMES.SHOW_BODY_ITEM);
  };

  tabDOM.addEventListener("change", e => {
    const itemId = e.target.value;
    showTab(itemId);
  });

  return {
    getDOM: () => tabDOM,
    addTab,
    showTab
  };
};

export default {
  create
};
