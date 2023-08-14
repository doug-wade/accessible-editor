/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'package.json': {
    file: {
      contents: `
          {
            "name": "a11y-editor-cli",
            "type": "module",
            "dependencies": {
              "pa11y": "^6.2.3"
            },
            "scripts": {
              "audit": "pa11y http://localhost:3000/ --reporter json"
            }
          }`,
    },
  },
};
