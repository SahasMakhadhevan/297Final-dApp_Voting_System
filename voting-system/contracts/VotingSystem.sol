pragma solidity ^0.5.4;

contract VotingSystem{
    // Struct to represent a voter
    struct Voter{
        uint weight; // Weight of the voter's vote
        bool voted; // Status of whether the voter has already voted
        uint vote; // Index of the Candidate the voter has voted for
    }
    // Struct to represent a Candidate
    struct Candidate{
        bytes32 name; // Name of the Candidate
        uint voteCount; // Number of votes the Candidate has received
    }
    
    address Admin; // Address of the admin
    mapping(address=>Voter) voters; // Mapping of addresses to Voter structs
    Candidate[] Candidates; // Array of Candidate structs
    bool electionStatus = false; // Status of whether the election is open or closed

    // Constructor function, which initializes the contract with a list of Candidate names
    function VotingSystem(bytes32[] CandidateNames){
        Admin = msg.sender; // set the admin to the address of the sender of the contract creation transaction
        voters[Admin].weight = 2; // give the admin a weight of 2
        for(uint i=0; i<CandidateNames.length; i++){
            Candidates.push(Candidate({
                name:CandidateNames[i],
                voteCount:0
            })); // add a new Candidate struct to the Candidates array with the given name and a vote count of 0
        }
    }

    function setElection(bool status) public{
        require(msg.sender == Admin, 'Only admin can set election');
        electionStatus = status;
    }

    // Function to register voter
    function registerVoter(address voter){
        require(electionStatus == true, 'Election is not open');
        // Check that the sender is the admin or that the voter has not already voted
        if(msg.sender!=Admin | voters[voter].voted){
            throw; // if not, throw an exception
        }
        voters[voter].weight=1; // give the voter a weight of 1
    }

    // Function for a voter to cast a vote for a Candidate
    function vote(uint Candidate){
        require(electionStatus == true, 'Election is not open');
        Voter sender=voters[msg.sender]; // get the Voter struct for the sender's address
        // Check that the sender has not already voted and that the Candidate index is valid
        if(sender.voted | Candidate>=Candidates.length){
            throw; // if not, throw an exception
        }
        sender.voted=true; // set the sender's voted flag to true
        sender.vote=Candidate; // set the sender's vote to the given Candidate index
        Candidates[Candidate].voteCount+=sender.weight; // add the sender's vote weight to the vote count for the Candidate
    }

    // Function to determine the winning Candidate
    function winningCandidate() constant returns(uint winningCandidate){
        require(electionStatus == true, 'Election is not open');
        uint winningVoteCount=0; // initialize the winning vote count to 0
        for(uint p=0;p<Candidates.length;p++){ // loop through all Candidates
            if(Candidates[p].voteCount>winningVoteCount){ // if the Candidate has more votes than the current winner
                winningVoteCount=Candidates[p].voteCount; // set the winning vote count to the Candidate's vote count
                winningCandidate=p; // set the winning Candidate index to the current Candidate index
            }
        }
        electionStatus = false;
    }

    // Function to get the name of the winning Candidate
    function winnerName() constant returns(bytes32 winnerName){
        require(electionStatus == false, 'Election is closed');
        winnerName=Candidates[winningCandidate()].name; // get the name of the winning Candidate using the winningCandidate function
    }
}