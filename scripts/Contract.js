const ethers = require("ethers").ethers;
const abi = require("./abi");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const contract_address = "0x5c0E35FFBA10B837258A03ae68AdcD313172a2B3";
const address = "0x9F041ee0F5e8ae71BB7EeE407AC8B8f7F10B4C20";
const address2 = "0x65bb964c6e1c015c555dca79f8c931bc421fc609";
(async function () {
  // const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC);
  // const contract = new ethers.Contract(contract_address, abi, provider);
  // const name = await contract.name();
  // console.log(`name: ${name}`);
  // const symbol = await contract.symbol();
  // console.log(`symbol: ${symbol}`);
  // const unit = contract.unit;
  // const totalSupply = await contract.totalSupply();
  // console.log(`totalSupply: ${ethers.formatUnits(totalSupply, unit)}`);
  // const balance = await contract.balanceOf(address);
  // console.log(`balance of the wallet: ${ethers.formatUnits(balance, unit)}`);

  const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY2, provider);
  const contract = new ethers.Contract(contract_address, abi, signer);

  const unit = contract.unit;

  console.log(ethers.formatUnits(await contract.balanceOf(address2), unit));
  const tx = await contract.transfer(address, ethers.parseUnits("100", unit));
  await tx.wait();
  console.log(ethers.formatUnits(await contract.balanceOf(address2), unit));
})();
