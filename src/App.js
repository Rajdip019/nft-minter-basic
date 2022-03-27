import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import NFT from "./utils/NFT.json";
import "./App.css";
import Navbar from "./components/Navbar"
import Particles from "react-tsparticles";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: "green"
};

const CONTRACT_ADDRESS = "0x3701109937546d00A4B8953Cf6080051ad6B52f1";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [token, setToken] = useState(null)

  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const [loader, setLoader] = useState(false);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const [isAbout, setIsAbout] = useState(false);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);

      setupEventListener();
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);

      setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          NFT.abi,
          signer
        );

        connectedContract.on("NFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          setToken(tokenId.toNumber())
          handleOpen();
        });

        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          NFT.abi,
          signer
        );

        
        let nftTxn = await connectedContract.createNFT();
        setLoader(true)
        console.log("Mining..,,,...,,,....please wait.");
        await nftTxn.wait();
        console.log(nftTxn);
        setLoader(false);
        console.log(
          `Mining completed, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const renderNotConnectedContainer = () => (
    <button
      onClick={() => {connectWallet()}}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5 rounded-full hover:bg-pink-800 hover:scale-105 active:scale-95 transition-all font-bold text-white text-xl mx-auto my-10 flex w-4/12"
    >
      <p className="mx-auto">Connect to Wallet</p>
    </button>
  );

  const renderMintUI = () => (
<button
      onClick={() => {askContractToMintNft()}}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5 rounded-full hover:bg-pink-800 hover:scale-105 active:scale-95 transition-all font-bold text-white text-xl mx-auto my-10 flex w-4/12"
    >
    <p className="mx-auto">{loader ? (<CircularProgress color="success"/>): (<>Mint NFT</>)}</p> 
    </button>
  );

  return (
    <>
    <Navbar setIsAbout={setIsAbout}/>
    {isAbout ? (
      <>
      <div className="top-16 absolute w-full h-screen bg-slate-800 ">
        <div className="flex justify-around mt-24 w-10/12 mx-auto">
        <div className="flex flex-col items-center">
          <img src="/Profile Picture.png" alt="" className=" rounded-full w-72" />
          <p className="text-gray-100 text-2xl my-5">Rajdeep Sengupta</p>
          <p className="text-gray-300">BTECH 1st Year, Heritage Institution of Technology</p>
        </div>
        <div className="flex flex-col items-center">
        <img src="/sayandp.jpeg" alt="" className=" rounded-full w-72 h-72" />
          <p className="text-gray-100 text-2xl my-5">Sayan Chowdhury</p>
          <p className="text-gray-300">BTECH 1st Year, Heritage Institution of Technology</p>
        </div>
        </div>
        <a href="https://github.com/Rajdip019/nft-minter-basic">
        <button
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5  rounded-full hover:bg-pink-800 hover:scale-105 active:scale-95 transition-all font-bold text-white text-xl mx-auto my-20 flex w-4/12"
    >
    <p className="mx-auto">GitHub Repo Link</p> 
    </button>
    </a>
      </div>
       </>
    ) : (
    <div className="h-screen bg-slate-800 flex justify-center items-center flex-col ">
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#10192C",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 0.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1500,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />
    <div className="absolute">
    <div className="w-6/12 mx-auto">
      <h1 className="text-center my-10">Get your own NFT</h1>
      <p className="text-gray-300 text-xl text-center">
        A non-fungible token is a non-interchangeable unit of data stored on
        a blockchain, a form of digital ledger, that can be sold and traded.
        Types of NFT data units may be associated with digital files such as
        photos, videos, and audio.
      </p>
      {currentAccount === ""
        ? renderNotConnectedContainer()
        : renderMintUI()}
    </div>
  </div>
  </div>
    )}
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Successfully Minted.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          A not-so-impressive NFT have been minted and sent  to your wallet. It mayyyyy be blank right now.... It can take a max of 10 min to show up on OpenSea. You Can Check it OUt here: <span className="text-red-500">Copy the redirected Link this may take upto 10 minutes</span><br />
          <div className="mt-8">
          <a href={`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${token}`} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5  rounded-full text-white font-bold">Checkout</a>
          </div>
          </Typography>
        </Box>
      </Modal>
  </>
  );
};

export default App;