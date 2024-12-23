
async function fetchTable(tableName) {
    console.log(`Fetching table: ${tableName}`);
    try {
        const response = await fetch('http://localhost:3000/all');
        // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
        const responseData = await response.json();
        console.log(responseData);
        const data = responseData[tableName];
        if (!data) {
            console.error(`No data found for table: ${tableName}`);
            alert(`No data available for ${tableName}.`);
            return;
        }
        renderTable(tableName, data);
    } catch (error) {
        console.error("Error fetching table:", error);
        alert("Failed to load data.");
    }
    }


function renderTable(tableName, data) {
    console.log(`Rendering table: ${tableName}`);
    console.log("Table data:", data);

    const columns = {
        agents: ["_id", "NationalCode", "FullName", "PhoneNumber", "Address", "createdAt"],
        customers: ["_id","NationalCode", "FullName", "PhoneNumber", "Address", "createdAt"],
        deals: ["_id", "custId", "agentId", "propId", "finalPrice", "description", "deal_date"],
        owners: ["_id","NationalCode", "FullName", "PhoneNumber", "Address", "createdAt"],
        properties: ["_id", "Type", "Status", "PostalCode", "Address", "YearOf", "Price", "Description", "ownerId","createdAt"],
        visits: ["_id", "custId", "agentId", "propId", "description", "visit_date"]
    };

    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";

    const table = document.createElement("table");
    table.className = "table-auto border-collapse border border-gray-500 w-full text-sm bg-gray-800 text-gray-200 rounded-md";

    const thead = document.createElement("thead");
    thead.className = "bg-gray-900 text-white";
    const headerRow = document.createElement("tr");

    columns[tableName].forEach(col => {
        const th = document.createElement("th");
        th.className = "border border-gray-600 px-4 py-2 text-left";
        th.innerText = col;
        headerRow.appendChild(th);
    });

    const actionsTh = document.createElement("th");
    actionsTh.className = "border border-gray-600 px-4 py-2 text-left";
    actionsTh.innerText = "Actions";
    headerRow.appendChild(actionsTh);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    data.forEach((row, index) => {
        console.log("Rendering row:", row);
        const tr = document.createElement("tr");
        tr.className = index % 2 === 0 ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-600 hover:bg-gray-500";

        columns[tableName].forEach(col => {
            const td = document.createElement("td");
            td.className = "border border-gray-600 px-4 py-2 text-gray-200";
            td.innerText = row[col] || "";
            tr.appendChild(td);
        });

        const actionsTd = document.createElement("td");
        actionsTd.className = "border border-gray-600 px-4 py-2";
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700";
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = () => deleteRow(tableName, row);
        actionsTd.appendChild(deleteBtn);
        tr.appendChild(actionsTd);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}


async function deleteRow(tableName, row) {
    console.log(`Attempting to delete row:`, row);
    if (confirm("مطمینید میخواید این خط را پاک کنید؟")) {
        try {
            const response = await fetch(`http://localhost:3000/${tableName}/${row._id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("Row deleted successfully.");
            alert("با موفقیت پاک شد");
            fetchTable(tableName);
        } catch (error) {
            console.error("Error deleting row:", error);
            alert("ارور هنگام پاک کردن");
        }
    }
}
async function addRow(tableName, newRow) {
    console.log(`Attempting to add row to table: ${tableName}`);
    try {
        const response = await fetch(`http://localhost:3000/${tableName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRow)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Row added successfully.");
        alert("ردیف با موفقیت اضافه شد");
        fetchTable(tableName);
    } catch (error) {
        console.error("Error adding row:", error);
        alert("ارور هنگام اضافه کردن ردیف");
    }
}

// function showAddRowForm(tableName) {
//     console.log(`huh: ${tableName}`);
//     alert(`dadash ${tableName} is under development.`);
// }
