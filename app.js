// Function to insert patient data
function insertPatient() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://testforme-fnbcgubhdfeha5eb.canadacentral-01.azurewebsites.net/api/insert", true); // Use localhost
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // Done
            if (xhr.status === 200) {
                document.getElementById("result").innerHTML = "<p style='color: green;'>Patient data inserted successfully!</p>";
            } else {
                document.getElementById("result").innerHTML = "<p style='color: red;'>Error inserting patient data: " + xhr.statusText + "</p>";
            }
        }
    };

    const patientData = {
        name: "John Doe",
        age: 30,
        gender: "M"
    };

    xhr.send(JSON.stringify(patientData));
}

// Function to run custom SQL queries
function runQuery() {
    const query = document.getElementById("sqlQuery").value.trim();
    const method = query.toUpperCase().startsWith("SELECT") ? "GET" : "POST";
    const xhr = new XMLHttpRequest();

    if (method === "GET") {
        xhr.open("GET", `https://testforme-fnbcgubhdfeha5eb.canadacentral-01.azurewebsites.net/api/query?sql=${encodeURIComponent(query)}`, true); // Use localhost
    } else {
        xhr.open("POST", "https://testforme-fnbcgubhdfeha5eb.canadacentral-01.azurewebsites.net/api/query", true); // Use localhost
        xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // Done
            if (xhr.status === 200) {
                document.getElementById("result").innerHTML = "<p style='color: green;'>" + xhr.responseText + "</p>";
            } else {
                document.getElementById("result").innerHTML = "<p style='color: red;'>Error running query: " + xhr.statusText + "</p>";
            }
        }
    };

    if (method === "POST") {
        xhr.send(JSON.stringify({ query: query }));
    } else {
        xhr.send();
    }
}

// Attach event listeners to the buttons after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('insertBtn').addEventListener('click', insertPatient);
    document.getElementById('queryBtn').addEventListener('click', runQuery);
});
