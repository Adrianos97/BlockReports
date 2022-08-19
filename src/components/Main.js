import React, { Component } from "react";
import { convertBytes } from "./helpers";
import moment from "moment";

class Main extends Component {
  render() {
    return (
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-center md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-center items-start flex-col mf:mr-10">
            <h1 className="text-center  text-3xl sm:text-5xl text-white text-gradient py-1">
              Upload Images <br /> using the Blockchain
            </h1>
            {/* <p className="center text-center  mt-5 text-white font-light md:w-9/12 w-11/12 text-base">

            </p> */}
          </div>

          <div className="container-fluid mx-auto text-center">
            <div className="row">
              <main role="main" className="container-fluid">
                <div className="content">
                  <p>&nbsp;</p>
                  <div
                    className="card py-2 mb-3 mx-auto bg-dark container-fluid"
                    style={{ maxWidth: "512px" }}
                  >
                    <h2 className="text-white text-monospace bg-dark container-fluid">
                      <b>
                        <ins>Upload your Image</ins>
                      </b>
                    </h2>
                    <form
                      id="capturef"
                      onSubmit={(event) => {
                        event.preventDefault();
                        const description = this.fileDescription.value;
                        this.props.uploadFile(description);
                      }}
                    >
                      <div className="py-2 form-group">
                        <br></br>
                        <input
                          id="fileDescription"
                          type="text"
                          ref={(input) => {
                            this.fileDescription = input;
                          }}
                          className="form-control text-monospace"
                          placeholder="description..."
                          required
                        />
                      </div>
                      <input
                        type="file"
                        onChange={this.props.captureFile}
                        accept=".png, .jpg, .jpeg"
                        className="text-white text-monospace"
                      />
                      <button type="submit" className="btn-primary btn-block">
                        <b>Upload!</b>
                      </button>
                    </form>
                  </div>
                  <p>&nbsp;</p>
                  <div className="row justify-content-center">
                    <div class="col-auto">
                      <table
                        className="table-bordered text-white "
                        style={{ width: "500px", maxHeight: "450px" }}
                      >
                        <thead style={{ fontSize: "15px" }}>
                          <tr className=" text-white">
                            <th scope="col" style={{ width: "100px" }}>
                              id
                            </th>
                            <th scope="col" style={{ width: "200px" }}>
                              name
                            </th>
                            <th scope="col" style={{ width: "230px" }}>
                              description
                            </th>
                            <th scope="col" style={{ width: "90px" }}>
                              size
                            </th>
                            <th scope="col" style={{ width: "90px" }}>
                              date
                            </th>
                            <th scope="col" style={{ width: "120px" }}>
                              uploader/hash
                            </th>
                            <th scope="col" style={{ width: "120px" }}>
                              view/get
                            </th>
                          </tr>
                        </thead>
                        {this.props.files.map((file, key) => {
                          return (
                            <thead style={{ fontSize: "14px" }} key={key}>
                              <tr>
                                <td>{file.fileId}</td>
                                <td>{file.fileName}</td>
                                <td>{file.fileDescription}</td>
                                <td>{convertBytes(file.fileSize)}</td>
                                <td>
                                  {moment
                                    .unix(file.uploadTime)
                                    .format("h:mm:ss A D/M/Y")}
                                </td>
                                <td>
                                  {file.uploader}
                                  {"     /     "}
                                  {file.fileHash}
                                </td>
                                <td>
                                  <a
                                    href={
                                      "https://ipfs.infura.io/ipfs/" +
                                      file.fileHash
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <img
                                      src={
                                        "https://ipfs.infura.io/ipfs/" +
                                        file.fileHash
                                      }
                                      class="img-fluid"
                                      style={{ maxWidth: "400px" }}
                                      alt="uploaded file"
                                    ></img>
                                  </a>
                                </td>
                              </tr>
                            </thead>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                  <p className="text-white text-left text-xs">
                    Created by
                  </p>
                  <p className="text-white text-right text-xs">
                    Adrianos Syrros
                  </p>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
