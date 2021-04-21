var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data to DOM function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request");
        }
    });
}

getRepoIssues("chrisdocs/robot-gladiators");

var displayIssues = function(issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
    }

    for (var i = 0; i < issues.length; i++) {
        // create a link elelemnt to take users to the issue on github
        var issuesEl = document.createElement("a");
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target", "_blank");

        //create span to hold issue title
        var titleEl = document.createElement("span")
        titleEl.textContent = issues[i].title;

        //append to container
        issuesEl.appendChild(titleEl);

        //create a tyoe element
        var typeEl = document.createElement("span");

        // check is issue is an actual issue or a pull request
        if (issues[i].pulll_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)"
        }

        // append to container
        issuesEl.appendChild(typeEl);

        issueContainerEl.appendChild(issuesEl);
    }
};