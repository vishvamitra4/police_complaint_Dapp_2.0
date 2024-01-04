import React, { useEffect, useState } from 'react';
import "../App.css";
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Complaint({ account, contract, provider }) {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [nextID, setnextID] = useState(null);


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const fetchNextID = async () => {

        // -- fetching nextID
        const nextID = await contract.nextId();
        setnextID(nextID);
    }

    



    const handlefileComplaint = async (e) => {
        
        e.preventDefault();

        try {
            const nextID = await contract.nextId();
            const signer = await provider.getSigner();
            const data = await contract.connect(signer).fileComplaint(title, description);
            console.info("contract call successs", data);
            toast.success(`Complaint Filed! and Your ID : ${nextID.toString()}`);
            setTitle("");
            setDescription("");
        }
        catch (err) {
            if (err.message.includes('missing v (argument="signature"')) {
                toast.error('Oops! Something went wrong. Please try again.');
            } else {
                toast.error('Oops! Something went wrong.');
            }
            console.error("contract call failure", err);
        }


        

    };



    return (
        <div className="complaint-form" id="complain">
            <h2 className="text-3xl font-bold underline">File Complaint</h2>
            <form onSubmit={handlefileComplaint}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <ToastContainer />
        </div>
    )
};

export default Complaint;




/*

function Complaint({state}) {
    console.log(state);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const { contract } = useContract("0x2124B3a2dBf56B9b5c4C8B9062670C2c9f16d461");
    const { data : nextID } = useContractRead(contract, "nextId")
    const { mutateAsync: fileComplaint, isLoading } = useContractWrite(contract, "fileComplaint")


    const handleSubmit = async (e) => {
        e.preventDefault();
        const notification = toast.loading("Filing Complaint!");
        try {
            const data = await fileComplaint({ args: [title, description] });
            console.info("contract call successs", data);
            toast.success(`Complaint Filed! Note Your Complaint Id : ${nextID.toString()}`, {
                id: notification,
            })
            setTitle("");
            setDescription("");
        } catch (err) {
            toast.error("Oops! Something went Wrong.", {
                id: notification,
            })
            console.error("contract call failure", err);
        }
    };

    return (
        <div className="complaint-form" id = "complain">
            <h2 className="text-3xl font-bold underline">File Complaint</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Complaint;

*/