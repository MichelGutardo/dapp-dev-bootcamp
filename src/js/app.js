App = {
    web3Provider: null,
    contracts: {},

    // Set blockchain we working on
    init: function() {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);

        } else {
            //set the provider you wnat from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
            App.web3Provider = web3.currentProvider;
        }
        return App.initWeb3();
    },

    // Set contract we working on 
    initContract: function() {
        $.getJSON("Election.json", function(election) {
            App.contracts.Election = TruffleContract(election);
            App.contracts.Election.setProvider(App.web3Provider);
            App.render();
        });
    },

    render: function() {

        web3.eth.getCoinbase(function(error, account) {
            if (erro === null) {
                App.account = account;
                console.log(account);
                $("#accountAddress").html("Your Account: " + account)
            }
        });

        // get candidate information

        var electionInstance = null;
        App.contracts.Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidateCount();
        }).then(function(candidateCount) {
            console.log(candidateCount);
            var candidateResults = $("#candidatesResults");
            candidateResults.empty();

            var candidateSelect = $("#candidateSelect");
            candidateSelect.empty();
            for (var i = 1; i <= candidateCount; i++) {
                electionInstance.candidates(i).then(function(candidate) {
                    var id = candidate[0];
                    var name = candidate[1];
                    var voteCount = candidate[2];

                    candidateTemplate = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + voteCount + "</td></tr>";
                    candidateResults.append(candidateTemplate);

                    candidateOption = "<option value='" + id + "'>" + name + "</option>";
                    candidateSelect.append(candidateOption);
                })
            }
        });
    }
};


$(function() {
    $(window).load(function() {
        App.init();
    });
});