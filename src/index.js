import Tabs from "./lib/Tabs";

const tabs = Tabs.create();

const app = document.getElementById("app");

const foo = document.createElement("div");
foo.innerHTML = `
  <span>foo</sapn>
  <input type="text" value="foooo" />
`;

const woo = document.createElement("div");
woo.innerHTML = `
  <span>woo</sapn>
  <input type="text" value="woosss" />
`;

const foo2 = document.createElement("div");
foo2.innerHTML = `
  <span>foo2</sapn>
  <input type="text" value="foooo" />
`;

const woo2 = document.createElement("div");
woo2.innerHTML = `
  <span>woo2</sapn>
  <input type="text" value="woosss" />
`;

const itemId = tabs.addTab("foo1", foo);
tabs.addTab("woo1", woo);
tabs.addTab("woo2", foo2);
tabs.addTab("woo2", woo2);

app.appendChild(tabs.getDOM());
tabs.showTab(itemId);
