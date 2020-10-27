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

function importTable() {
	newTable = prompt("Enter something you got from here before");
	newTable = String.raw`${newTable}`
	const table = document.getElementById("preview");
	console.log(newTable);
	if(newTable.substr(0,13) != String.raw`\begin{array}`){
		alert("Error: Does not begin with \\begin{array}")
		return
	}
	if(newTable.substr(-11, 11) != String.raw`\end{array}`){
		alert("Error: Does not end with \\end{array}");
		return
	} 
	arrayed = newTable.split("\hline")
	console.log(arrayed);
	arrayed[0] = arrayed[0].slice(13); // gets rid of the begin and end stuff since it's been confirmed to be there
	arrayed.pop();
	const columns = (arrayed[0].match(/l/g) || []).length;
	arrayed.shift();
	const rows = arrayed.length;
	console.log(arrayed);
	console.log(rows, "x", columns);
	for(let i = 0; i < arrayed.length; i++){
		let row = arrayed[i];
		row = row.split(String.raw`\text{`)
		row.shift();
		arrayed[i] = row;
		}
	console.log(arrayed);
	newPreview = "";
	for(let i = 0; i < arrayed.length; i++){
		let row = arrayed[i]
		newPreview += "<tr>"
			for(let j = 0; j < row.length; j++){
				let text = row[j];
				if(row[row.length-1] == text){
					text = text.slice(0, -5);
				}
				else {
					text = text.slice(0, -4);
				}
				newPreview += `<td><input type="text" form="table" id="${i},${j}" value="${text}"></td>`
			}
		newPreview += "</tr>"
	}
	console.log(newPreview);
	table.innerHTML = newPreview;
}