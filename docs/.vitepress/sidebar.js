import { createSideBarConfig } from "./util";

const pathArr = [
  "html",
  // "css",
  "js",
  "tcp",
  "webgl",
  "性能优化"
];

export const sidebar = pathArr.map((item) =>
  createSideBarConfig(item, "/" + item, false)
);
