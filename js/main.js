console.log("Data", data);

//GET TABLE
const table = document.querySelector("#magicTable");

//GET TABLE HEADER
const tableHeader = table.querySelector('thead');
const tableBody = table.querySelector('tbody');

const tableColumns = data[0].columns;
const tableData = data[0].data;

function drawTableHeader() {

    //Create Table Header Row
    const tableHeaderRow = tableHeader.insertRow(0);

    //Run Foreach for 'tableColumns' array
    tableColumns.forEach((item, index) => {

        th = document.createElement('th');
        th.innerHTML = item;
        tableHeaderRow.appendChild(th);

        //Create Table Header Row Cell
        // let tableHeaderCell = tableHeaderRow.insertCell(index);

        // //Add Text To Empty Cell from 'tableColumns' array
        // tableHeaderCell.innerHTML = item;

    });

}

function drawTableBody() {

    //Run Foreach for 'tableData' array
    tableData.forEach((item, index) => { 

        //Create Table Header Row
        const tableBodyRow = tableBody.insertRow(index);

        Object.keys(item).forEach((key, index, array) => {

            let tableBodyCell = tableBodyRow.insertCell(index);
            tableBodyCell.innerHTML = item[key];

            if (index === array.length - 1) {

                let lastCell = tableBodyRow.insertCell(index + 1);

                let btn = document.createElement("button"); // Create a <button> element
                btn.innerHTML = "Delete Row"; // Insert text
                lastCell.appendChild(btn); // Append <button> to <body>

             

            }

        });


    });


    var buttons = document.querySelectorAll('button');

    buttons.forEach((button , index) => {
        console.log("Index" , index);
    })
  

}

function drawTable() {
    drawTableHeader();
    drawTableBody();
}

drawTable();


// for(var i = 0; i < table.rows.length; i++) {

//     console.log("Table Row" , table.rows[i]);

//     let deleteButton = table.rows[i].querySelectorAll('button');

//     deleteButton.onclick = function() {
//         let index = this.rowIndex;
//         table.deleteRow(index);
//     }

// }


// console.log('Data Body' , tableColumns);