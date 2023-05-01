import Head from "next/head";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from "@/styles/VotingSystem.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";

export default function results() {
    const [winner, setWinner] = useState(null);
    const [vsContract, setVsContract] = useState(null);

    const getWinner = async() => {
        try{
            const winner = await vsContract.methods.winningCandidate().call();
            if (vsContract)
                setWinner(winner);
        } catch (e) {
            setWinner(e.message)
        }
    }
    return (
        <div className={styles.main}>
            <Head>
                <title>Vote for your GPU</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Voting System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="About" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/about/overview">Overview</NavDropdown.Item>
                                <NavDropdown.Divider/>
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
            <div className="container-fluid text-center">
                <div className="jumbotron">
                    <h1 className="text-center">Results!</h1>
                    <h2>And the winner is...{getWinner}</h2>
                </div>
            </div>
        </div>
    )
}