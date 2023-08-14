/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'index.js': {
    file: {
      contents: `
        const Koa = require('koa');
        const { bodyParser } = require("@koa/bodyparser");
        
        const app = new Koa();
        app.use(bodyParser());

        let latestDraft = '';
        
        app.use(async ctx => {
          if (ctx.request.body) {
            latestDraft = ctx.request.body;
          }
          ctx.body = latestDraft;
        });
        
        app.listen(3000);
        `,
    },
  },
  'package.json': {
    file: {
      contents: `
          {
            "name": "a11y-editor-http-server",
            "type": "module",
            "dependencies": {
              "koa": "latest",
              "nodemon": "latest"
            },
            "scripts": {
              "start": "nodemon index.js"
            }
          }`,
    },
  },
};
