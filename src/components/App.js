import blockreports from '../abis/blockreports.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = blockreports.networks[networkId]
    if(networkData) {
      // Assign contract
      const Blockreports = new web3.eth.Contract(blockreports.abi, networkData.address)
      this.setState({ Blockreports })
      // Get files amount
      const filesCount = await Blockreports.methods.fileCount().call()
      this.setState({ filesCount })
      // Load files&sort by the newest
      for (var i = filesCount; i >= 1; i--) {
        const file = await Blockreports.methods.files(i).call()
        this.setState({
          files: [...this.state.files, file]
        })
      }
    } else {
      window.alert('Blockreports contract not deployed to detected network.')
    }
  }

  // Get file from user
  captureFile = event => {
    event.preventDefault()

    const file = event.target.files[0]
    if ( file['type'].split('/')[0] === 'image') {
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        name: file.name
      })
      console.log('buffer', this.state.buffer)
    }} else {console.error("Uploaded File is not an Image")
             window.alert("Uploaded File is not an Image.The form will reset")
             document.getElementById("capturef").reset()
  }
  }
  uploadFile = description => {
    console.log("Submitting file to IPFS...")

    // Add file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result.size)
      if(error) {
        if (result === undefined) console.error("Uploaded File is not an Image")
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.Blockreports.methods.uploadFile(result[0].hash, result[0].size, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
         loading: false,
         name: null
       })
       window.location.reload()
      }).on('error', (e) =>{
        window.alert('Error')
        this.setState({loading: false})
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      Blockreports: null,
      files: [],
      loading: false,
      name: null
    }
    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className=" text-white text-monospace bg-dark container-fluid text-center "><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
      </div>
      </div>
    );
  }
}

export default App;