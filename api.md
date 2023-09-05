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
            text-align: center;
            margin-top: 10px;
        }
        #additionalInfo {
            margin-top: 20px;
            text-align: center;
        }
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .popup {
            background-color: grey;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            max-width: 80%;
            text-align: center;
        }
        #userInput {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 10px;
            font-size: 16px;
        }
        #fetchButton {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .namebox {
            align-items: center;
            border: darkgray 2px solid;
        }
        .usernamebox {
            align-items: center;
            border: darkgray 2px solid;
        }

</style>
</head>

<body>
    <input type="text" id="userInput" placeholder="Enter Github user...">
    <button onclick="fetchUser()">Enter</button>
    <div class="overlay" id="popupOverlay">
        <div class="popup">
            <div class="fetchResults">
                <div id="profilepic"></div>
                <h1 id="username"></h1>
                <h2 id="bio"></h2>
                <div id="profilelink"></div>
                <p id="additionalInfo"></p>
                <div class="namebox">
                    <p>Name:</p>
                    <input type="name" id="nameplaceholder" placeholder="">
                </div>
                <input type="checkbox" name="server_needed" id="server_needed">
                <div class="usernamebox">
                    <p>Github Username:</p>
                    <input type="username" id="usernameplaceholder" placeholder="">
                </div>
            </div>
            <button onclick="()">Add User</button>
            <button onclick="closePopup()">Close</button>
        </div>
    </div>


<script>
        function openPopup() {
            document.getElementById("popupOverlay").style.display = "flex";
        }
        function closePopup() {
            document.getElementById("popupOverlay").style.display = "none";
        }
        function fetchUser() {
            let userInput = document.getElementById("userInput").value;
            let resultUsername = document.getElementById("username");
            let resultBio = document.getElementById("bio");
            let profilePicDiv = document.getElementById("profilepic");
            let profileLinkDiv = document.getElementById("profilelink");
            let additionalInfoDiv = document.getElementById("additionalInfo");
            let request = new XMLHttpRequest();

            const url = `https://api.github.com/users/${userInput}`;
            const token = "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";


            request.open('GET', url);
            request.setRequestHeader('Authorization', `Bearer ${token}`);
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

                    let profileLink = document.createElement("a");
                    profileLink.href = response.html_url;
                    profileLink.textContent = "Visit Profile";

                    let location = response.location === null ? "No location available" : `"${response.location}"`;

                    let additionalInfo = `
                        Repositories: ${response.public_repos} | Followers: ${response.followers} | Following: ${response.following} <br>
                        Location: ${location} | Created: ${response.created_at} | Last Updated: ${response.updated_at}
                    `;

                    profilePicDiv.innerHTML = '';
                    profileLinkDiv.innerHTML = '';

                    profilePicDiv.appendChild(img);
                    profileLinkDiv.appendChild(profileLink);
                    additionalInfoDiv.innerHTML = additionalInfo;

                    let usernameVar = document.getElementById("usernameplaceholder");
                    usernameVar.placeholder = response.login;


                }
            };

            openPopup();
        }
</script>
</body>
</html>