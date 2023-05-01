import styles from "@/styles/VotingSystem.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function register(){
    let voterID;
    const [vsContract, setVsContract] = useState(null);
    const [voter, setVoter] = useState(false);

    useEffect(() => {
        if (vsContract && voterID) addVoter().then(r => console.log(r));
    }, [vsContract, voterID]);

    const addVoter = async() => {
        const voter = await vsContract.methods.registerVoter(voterID).call();
        setVoter(voter);
    }

    return(
        <div className={styles.main}>
            <Head>
                <title>Vote for your GPU</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Voting System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="About" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/about/overview">Overview</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/about/team-red">Team Red</NavDropdown.Item>
                                <NavDropdown.Item href="/about/team-green">Team Green</NavDropdown.Item>
                                <NavDropdown.Item href="/about/team-blue">Team Blue</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href="/vote">Vote</Nav.Link>
                            <Nav.Link href="results">Results</Nav.Link>
                        </Nav>
                        <Nav>
                            <button className="btn btn-primary">Connect Wallet</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container text-center">
                <div className="jumbotron">
                    <br />
                    <h1 className="text-center">Register to Vote!</h1>
                        <br />
                    <form onClick={addVoter}>
                        <input id={voterID} type="text" className="form-control" placeholder="Enter your Wallet ID" />
                        <br />
                        <button type={"submit"} className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>

    )
}