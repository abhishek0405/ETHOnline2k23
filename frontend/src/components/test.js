import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

const privateKey = "your_private_key";
const wallet = new Wallet(privateKey);

const provider = getDefaultProvider("http://127.0.0.1:8545");
const signer = wallet.connect(provider);

const db = new Database({ signer });