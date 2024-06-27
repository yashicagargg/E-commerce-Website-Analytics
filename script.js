document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            localStorage.setItem('csvData', data);
        };
        reader.readAsText(file);
    }
}

function submitData() {
    window.open('graphs.html', '_blank');
}

function parseCSV(data) {
    const rows = data.split('\n');
    const headers = rows[0].split(',');
    const rowsData = rows.slice(1).map(row => row.split(','));

    const parsedData = {};
    headers.forEach((header, index) => {
        parsedData[header] = rowsData.map(row => row[index]);
    });

    return parsedData;
}

function generateGraphs() {
    const data = localStorage.getItem('csvData');
    if (!data) return;

    const parsedData = parseCSV(data);

    const trace1 = {
        x: parsedData['Working Date'],
        y: parsedData['price'],
        mode: 'lines',
        name: 'Price Over Time'
    };

    const trace2 = {
        x: parsedData['Working Date'],
        y: parsedData['qty_ordered'],
        mode: 'lines',
        name: 'Quantity Ordered Over Time'
    };

    const trace3 = {
        x: parsedData['Working Date'],
        y: parsedData['grand_total'],
        mode: 'lines',
        name: 'Grand Total Over Time'
    };

    const trace4 = {
        x: parsedData['Working Date'],
        y: parsedData['discount_amount'],
        mode: 'lines',
        name: 'Discount Amount Over Time'
    };

    Plotly.newPlot('chart1', [trace1], { title: 'Price Over Time' });
    Plotly.newPlot('chart2', [trace2], { title: 'Quantity Ordered Over Time' });
    Plotly.newPlot('chart3', [trace3], { title: 'Grand Total Over Time' });
    Plotly.newPlot('chart4', [trace4], { title: 'Discount Amount Over Time' });
}

window.onload = generateGraphs;
