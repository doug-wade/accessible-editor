import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  console.log("got text to check", request);
  return [
    {
      code: "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      type: "error",
      typeCode: 1,
      message:
        "This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 3.47:1. Recommendation: change background to #444.",
      context:
        '<a href="https://info.skilljar.com/personal-demo/lms-platform" class="btn btn-danger text-white me-3 mb-3 mb-sm-1 mb-md-0" target="_blank" style="font-weight: bold;min-width:180px;padding:.75rem 1.75rem">Get a Personal Demo</a>',
      selector:
        "#site-content > header > div > div > div:nth-child(2) > div > div > a:nth-child(1)",
      runner: "htmlcs",
      runnerExtras: {},
    },
    {
      code: "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      type: "error",
      typeCode: 1,
      message:
        "This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 2.18:1. Recommendation: change background to #0a8482.",
      context: '<span class="label badge bg-success">Webinar </span>',
      selector: "#section-2 > a > div > span:nth-child(1)",
      runner: "htmlcs",
      runnerExtras: {},
    },
    {
      code: "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      type: "error",
      typeCode: 1,
      message:
        "This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least 4.5:1, but text in this element has a contrast ratio of 3.47:1. Recommendation: change background to #444.",
      context:
        '<a class="btn m-1 btn-danger text-white" href="https://info.skilljar.com/personal-demo/lms-platform" target="_blank">Get a Personal Demo</a>',
      selector: "#site-content > section > div > div > a:nth-child(1)",
      runner: "htmlcs",
      runnerExtras: {},
    },
  ];
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server is now listening on 3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
