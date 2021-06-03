//GET TABLE
const table = document.querySelector("#magicTable");

//GET TABLE HEADER
const tableHeader = table.querySelector('thead');
const tableBody = table.querySelector('tbody');

let tableColumns = data[0].columns;
let tableData = data[0].data;

//DRAW STATIC TABLE HEADER
function drawTableHeader() {

    //Create Table Header Row
    const tableHeaderRow = tableHeader.insertRow(0);

    //Run Foreach for 'tableColumns' array
    tableColumns.forEach((item, index) => {

        //Create Table Header Row Cell
        th = document.createElement('th');
        th.innerHTML = item;
        tableHeaderRow.appendChild(th);

        th.onclick = function () {
            sortBy(item);
        }

    });

}

//DRAW TABLE BODY BY PASSED DATA
function drawTableBody(data) {

    //Run Foreach for 'tableData' array
    data.forEach((item, index) => {

        //Create Table Header Row
        const tableBodyRow = tableBody.insertRow(index);

        Object.keys(item).forEach((key, index, array) => {

            let tableBodyCell = tableBodyRow.insertCell(index);
            tableBodyCell.innerHTML = item[key];

            if (index === array.length - 1) {

                let lastCell = tableBodyRow.insertCell(index + 1);

                let btn = document.createElement("button"); // Create a <button> element
                btn.innerHTML = "Delete"; // Insert text
                lastCell.appendChild(btn); // Append <button> to last sell of row

                btn.onclick = function () {
                    var id = parseInt(this.parentElement.parentElement.firstChild.innerHTML);
                    deleteRow(id);
                }

            }

        });


    });


}

//DELTE ROW BY ID
function deleteRow(id) {

    //FILTER ARRAY BY ID
    let filteredTableData = tableData.filter(item => {
        return item.id != id;
    });

    //CHANGE DEFAULT DATA TO FILTERED ONE
    tableData = filteredTableData;

    //REMOVE OLD TABLE BODY
    tableBody.innerHTML = "";

    //RE-RENDER NEW BODY WITH NEW FITLER DATA
    drawTableBody(filteredTableData);
}

//MAIN DRAW TABLE FUNCION
function start() {
    drawTableHeader();
    drawTableBody(tableData);
}

//START APP
start();

//SELECT POPUP
const popup = document.querySelector("#popup");

function showPopup() {
    popup.classList.add("td-popup--active");
}

function closePopup() {
    popup.classList.remove("td-popup--active");
}

//CREATE NEW ROW
function addNewRow() {
    let id;
    if (tableData.length > 0) {
        id = tableData[tableData.length - 1].id;

    } else {
        id = 0;
    }

    let datetime = new Date().toLocaleString();
    let name = popup.querySelector("#name").value;
    let sex = popup.querySelector("#sex").value;

    let newRow = {
        "id": id + 1,
        "datetime": datetime,
        "name:": name,
        "sex": sex
    }

    tableData.push(newRow);

    closePopup();

    tableBody.innerHTML = "";
    drawTableBody(tableData);

}

function sortBy(by) {
    tableData.sort((a, b) => (a.by > b.by) ? 1 : -1)
    tableBody.innerHTML = "";
    drawTableBody(tableData);
}