
const test = require("node:test");
const assert = require("node:assert/strict");

test("application returns HTTP 200", async () => {
  const server = require("./app");

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}`);

    assert.equal(response.status, 200);
    assert.match(await response.text(), /CI\/CD Pipeline Successful/);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((err) => err ? reject(err) : resolve());
    });
  }
});
