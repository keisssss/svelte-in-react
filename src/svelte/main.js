import App from "./App.svelte";
import { writable, get } from "svelte/store";
import { afterUpdate } from "svelte";

export const state = writable("state6");

const stateToTarget = {
  state1: {
    style: "embed",
    type: "change",
    seceltor: "#root > div > div:nth-of-type(1) > div:nth-of-type(1)",
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
  const target = options.target;
  console.log(target);
  document.querySelectorAll("#svelte-container").forEach((e) => {
    e.remove();
  });
  const container = document.createElement("div");
  container.id = "svelte-container";
  container.style.height = "100%";
  container.style.width = "100%";

  if (target.style === "modal") {
    container.style.position = "absolute";
    container.style.top = 0;
    container.style.left = 0;
  } else if (target.style === "embed") {
    if (target.type === "change") {
      const elems = target.element.children;
      if (elems.length !== 0) {
        while (elems.length) {
          elems.item(0).remove();
        }
      } else {
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
  console.log(target);
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

// オブザーバの設定
const config = {
  childList: true,
  subtree: true,
};
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // 何かしたいこと
    console.log(mutation.target);
    // console.log(document.querySelector(selector));
  });
});
observer.observe(document.body, config);

state.subscribe((v) => {
  console.log(v);
  const target = stateToTarget[v];
  //ここにmutaionObserverをいれてDomを監視する。
  if (target.element) {
    mountReplace(App, {
      target: target,
      props: { state },
    });
  } else {
    const selector = stateToTarget[v].seceltor;
    // オブザーバインスタンスを作成
  }
});
