export default function createChart(
  time,
  stockUp,
  stockNoChange,
  stockDown,
  plotbandDates
) {
  console.log(plotbandDates);
  Highcharts.chart('container', {
    accessibility: {
      enabled: false
    },
    chart: {
      type: 'area',
      zoomType: 'x',

    },
    title: {
      text: 'Percentage-stacked Area',
    },
    xAxis: {
      plotBands: plotbandDates,
      type: 'datetime',
      tickmarkPlacement: 'between',
      tickInterval: 1,
      categories: time,
      title: {
        enabled: false,
      },
      useHTML: true,

    },
    yAxis: {
      labels: {
        format: '{value}%',
      },
      title: {
        enabled: false,
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> <br/>',
      headerFormat: '<b>{point.key}</b><br><br>',
    },
    plotOptions: {
      area: {
        stacking: 'percent',
        lineColor: '#ffffff',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#ffffff',
        },
        borderRadius: 10
      },
    },
    series: [{
        name: 'Up',
        data: stockUp,
        color: '#2D9F3E',

      },
      {
        name: 'No Change',
        data: stockNoChange,
        color: '#C0C0C0',

      },
      {
        name: 'Down',
        data: stockDown,
        color: '#C93B3B',
      },
    ],
  });
}