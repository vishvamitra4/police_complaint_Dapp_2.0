
import { useState, useEffect } from "react";

function Status({ account, contract, provider }) {


    const [isPopupOpen, setPopupOpen] = useState(false);
    const [id, setId] = useState(0);
    const [ComplaintDetail, setComplaintDetail] = useState(null);

    // Function to open the pop-up
    const openPopup = () => {
        setPopupOpen(true);
    };

    // Function to close the pop-up
    const closePopup = () => {
        setPopupOpen(false);
    };


    const checkStatus = async (e) => {

        e.preventDefault();

        try {
            const singner = await provider.getSigner();
            const data = await contract.connect(singner).Complaints(id);
            console.info("Got the data!", Number(data.id));
            setComplaintDetail(data);
        } catch (err) {
            console.log(err);
        };

        if (ComplaintDetail) {
            document.querySelector('.status-card').classList.add('show');
        }


    }

    return (
        <div className="status" id="status">
            <form onSubmit={checkStatus}>
                <h2>Check Status</h2>
                <label htmlFor="putId">Write Id</label>
                <input
                    name="putId"
                    id="putId"
                    type="text"
                    required
                    placeholder="write your complaint id"
                    onChange={(e) => setId(e.target.value)}
                />
                <button type="submit" onClick={openPopup}>Check Status</button>
            </form>

            <div className={`overlay ${isPopupOpen ? 'active' : ''}`} onClick={closePopup}></div>
            <div className={`status-card ${isPopupOpen ? 'active' : ''}`}>
                {(ComplaintDetail) ? (<div>
                    <div>
                        <h3>Complaint Details : </h3>
                        <p>Complaint Id : {Number(ComplaintDetail.id)}</p>
                        <p>Complaint Registerd By : {ComplaintDetail.complaintRegisteredBy}</p>
                        <p>Title : {ComplaintDetail.title}</p>
                        <p>Description : {ComplaintDetail.description}</p>
                        <p>ApprovalRemark : {ComplaintDetail.approvalRemark}</p>
                        <p>ResolutionRemark : {ComplaintDetail.resolutionRemark}</p>
                        <p>isApproved : {ComplaintDetail.isApproved ? "Yes" : "No"}</p>
                        <p>isResolved : {ComplaintDetail.isResolved ? "Yes" : "No"}</p>
                    </div>
                </div>) : (<div>
                    <h1>OOPS!</h1>
                    <br />
                    <p>Data Does Not Exist!</p>
                </div>)}
            </div>

        </div>
    )
}

export default Status;




/*

import React, { useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";

function Status() {
    const [isPopupOpen, setPopupOpen] = useState(false);

    // Function to open the pop-up
    const openPopup = () => {
        setPopupOpen(true);
    };

    // Function to close the pop-up
    const closePopup = () => {
        setPopupOpen(false);
    };


    const [id, setId] = useState(0);
    const { contract } = useContract("0x2124B3a2dBf56B9b5c4C8B9062670C2c9f16d461");
    const { data : ComplaintDetail } = useContractRead(contract, "Complaints", [id]);
    const checkStatus = (e) => {
        e.preventDefault();
        if (ComplaintDetail) {
            document.querySelector('.status-card').classList.add('show');
        }
    }

    return (
        <div className="status" id = "status">
            <form onSubmit={checkStatus}>
                <h2>Check Status</h2>
                <label htmlFor="putId">Write Id</label>
                <input
                    name="putId"
                    id="putId"
                    type="text"
                    required
                    placeholder="write your complaint id"
                    onChange={(e) => setId(e.target.value)}
                />
                <button type="submit" onClick={openPopup}>Check Status</button>
            </form>
            <div className={`overlay ${isPopupOpen ? 'active' : ''}`} onClick={closePopup}></div>
            <div className={`status-card ${isPopupOpen ? 'active' : ''}`}>
                {(ComplaintDetail) ? (<div>
                    <div>
                        <h3>Complaint Details : </h3>
                        <p>Complaint Id : {Number(ComplaintDetail.id._hex)}</p>
                        <p>Complaint Registerd By : {ComplaintDetail.complaintRegisteredBy}</p>
                        <p>Title : {ComplaintDetail.title}</p>
                        <p>Description : {ComplaintDetail.description}</p>
                        <p>ApprovalRemark : {ComplaintDetail.approvalRemark}</p>
                        <p>ResolutionRemark : {ComplaintDetail.resolutionRemark}</p>
                        <p>isApproved : {ComplaintDetail.isApproved ? "Yes" : "No"}</p>
                        <p>isResolved : {ComplaintDetail.isResolved ? "Yes" : "No"}</p>
                    </div>
                </div>) : (<div>
                    <h1>OOPS!</h1>
                    <br />
                    <p>Data Does Not Exist!</p>
                </div>)}
            </div>

        </div>
    )
};


export default Status;

*/