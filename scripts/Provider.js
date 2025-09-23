const ethers = require("ethers").ethers;

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const wallet = "0x9F041ee0F5e8ae71BB7EeE407AC8B8f7F10B4C20";

(async function () {
  // const provider = ethers.getDefaultProvider();
  const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC);
  const balance = await provider.getBalance(wallet);
  console.log(`balance: ${ethers.formatEther(balance)} ETH`);

  const network = await provider.getNetwork();
  console.log(`network: ${JSON.stringify(network.toJSON())}`);

  const blockNumber = await provider.getBlockNumber();
  console.log(`blockNumber: ${blockNumber}`);

  const transcationCount = await provider.getTransactionCount(wallet);
  console.log(`transcationCount: ${transcationCount}`);

  const feeData = await provider.getFeeData();
  console.log(`feeData: ${JSON.stringify(feeData)}`);

  const block = await provider.getBlock(blockNumber);
  console.log(`block: ${JSON.stringify(block, null, 2)}`);
})();
