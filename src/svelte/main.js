import App from "./App.svelte";
import { writable } from "svelte/store";

export const state = writable("state1");

const stateToTarget = {
  state1: {
    style: "embed",
    type: "change",
    selector: "#state1",
    element: null,
  },
  state2: {
    style: "embed",
    type: "change",
    selector: "#root > div > div:nth-of-type(1) > div:nth-of-type(2)",
    element: null,
  },
  state3: {
    style: "embed",
    type: "change",
    selector: "#root > div > div:nth-of-type(1) > div:nth-of-type(3)",
    element: null,
  },
  state4: {
    style: "embed",
    type: "insert-before",
    selector: "#root > div > div:nth-of-type(2) > div",
    element: null,
  },
  state5: {
    style: "embed",
    type: "insert-after",
    selector: "#root > div > div:nth-of-type(2) > div",
    element: null,
  },
  state6: {
    style: "modal",
    type: "",
    element: document.body,
  },
};

const mountReplace = (Component, options) => {
  console.log("mountReplace is called");
  const target = options.target;
  document.querySelectorAll("#svelte-container").forEach((e) => {
    e.remove();
    console.log("svelte-container removed");
  });
  const container = document.createElement("div");
  container.id = "svelte-container";
  container.style.height = "100%";
  container.style.width = "100%";

  if (target.style === "modal") {
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
  } else if (target.style === "embed") {
    if (target.type === "change") {
      const elems = target.element.children;

      if (elems.length !== 0) {
        while (elems.length) {
          // domの中身を全消しする
          elems.item(0).remove();
        }
      } else {
        // 謎にタグに入ってない場合のハンドリング（innerHTMLがあるかどうかでわけていいかも？）
        target.element.innerHTML = "";
      }
    } else if (target.type === "insert-before") {
      container.style.height = "";
      container.style.width = "";
    } else if (target.type === "insert-after") {
      container.style.height = "";
      container.style.width = "";
    }
  }

  new Component({ ...options, target: container });
  if (target.style === "modal") {
    target.element.appendChild(container);
  } else if (target.style === "embed") {
    if (target.type === "change") {
      target.element.appendChild(container);
    } else if (target.type === "insert-before") {
      const parent = target.element.parentNode;
      parent.insertBefore(container, target.element);
    } else if (target.type === "insert-after") {
      const parent = target.element.parentNode;
      target.element.after(container);
    } else {
      console.log("here");
    }
  }
};

const config = {
  childList: true,
  subtree: true,
};

const observerWrapper = (target, selector) => {
  const observer = new MutationObserver(() => {
    const elem = document.querySelector(selector);
    if (elem) {
      observer.disconnect();
      mountReplace(App, {
        target: { ...target, element: elem },
        props: { state },
      });
    }
  });
  observer.observe(document.body, config);
};

state.subscribe((v) => {
  const target = stateToTarget[v];
  if (target.element) {
    mountReplace(App, {
      target: target,
      props: { state },
    });
  } else {
    const selector = stateToTarget[v].selector;
    const elem = document.querySelector(selector);
    if (!!elem) {
      console.log("target is not loaded");
      const elem = document.querySelector(`${selector}:not(#svelte-container)`);
      mountReplace(App, {
        target: { ...target, element: elem },
        props: { state },
      });
    } else {
      console.log("target will be loaded");
      observerWrapper(target, selector);
    }
  }
});
