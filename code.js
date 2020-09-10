function addRow() {
  // Find a <table> element with id="myTable":
  const table = document.getElementById("preview");
  const totalRows = table.rows.length;

  // Create an empty <tr> element and add it to the 1st position of the table:
  let row = table.insertRow(-1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  for (i = 0; i < table.rows[0].cells.length; i++) {
    let newCell = row.insertCell(i);
    newCell.innerHTML = `<input type="text" form="table" id="${totalRows},${i}" value="${totalRows},${i}">`;
  }
}

function delRow() {
  const table = document.getElementById("preview")
  if (table.rows.length > 1) {
    table.deleteRow(-1);
  }
}

function addCol() {
  const table = document.getElementById('preview')
  const cols = table.rows[0].cells.length
  for (i = 0; i < table.rows.length; i++) {
    let newCell = table.rows[i].insertCell(cols)
    newCell.innerHTML = `<input type="text" form="table" id="${i},${cols}" value="${i},${cols}">`;
  }
}

function delCol() {
  const table = document.getElementById('preview'); // table reference
  if (table.rows[0].cells.length > 1) {
    for (i = 0; i < table.rows.length; i++) {
      table.rows[i].deleteCell(-1)
    }
  }
}


function submit() {
  alert("It works!")
}