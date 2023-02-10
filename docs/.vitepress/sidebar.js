import { createSideBarConfig } from "./util";

const pathArr = ["html", "css", "tcp"];

export const sidebar = pathArr.map((item) =>
  createSideBarConfig(item, "/" + item)
);
