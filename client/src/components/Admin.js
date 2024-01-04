import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Admin({ account, contract, provider }) {


    const [id, setID] = useState(0);
    const [remark, setRemark] = useState("");

    const [pendingID, setpendingApprovals] = useState(null);
    const [resolveID, setresolveID] = useState(0);


    const xxxx = async () => {
        if (contract) {
            const xxx = await contract.pendingApprovals(0);
            setpendingApprovals(Number(xxx));


        }
    }

    const xxxx1 = async () => {
        if (contract) {
            const xxx1 = await contract.pendingResolutions(0);
            setresolveID(Number(xxx1));
        }
    }

    contract && xxxx();
    // contract && xxxx1();





    /// calculating the next approval Id...

    const NextApprovalId = async (e) => {

        try {
            const signer = await provider.getSigner();
            const data = await contract.connect(signer).calcPendingApprovalIds();
            xxxx();
            console.info("contract call successs", data);
        }
        catch (err) {
            console.error("contract call failure", err);
        };


    };


    //// Approve complaint..

    const ApproveComplaint = async (e) => {

        try {
            const signer = await provider.getSigner();
            const data = await contract.connect(signer).approveComplaint(id, remark);
            xxxx();
            console.info("contract call successs", data);
        }
        catch (err) {
            console.error("contract call failure", err);
        };
    };



    //// discard compalint...

    const DiscardComplaint = async (e) => {

        try {
            const signer = await provider.getSigner();
            const data = await contract.connect(signer).discardComplaint(id, remark);
            xxxx();
            console.info("contract call successs", data);
        }
        catch (err) {
            console.error("contract call failure", err);
        };
    };



    /// calculating next Resolving ID...


    const HandlingcalcPendingResolutionIds = async () => {

        try {
            const signer = await provider.getSigner();
            const data = await contract.connect(signer).calcResolvedIds();
            xxxx1();
            console.info("contract call successs", data);
        }
        catch (err) {
            console.error("contract call failure", err);
        };


    };



    //// resolving the case..

    const HandlingresolveComplaint = async () => {

        try {
            const signer = await provider.getSigner();
            const data = await contract.connect(signer).resolveComplaint(id, remark);
            xxxx1();
            console.info("contract call successs", data);
        }
        catch (err) {
            console.error("contract call failure", err);
        };
    };








    return (
        <div className='admin'>


            <div className='approve'>
                <h2 className="text-3xl font-bold underline">Approve/Discard<span style={{ "fontSize": "13px" }}><p>(Only for officer)</p></span></h2>
                <button type='submit' onClick={NextApprovalId}>Next To Approve</button>
                {pendingID && (<div>{pendingID}</div>)}
                <label htmlFor='id'>Enter Compalaint ID</label>
                <input
                    type='text'
                    name='id'
                    id='id'
                    required
                    onChange={(e) => setID(e.target.value)}
                />
                <label htmlFor='remark'>Enter Remark</label>
                <textarea
                    name='remark'
                    id='remark'
                    required
                    onChange={(e) => setRemark(e.target.value)}
                />
                <div className='btns'>
                    <button type='submit' onClick={ApproveComplaint}>Approve</button>
                    <button style={{ backgroundColor: "red" }} type='submit' onClick={DiscardComplaint}>Discard</button>
                </div>



            </div>


            <div className='resolve'>
                <h2 className="text-3xl font-bold underline" >Resolve<span style={{ "fontSize": "13px" }}><p>(Only for officer)</p></span></h2>
                <button type='submit' onClick={HandlingcalcPendingResolutionIds}>Next To Resolve</button>
                {resolveID && (<div>{resolveID}</div>)}
                <label htmlFor='id'>Enter Compalaint ID</label>
                <input
                    type='text'
                    name='id'
                    id='id'
                    required
                    onChange={(e) => setID(e.target.value)}
                />
                <label htmlFor='remark'>Enter Remark</label>
                <textarea
                    name='remark'
                    id='remark'
                    required
                    onChange={(e) => setRemark(e.target.value)}
                />
                <div className='btns'>
                    <button style={{ backgroundColor: "green" }} type='submit' onClick={HandlingresolveComplaint}>Resolve</button>
                </div>

            </div>
        </div>
    );
};


export default Admin;