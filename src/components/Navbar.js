import React, { Component } from "react";
import logo from "../logo.png";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

// const commonStyles =
//   "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

class Navbar extends Component {
  render() {
    return (
      <nav className=" navbar flex md:justify-center justify-between items-center p-4">
        {/* <div className="md:flex-[0.5] flex-initial justify-center items-center"> */}
        <div
          className="md:flex-[0.5] flex-initial justify-center items-center "
          href="*"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logo}
            width="160"
            height="160"
            className="w-32 cursor-pointer rounded"
            alt="blockrepoerts"
          />
        </div>
        {/* <div className="text-center ">
              <h2 className="text=3xl sm:text-5xl text-white py-0 ">
                Upload Images
              </h2>
              <h3 className=" text-white  font-light text-base ">
                 Powered by blockchain
              </h3>
            </div> */}
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded h-40 sm:w-72 w-full eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <nav className="navbar flex justify-between items-start">
                <nav className="border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={42} color="#fff" />
                </nav>
                <BsInfoCircle fontSize={32} color="#fff" />
              </nav>
              {this.props.account ? (
                <div>
                  <p className="navbar navbar-brand text-white font-light text-sm">
                    {/* {this.props.account} */}
                    {this.props.account.substring(0, 15)}...
                    {this.props.account.substring(30, 42)}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum Account
                  </p>
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </div>

        {/* </div> */}

        {/* </div> */}
        {/* 
        <h2
          className="  text-white "
          target="_blank"
          rel="noopener noreferrer"
        ></h2> */}
      </nav>
    );
  }
}

export default Navbar;
