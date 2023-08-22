<html>
<head>
    <style>
        #profilepic {
            width: 40%;
            padding-top: 40px;
        }
        .fetchResults {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        #bio {
            font-style: italic;
            text-align: center; /* Center the text */
            margin-top: 10px; /* Add some space between the bio and the rest of the content */
        }
        #additionalInfo {
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>

<input type="text" id="userInput" placeholder="Enter Github user...">
<button onclick="fetchUser()">Enter</button>
<!--Create empty id's that will be updated later-->
<div class="fetchResults">
    <div id="profilepic"></div>
    <h1 id="username"></h1>
    <h2 id="bio"></h2>
    <div id="profilelink"></div>
    <p id="additionalInfo"></p>
</div>

<script>
    function fetchUser() {
        // create variables
        let userInput = document.getElementById("userInput").value;
        let resultUsername = document.getElementById("username");
        let resultBio = document.getElementById("bio");
        let profilePicDiv = document.getElementById("profilepic");
        let profileLinkDiv = document.getElementById("profilelink");
        let additionalInfoDiv = document.getElementById("additionalInfo");
        let request = new XMLHttpRequest();

        request.open('GET', `https://api.github.com/users/${userInput}`);
        request.send();

        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                let response = JSON.parse(request.responseText);

                let img = document.createElement("img");
                img.src = response.avatar_url;
                img.alt = "Profile Picture";

                resultUsername.textContent = response.login;
                if (response.bio === null) {
                    resultBio.textContent = "No bio available";
                } else {
                    resultBio.textContent = `"${response.bio}"`;
                }

                // Create an <a> element for the profile link
                let profileLink = document.createElement("a");
                profileLink.href = response.html_url;
                profileLink.textContent = "Visit Profile";
                
                // Checks if location is null, if so, display "No location available"
                if (response.location === null) {
                    let location = "no location available";
                } else {
                    let location = `"${response.location}"`;
                }

                // Construct the additional information
                let additionalInfo = `
                    Repositories: ${response.public_repos} | Followers: ${response.followers} | Following: ${response.following} <br>
                    Location: ${location} | Created: ${response.created_at} | Last Updated: ${response.updated_at}
                `;

                // Clear previous content
                profilePicDiv.innerHTML = '';
                profileLinkDiv.innerHTML = '';

                profilePicDiv.appendChild(img);
                profileLinkDiv.appendChild(profileLink);
                additionalInfoDiv.innerHTML = additionalInfo;
            }
        };
    }
</script>

</body>
</html>
