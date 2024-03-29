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
            background-color: rgba(0, 0, 0, 0.71);
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
        .namebox,
        .serverStatus,
        .usernamebox {
            flex: 1; /* Equal width for each box */
            border: darkgray 2px solid;
            padding: 5px;
            margin: 5px; /* Add margin between the boxes */
        }
        .userContent {
            display: flex;
            flex-direction: row; /* Display children in a row */
            justify-content: space-between; /* Add space between children */
            align-items: center; /* Vertically align children */
        }


</style>
</head>

<body>
    <input type="text" id="userInput" placeholder="Enter Github user...">
    <button onclick="fetchUser()">Enter</button>
    <table id="view_table">
        <thead>
            <tr>
            <th>GitHub ID</th>
            <th>Name</th>
            <th>Server Needed</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody id="result">
            <!-- javascript generated data -->
        </tbody>
    </table>
    <div class="overlay" id="popupOverlay">
        <div class="popup">
            <div class="fetchResults">
                <div id="profilepic"></div>
                <h1 id="username"></h1>
                <h2 id="bio"></h2>
                <div id="profilelink"></div>
                <p id="additionalInfo"></p>
                <div class="userContent">
                    <div class="namebox">
                        <p>Name:</p>
                        <input type="name" id="nameplaceholder" placeholder="">
                    </div>
                    <div class="serverStatus">
                        <p>Server Needed?</p>
                        <input type="checkbox" name="server_needed" id="server_needed">
                    </div>
                    <div class="usernamebox">
                        <p>Github Username:</p>
                        <input type="username" id="usernameplaceholder" placeholder="">
                    </div>
                </div>
            </div>
            <button onclick="create_user()">Add User</button>
            <button onclick="closePopup()">Close</button>
        </div>
    </div>


<script>
    // prepare HTML result container for new output
    const resultContainer = document.getElementById("result");
    // prepare URL's to allow easy switch from deployment and localhost
    //const url = "http://localhost:8180/api/users/";
    const url = "https://devops.nighthawkcodingsociety.com/api/users/"
    
    // Standard definitions
    const request_options = {
        mode: 'cors',
        cache: 'default',
        credentials: 'omit',
        headers: {
        'Content-Type': 'application/json'
        }
    };

    // Load users on page entry
    read_users();


    // Call the API with GET request (read)
    function read_users() {
        // prepares request options
        const read_options = {
        ...request_options,
        method: 'GET'
        };

        // fetch the data from API
        fetch(url, read_options)
        // response is a RESTful "promise" on any successful fetch
        .then(response => {
            // check for response errors
            if (response.status !== 200) {
                const errorMsg = 'Database read error: ' + response.status;
                console.log(errorMsg);
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                td.innerHTML = errorMsg;
                tr.appendChild(td);
                resultContainer.appendChild(tr);
                return;
            }
            // valid response will have json data
            response.json().then(data => {
                console.log(data);
                // delete old data
                while (resultContainer.children.length) {
                resultContainer.removeChild(resultContainer.lastChild);
                }
                // update new data
                for (let row in data) {
                console.log(data[row]);
                add_row(data[row]);
                }
            })
        })
        // catch fetch errors (ie ACCESS to server blocked)
        .catch(err => {
        console.error(err);
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.innerHTML = err;
        tr.appendChild(td);
        resultContainer.appendChild(tr);
        });
    }

    function create_user(){
        
        const body = {
            uid: document.getElementById("usernameplaceholder").value,
            name: document.getElementById("nameplaceholder").value,
            server_needed: document.getElementById("server_needed").checked 
        };

        // Call the API with POST request (create)
        const post_options = {
        ...request_options,
        method: 'POST',
        body: JSON.stringify(body),
        };

        // URL for Create API
        // Fetch API call to the database to create a new user
        fetch(url, post_options)
        .then(response => {
            // trap error response from Web API
            if (response.status !== 200) {
            const errorMsg = 'Database create error: ' + response.status;
            console.log(errorMsg);
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.innerHTML = errorMsg;
            tr.appendChild(td);
            resultContainer.appendChild(tr);
            return;
            }
            // response contains valid result
            response.json().then(data => {
                console.log(data);
                //add a table row for the new/created userid
                add_row(data);
            })
        })

        closePopup()
    }


    function updateEvent(id) {
    // Handle update action here
    console.log("Update button clicked for ID:", id);

    // Find the existing row
    const existingRow = document.getElementById(`row-${id}`);
    
    // Input fields for update
    const uidInput = document.createElement("input");
    uidInput.type = "text";
    uidInput.value = document.getElementById(`uid-${id}`).innerHTML;
    
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = document.getElementById(`name-${id}`).innerHTML;
    
    const serverNeededInput = document.createElement("input");
    serverNeededInput.type = "checkbox";
    serverNeededInput.checked = document.getElementById(`serverNeeded-${id}`).innerHTML === "Yes";

    // Save button
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", () => {
        // Construct the updated data object
        const updatedData = {
        uid: uidInput.value,
        name: nameInput.value,
        server_needed: serverNeededInput.checked
        };

        // Call the API with a PUT request (update)
        const update_options = {
        ...request_options,
        method: 'PUT',
        body: JSON.stringify(updatedData)
        };

        fetch(`${url}${id}`, update_options)
        .then((response) => {
            if (response.status === 200) {
            // Update was successful
            read_users(); // Refresh the table
            } else {
            // Display error message in a cell
            const errorCell = document.createElement("td");
            errorCell.style.color = "red";
            errorCell.textContent = "Update failed. Please try again.";
            existingRow.appendChild(errorCell);
            }
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
    });

    // Create <td> elements for each input
    const uidCell = document.createElement("td");
    uidCell.appendChild(uidInput);

    const nameCell = document.createElement("td");
    nameCell.appendChild(nameInput);
    
    const serverNeededCell = document.createElement("td");
    serverNeededCell.appendChild(serverNeededInput);

    const saveBtnCell = document.createElement("td");
    saveBtnCell.appendChild(saveBtn);

    // Remove existing row content
    while (existingRow.firstChild) {
        existingRow.removeChild(existingRow.firstChild);
    }

    // Add input fields and save button to the form
    existingRow.appendChild(uidCell);
    existingRow.appendChild(nameCell);
    existingRow.appendChild(serverNeededCell);
    existingRow.appendChild(saveBtnCell);
    }

    function deleteEvent(id) {
    // Handle delete action here
    console.log("Delete button clicked for ID:", id);

    // Prompt user for password input
    const password = prompt("Enter 'delete' to confirm:");

    // Check if the entered password is correct
    if (password === "delete") {
        // Call the delete API with a DELETE request
        const delete_options = {
        ...request_options,
        method: 'DELETE',
        };

        fetch(`${url}${id}`, delete_options)
        .then((response) => {
            if (response.status === 200) {
            // Deletion was successful
            read_users(); // Refresh the table
            } else {
            // Display error message in a cell
            const errorCell = document.createElement("td");
            errorCell.style.color = "red";
            errorCell.textContent = "Delete failed. Please try again.";
            existingRow.appendChild(errorCell);
            }
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
        });
    } else {
        // Display error message for incorrect password
        const errorCell = document.createElement("td");
        errorCell.style.color = "red";
        errorCell.textContent = "Incorrect password. Deletion canceled.";
        existingRow.appendChild(errorCell);
    }
    }


    function add_row(data) {
    const tr = document.createElement("tr");
    tr.id = `row-${data.id}`; // Set a unique ID for the row

    const uid = document.createElement("td");
    const name = document.createElement("td");
    const serverNeeded = document.createElement("td");
    const actions = document.createElement("td");

    // obtain data that is specific to the API
    uid.innerHTML = data.uid;
    uid.id = `uid-${data.id}`; // Set a unique ID for the GitHub ID cell

    name.innerHTML = data.name;
    name.id = `name-${data.id}`;
    serverNeeded.innerHTML = data.server_needed ? "Yes" : "No";
    serverNeeded.id = `serverNeeded-${data.id}`;

    // "Update" and "Delete" buttons
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.addEventListener("click", () => {
        updateEvent(data.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        deleteEvent(data.id);
    });

    // Add buttons to the actions column
    actions.appendChild(updateBtn);
    actions.appendChild(deleteBtn);

    // add HTML to container
    tr.appendChild(uid);
    tr.appendChild(name);
    tr.appendChild(serverNeeded);
    tr.appendChild(actions);

    resultContainer.appendChild(tr);
    }
    
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

                    console.log(response)

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

                    let nameVar = document.getElementById("nameplaceholder");
                    nameVar.value = ""
                    nameVar.value = response.name;

                    let usernameVar = document.getElementById("usernameplaceholder");
                    usernameVar.value = ""
                    usernameVar.value = response.login;


                }
            };

            openPopup();
        }
</script>
</body>
</html>