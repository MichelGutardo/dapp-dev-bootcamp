// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;


/**
  - data for contract
    - need a structure to model candidate 
    - need to manage multiple candidates
    - need to manage multiple voters and vote state

  - function for contract
    - add candidate function
    - vote function
    - constructor function

  - event
    - voted event
  
  */

contract Election {

  // struct form odel candidate
  struct Candidate{
    uint id;
    string name;
    uint voteCount;
  }

  // manage multiple candidates
  mapping(uint => Candidate) public candidates;
  uint public candidateCount;

  // manage voters and vote state
  mapping(address => bool) public voters;


  // event
  event voted(
    uint indexed candidateId
  );

  constructor() public {
    addCandidate("candidate 1");
    addCandidate("candidate 2");
  } 

  // add candidate in constructor
  function addCandidate(string memory name) private{
    candidateCount += 1;
    candidates[candidateCount] = Candidate(candidateCount,name,0);

  }

  function vote(uint candidateId) public {

    // require for a valide vote
    require(candidateId <= candidateCount, "candidate id should smaller or equal to candidate count");
    require(voters[msg.sender] == false , "voter need to not yet vote");

    // implement vote
    voters[msg.sender] = true;
    candidates[candidateId].voteCount +=1;

    emit voted(candidateId);
  }
  
}
