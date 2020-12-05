//Fetching Covid-Data!!
getCovidData();
async function getCovidData(){
	const api = 'https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true';
	const response = await fetch(api);
	const datas = await response.json();
	// console.log(data)
	datas.forEach(data =>{
		const {country, infected} = data;
	})
};

getUSACovid();
async function getUSACovid() {
	// const api = 'https://api.apify.com/v2/key-value-stores/moxA3Q0aZh5LosewB/records/LATEST?disableRedirect=true';
	const api = 'https://api.covid19api.com/summary';
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	const response = await fetch(proxyurl+api);
	const coviddatas = await response.json();
	console.log(coviddatas.Countries[0])
	// coviddatas.casesByState.forEach(data =>{
	// 	const USdata = coviddatas.casesByState;
    //
	// })
	// console.log(USdata)
	// let resultsHTML = "<tr><th>Time</th><th>Conditions</th><th>Temp</th><th>Precip</th></tr>";

	var coviddata = new Array();
        coviddata.push(["Country", "NewConfirmed", "TotalConfirmed", "NewDeaths", "TotalDeaths", "NewRecovered","TotalRecovered"]);

		for (i=0; i<coviddatas.Countries.length; i++)
		{
			        // coviddata.push([[coviddatas.casesByState[0]].name, [coviddatas.casesByState[0]].casesReported]);
                coviddata.push([coviddatas.Countries[i].Country,
                coviddatas.Countries[i].NewConfirmed,
                coviddatas.Countries[i].TotalConfirmed,
                coviddatas.Countries[i].NewDeaths,
                coviddatas.Countries[i].TotalDeaths,
                coviddatas.Countries[i].NewRecovered,
                coviddatas.Countries[i].TotalRecovered]);

		}

        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";


        //Get the count of columns.
        var columnCount = coviddata[0].length;

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = coviddata[0][i];
            row.appendChild(headerCell);
        }

        //Add the data rows.
        for (var i = 1; i < coviddata.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = coviddata[i][j];
            }
        }

        var dvTable = document.getElementById("dvTable");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);


};
//Show Chart
// showChart();
// function showChart(){
// const ctx = document.getElementById('ourChart').getContext('2d');
// const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });
// }
