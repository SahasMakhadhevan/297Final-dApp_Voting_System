import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/VotingSystem.module.css'
import {Alert, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Web3 from "web3";
import {useState} from "react";

export default function VotingSystem() {
    const [error, setError] = useState('');
    let web3
    const connectWalletHandler = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({method: "eth_requestAccounts"})
                web3 = new Web3(window.ethereum)
            } catch (e) {
                setError(e.message)
            }
        } else {
            console.log("Non-Ethereum browser detected. You should consider trying MetaMask!")
            setError("Non-Ethereum browser detected. You should consider trying MetaMask!")
        }
    }
    return(
        <div className={styles.main}>
            <Head>
                <title>Vote for your GPU</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/*<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />*/}
                {/*<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>*/}
                {/*<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>*/}
            </Head>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Voting System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/voting-system">Home</Nav.Link>
                            <NavDropdown title="About" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/voting-system/about/overview">Overview</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/voting-system/about/team-red">Team Red</NavDropdown.Item>
                                <NavDropdown.Item href="/voting-system/about/team-green">Team Green</NavDropdown.Item>
                                <NavDropdown.Item href="/voting-system/about/team-blue">Team Blue</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/voting-system/register">Register</Nav.Link>
                            <Nav.Link href="/voting-system/results">Results</Nav.Link>
                        </Nav>
                        <Nav>
                            <button className="btn btn-primary" onClick={connectWalletHandler}>Connect Wallet</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container-fluid text-center">
                <div className="jumbotron">
                    <h1 className="text-center">Vote for your GPU</h1>
                    <p className="text-center">This is a voting system for the best GPU</p>
                    <a href="/voting-system/about/overview" role="button" className="btn btn-primary btn-lg">Learn more</a>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1>Team Red</h1>
                        <p>Team Red is a group of GPUs that are made by AMD.</p>
                        <p><a href="/voting-system/about/team-red" role="button" className="btn btn-danger">Learn more</a></p>
                    </div>
                    <div className="col-md-4">
                        <h1>Team Green</h1>
                        <p>Team Green is a group of GPUs that are made by Nvidia.</p>
                        <p><a href="/voting-system/about/team-green" role="button" className="btn btn-success">Learn more</a></p>
                    </div>
                    <div className="col-md-4">
                        <h1>Team Blue</h1>
                        <p>Team Blue is a group of GPUs that are made by Intel.</p>
                        <p><a href="/voting-system/about/team-blue" role="button" className="btn btn-primary">Learn more</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}