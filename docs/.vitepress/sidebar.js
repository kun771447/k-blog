import { createSideBarConfig } from "./util";

const pathArr = [
  "html",
  // "css",
  "tcp",
  "性能优化"
];

export const sidebar = pathArr.map((item) =>
  createSideBarConfig(item, "/" + item, false)
);
