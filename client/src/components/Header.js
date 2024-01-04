import '../App.css';

function Header() {

    return (
        <div>
                <div className="navbar">
                    <div className="links">
                        <a href="#complain">Complain</a>
                        <a href="#status">Status</a>
                    </div>
                    <div>
                        <button onClick = {cc} className = "cnt-btn">Connect Wallet</button>
                    </div>
                </div>

        </div>
    )
};

export default Header;