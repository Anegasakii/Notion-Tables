function addRow() {
	const table = document.getElementById("preview");
	const totalRows = table.rows.length;

	let row = table.insertRow(-1);

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

function submit(){
    let start = "\\begin{array}"
    let end = "\\end{array}"
    
    const tableData = document.getElementById("preview");
    const cols = tableData.rows[0].cells.length;
    const rows = tableData.rows.length;
    let align = "{|l"
    for(let i = 1; i < cols; i++){
      align += "|l";
    }
    align += "|} ";
    let body = "";
    for(let currentRow = 0; currentRow < rows; currentRow++){
      let row = '';
      for(let currentCol = 0; currentCol < cols; currentCol++){
        let cell = document.getElementById(`${currentRow},${currentCol}`).value;
        //console.log(cell)
        row += `\\text{${cell}} & `;
      }
      row = row.substring(0,row.length-2);
      row += "\\\\\\hline <br>"
      body += row
    }
    
    let code = start + align + "\\hline <br>" + body + end;
    document.getElementById("code").innerHTML = code;
}


function copyToClipboard() {
	let dummy = document.createElement("textarea");
	// to avoid breaking orgain page when copying more words
	// cant copy when adding below this code
	// dummy.style.display = 'none'
	document.body.appendChild(dummy);
	//Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
	dummy.value = document.getElementById("code").innerText ;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
}