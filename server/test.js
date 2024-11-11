// test.js

// Run tests
const runTests = async () => {
  console.log("Starting tests...");
  console.log(
    "Using token:",
    process.env.MONDAY_API_TOKEN?.slice(0, 5) + "..."
  );

  await testConnection();
  await createBasicItem();
};

runTests();
