import { ethers, Contract } from "ethers";
import { useState, useEffect } from "react";
import abi from "./contract/Complaint.json";
import Complaint from "./components/Complaint";
import ImageSlider from "./components/ImageSlider";
import Admin from "./components/Admin";
import firstGif from "./Images/1st.gif";
import statusImg from './Images/status.svg';
import './App.css';
import Status from "./components/Status";
function App() {

  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    const contractAddress = '0x77Eb48b0025DF171d6693Ed9cCEDE484e5fAE020';
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;

      if (ethereum) {

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);

      }
      else {
        alert("Please Connect Your Metamask Account!");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      const contract = new Contract(contractAddress, contractABI, provider);
      setContract(contract);
    } catch (error) {
      console.error(error);
    }


  };

  window.ethereum.on('accountsChanged', async () => {

    connectWallet();

  });

  useEffect(() => {
    connectWallet();
  }, []);





  return (
    <div className="App">

      <ImageSlider />

      <div className="Header-pd">
        <p>Account connected :- </p>
        <p>{(account == null) ? `Account Not Connected` : account}</p>
      </div>


      <div className="box-1">
        <Complaint account={account} contract={contract} provider={provider} />
        <div style={{ width: "50%" }}><img id="image" style={{ width: "100%" }} src={firstGif} alt="my gif" unoptimized={true} priority /></div>
      </div>


      <div className="box-2">
        <div className="box-2-1">
          <img src={statusImg} style={{ width: "100%" }} alt="statusImage" />
        </div>
        <Status account={account} contract={contract} provider={provider} />
      </div>


      <Admin account={account} contract={contract} provider={provider} />

      <div style={{ backgroundColor: "#007bff", padding: "15px", textAlign: "center", fontWeight: "bold", marginTop: "20px", color: "white" }}>
        <p>@copyright 2023 By Vishvamitra</p>
      </div>


    </div>
  );
}

export default App;







/*

const handleChange = async () => {

    const { contract } = state;
    const functions = Object.keys(contract.interface.functions);
    console.log(functions);
  }

  */