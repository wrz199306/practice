const ethers = require("ethers").ethers;

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const address2 = "0x65bb964c6e1c015c555dca79f8c931bc421fc609";
(async function () {
  const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const txRes = await wallet.sendTransaction({
    to: address2,
    value: ethers.parseEther("0.01"),
  });
  console.log("send");
  const receipt = await txRes.wait();
  console.log("send success", receipt);
})();
