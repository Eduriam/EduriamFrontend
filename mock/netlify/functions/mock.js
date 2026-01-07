const mockoon = require("@mockoon/serverless");

// Load the Mockoon Environment object
const mockEnv = require("./datafile.json");

const mockoonServerless = new mockoon.MockoonServerless(mockEnv);

exports.handler = mockoonServerless.netlifyHandler();
