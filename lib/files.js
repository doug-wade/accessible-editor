/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'package.json': {
    file: {
      contents: `
          {
            "name": "pa11y-wrapper",
            "type": "module",
            "dependencies": {
              "pa11y": "^6.2.3"
            },
            "scripts": {
              "audit": "pa11y --reporter json"
            }
          }`,
    },
  },
};
