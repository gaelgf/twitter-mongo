// GRAPHIQUE 1
(function () {
  'use strict';

  angular.module('tweets', [])
    .controller('TweetsController', function ($scope, TweetsService) {

      var vm = this;

      TweetsService.getRetweets()
        .then(saveRetweets);

      function saveRetweets(res) {
        vm.retweets = res.data;
      }


      TweetsService.getTweetsByDate("Tue Apr 04 15:48:57 +0000 2015", "Tue Apr 04 15:48:57 +0000 2016")
        .then(saveTweetsByDate);

      function saveTweetsByDate(res) {
        vm.tweetsbydate = res.data;

        //a mettre dans le graphique
        //faire des date dynamique

        vm.chart = Highcharts.chart('BaseCharts', {

          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },

          series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          }]
        });
      }






      TweetsService.getTweetsByLangage()
        .then(saveTweetsByLangage);

      function saveTweetsByLangage(res) {
        vm.AllLangage = res.data;


        Highcharts.chart('LanguageCharts', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Number tweets by Language'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: 'Number'
            }

          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y:.1f}'
              }
            }
          },

          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
          },

          series: [{
            name: 'Brands',
            colorByPoint: true,
            data: vm.AllLangage
          }]
        });

      }
    });
}());


// GRAPHIQUE 2
(function () {
  'use strict';

  angular.module('tweets', [])
    .controller('TweetsController', function ($scope) {

      var vm = this;

      vm.chart = Highcharts.SparkLine = function (a, b, c) {
      var hasRenderToArg = typeof a === 'string' || a.nodeName,
        options = arguments[hasRenderToArg ? 1 : 0],
        defaultOptions = {
          chart: {
            renderTo: (options.chart && options.chart.renderTo) || this,
            backgroundColor: null,
            borderWidth: 0,
            type: 'area',
            margin: [2, 0, 2, 0],
            width: 120,
            height: 20,
            style: {
              overflow: 'visible'
            },

            // small optimalization, saves 1-2 ms each sparkline
            skipClone: true
          },
          title: {
            text: ''
          },
          credits: {
            enabled: false
          },
          xAxis: {
            labels: {
              enabled: false
            },
            title: {
              text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
          },
          yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
              enabled: false
            },
            title: {
              text: null
            },
            tickPositions: [0]
          },
          legend: {
            enabled: false
          },
          tooltip: {
            backgroundColor: null,
            borderWidth: 0,
            shadow: false,
            useHTML: true,
            hideDelay: 0,
            shared: true,
            padding: 0,
            positioner: function (w, h, point) {
              return { x: point.plotX - w / 2, y: point.plotY - h };
            }
          },
          plotOptions: {
            series: {
              animation: false,
              lineWidth: 1,
              shadow: false,
              states: {
                hover: {
                  lineWidth: 1
                }
              },
              marker: {
                radius: 1,
                states: {
                  hover: {
                    radius: 2
                  }
                }
              },
              fillOpacity: 0.25
            },
            column: {
              negativeColor: '#910000',
              borderColor: 'silver'
            }
          }
        };

      options = Highcharts.merge(defaultOptions, options);

      return hasRenderToArg ?
        new Highcharts.Chart(a, options, c) :
        new Highcharts.Chart(options, b);
    };

    var start = +new Date(),
      $tds = $('td[data-sparkline]'),
      fullLen = $tds.length,
      n = 0;

    // Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
    // can take some seconds, so we split the input into chunks and apply them in timeouts
    // in order avoid locking up the browser process and allow interaction.
    function doChunk() {
      var time = +new Date(),
        i,
        len = $tds.length,
        $td,
        stringdata,
        arr,
        data,
        chart;

      for (i = 0; i < len; i += 1) {
        $td = $($tds[i]);
        stringdata = $td.data('sparkline');
        arr = stringdata.split('; ');
        data = $.map(arr[0].split(', '), parseFloat);
        chart = {};

        if (arr[1]) {
          chart.type = arr[1];
        }
        $td.highcharts('SparkLine', {
          series: [{
            data: data,
            pointStart: 1
          }],
          tooltip: {
            headerFormat: '<span style="font-size: 10px">' + $td.parent().find('th').html() + ', Q{point.x}:</span><br/>',
            pointFormat: '<b>{point.y}.000</b> USD'
          },
          chart: chart
        });

        n += 1;

        // If the process takes too much time, run a timeout to allow interaction with the browser
        if (new Date() - time > 500) {
          $tds.splice(0, i + 1);
          setTimeout(doChunk, 0);
          break;
        }

        // Print a feedback on the performance
        if (n === fullLen) {
          $('#result').html('Generated ' + fullLen + ' sparklines in ' + (new Date() - start) + ' ms');
        }
      }
    }
    doChunk();
    });
}());