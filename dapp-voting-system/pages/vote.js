import styles from "@/styles/VotingSystem.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useState} from "react";

export default function vote(){
    const [vsContract, setVsContract] = useState(null);
    const [vote, setVote] = useState(false);
    const [voterID, setVoterID] = useState(null);
    const [error, setError] = useState(null);

    const voteRed = async() => {
        try{
            const vote = await vsContract.methods.vote().send({
                from: voterID,
                candidate: 'Red'
            })
            if (vsContract && voterID)
            setVote(true);
        } catch (e) {
            setError(e.message)
        }
    }
    const voteGreen = async() => {
        try{
            const vote = await vsContract.methods.vote().send({
                from: voterID,
                candidate: 'Green'
            })
            if (vsContract && voterID)
                setVote(true);
        } catch (e) {
            setError(e.message)
        }
    }
    const voteBlue = async() => {
        try{
            const vote = await vsContract.methods.vote().send({
                from: voterID,
                candidate: 'Blue'
            })
            if (vsContract && voterID)
                setVote(true);
        } catch (e) {
            setError(e.message)
        }
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
            <div className="container-fluid text-center">
                <div className="jumbotron">
                    <h1 className="text-center">Vote for your GPU</h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1>Team Red</h1>
                        <p><button onClick={voteRed} type="button" className="btn btn-danger">Vote</button></p>
                    </div>
                    <div className="col-md-4">
                        <h1>Team Green</h1>
                        <p><button onClick={voteGreen} type="button" className="btn btn-success">Vote</button></p>
                    </div>
                    <div className="col-md-4">
                        <h1>Team Blue</h1>
                        <p><button onClick={voteBlue} type="button" className="btn btn-primary">Vote</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}