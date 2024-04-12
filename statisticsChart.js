
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Projects', 4],
        ['Clients', 5],
        ['Reviews', 3],
        ['Store', 1]
    ]);

    var options = {
        title: 'Our Service Statistics',
        pieHole: 0.3,
        slices: {
            0 : { color: '#14b8a6' },
            1 : { color: '#14b8a6' },
            2: { color: '#14b8a6', offset: 0.1 },
            3 : { color: '#14b8a6' },
        },
    };

    var chart = new google.visualization.PieChart(document.getElementById('analytics-chart'));
    chart.draw(data, options);
}