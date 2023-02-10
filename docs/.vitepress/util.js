const fs = require("fs");
const path = require("path");
const getFile = (prefixPath) => {
  return fs
    .readdirSync(path.join(__dirname, "../", prefixPath))
    .map((item) => {
      const filename = item.replace(".md", "");
      return {
        text: filename,
        link: `${prefixPath}/${item.replace(".md", "")}`,
      };
    });
};

export const createSideBarConfig = (text, prefixPath, collapsed = true) => {
  return {
    text,
    collapsed,
    items: getFile(prefixPath),
  };
};
