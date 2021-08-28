/*
 *   check constructor work
 *   check init value for each candidate  : id, name, voteCount
 *   check vote function:
 *   check the require that candidate id should smaller or equal to candidate count
 *   check voter not yet vote
 *   check update of voters mapping
 *   check update of candidate's voteCount
 *   check event happen
 */

var Election = artifacts.require("./Election.sol")

contract("Election", function(accounts) {

    it("check candidate count is 2", function() {
        return Election.deployed().then(function(instance) {
            return instance.candidateCount();
        }).then(function(count) {
            assert.equal(count, 2, "contract is init with 2 candidates")
        });
    });

})