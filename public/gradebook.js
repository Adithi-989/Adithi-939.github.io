fetchGradeData(); // 🔹 Moved this to the end, no longer using const gradeData = ...

function fetchGradeData() {
    console.log("Fetching grade data...");

    let xhr = new XMLHttpRequest();
    let apiRoute = "/api/grades";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status !== 200) {
                console.error(`Could not get grades.\nStatus: ${xhr.status}`);
                return;
            }

            const data = JSON.parse(xhr.responseText);

            // 🔹 This line stays here — now only runs after we receive data
            console.log("Populating gradebook with data:", data);
            populateGradebook(data); // Only call this inside the async callback
        }
    };

    xhr.open("GET", apiRoute, true);
    xhr.send();
}

//  This function fills the table with grade data
function populateGradebook(data) {
    console.log("Populating gradebook with data:", data);

    let tableEl = document.getElementById("gradebook");

    // 🔹 Added this error check to avoid forEach crash
    if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return;
    }

    data.forEach(function (assignment) {
        let row = document.createElement("tr");

        let columns_name = document.createElement("td");
        columns_name.appendChild(
            document.createTextNode(assignment.last_name + ", " + assignment.first_name)
        );

        let columns_grade = document.createElement("td");
        columns_grade.appendChild(
            document.createTextNode(assignment.total_grade)
        );

        row.appendChild(columns_name);
        row.appendChild(columns_grade);
        tableEl.appendChild(row);
    });
}

/* 🔻 REMOVED THESE TWO LINES — they caused the undefined error
const gradeData = fetchGradeData();
populateGradebook(gradeData);
*/
