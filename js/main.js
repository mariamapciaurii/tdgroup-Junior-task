//GET TABLE
const table = document.querySelector("#magicTable");

//GET TABLE HEADER
const tableHeader = table.querySelector("thead");
const tableBody = table.querySelector("tbody");

let tableColumns = data[0].columns;
let tableData = data[0].data;

//SELECT POPUP
const popup = document.querySelector("#popup");

//DRAW STATIC TABLE HEADER
function drawTableHeader() {
  //Create Table Header Row
  const tableHeaderRow = tableHeader.insertRow(0);

  //Run Foreach for 'tableColumns' array
  tableColumns.forEach((item, index) => {
    //Create Table Header Row Cell
    th = document.createElement("th");
    th.innerHTML = item;
    tableHeaderRow.appendChild(th);

    th.onclick = function () {
      sortBy(item);
    };
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
        //Get Last Cell Of tableRow
        let lastCell = tableBodyRow.insertCell(index + 1);

        //Create Button
        let btn = document.createElement("button");

        //Create Icon
        let icon = document.createElement("img");
        //Change Icon src to remove.png
        icon.src = "img/remove.png";

        //Append Icon To Button
        btn.append(icon);

        //Add Classes To Button
        btn.classList.add("td-table__action", "td-table__action--remove");

        //Append <button> to last sell of row
        lastCell.appendChild(btn);

        //Add Onclick Method To Button
        btn.onclick = function () {
          var id = parseInt(
            this.parentElement.parentElement.firstChild.innerHTML
          );
          deleteRow(id);
        };
      }
    });
  });
}

//DELTE ROW BY ID
function deleteRow(id) {
  //FILTER ARRAY BY ID
  let filteredTableData = tableData.filter((item) => {
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

  updateGenders();
}

//START APP
start();

function showPopup() {
  popup.classList.add("td-popup--active");
}

function closePopup() {
  popup.classList.remove("td-popup--active");
}

//Update genders from selector.js
function updateGenders() {
  const gendersContainer = popup.querySelector(".td-popup__item--genders");

  selector.forEach((item, index) => {
    let radioWrapper = document.createElement("div");

    radioWrapper.classList.add("radioWrapper");

    let radio = document.createElement("input");

    radio.classList.add("genderRadio");
    radio.type = "radio";
    radio.name = "gender";
    radio.value = item.name;

    if (index === 0) {
      radio.checked = true;
    }

    radioWrapper.innerHTML = item.name;

    radioWrapper.prepend(radio);

    gendersContainer.appendChild(radioWrapper);
  });
}

//CREATE NEW ROW
function addNewRow() {
  let id;
  if (tableData.length > 0) {
    id = tableData[tableData.length - 1].id;
  } else {
    id = 0;
  }

  let datetime = new Date().toLocaleDateString();
  let name = popup.querySelector("#name").value;
  // let gender = popup.querySelector("#gender").value;

  var gender = document.querySelector(".genderRadio:checked").value;

  let newRow = {
    id: id + 1,
    datetime: datetime,
    name: name,
    gender: gender,
  };

  //Basic validation
  if (name != "") {
    tableData.push(newRow);

    closePopup();

    tableBody.innerHTML = "";
    drawTableBody(tableData);
    popup.querySelector(".td-popup__content").classList.remove("error");
  } else {
    popup.querySelector(".td-popup__content").classList.add("error");
  }
}

//SORT ID
function sortId(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

//SORT DATE
function sortDate(a, b) {
  let dateA = new Date(a.datetime);
  let dateB = new Date(b.datetime);

  return dateA - dateB;
}

//SORT NAME
function sortName(a, b) {
  let nameA = a.name.toLowerCase();
  let nameB = b.name.toLowerCase();

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}

//SORT GENDER
function sortgender(a, b) {
  let genderA = a.gender.toLowerCase();
  let genderB = b.gender.toLowerCase();

  if (genderA < genderB) return -1;
  if (genderA > genderB) return 1;
  return 0;
}

//SORT BY id , date , name or gender
function sortBy(sortArg) {
  let sortedArray;

  if (sortArg === "id") {
    sortedArray = tableData.sort(sortId);
  } else if (sortArg === "datetime") {
    sortedArray = tableData.sort(sortDate);
  } else if (sortArg === "name") {
    sortedArray = tableData.sort(sortName);
  } else if (sortArg === "gender") {
    sortedArray = tableData.sort(sortgender);
  }

  if (sortedArray) {
    tableBody.innerHTML = "";
    drawTableBody(sortedArray);
  }
}
