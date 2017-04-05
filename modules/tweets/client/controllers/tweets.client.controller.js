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

      vm.chart = Highcharts.chart('BaseCharts', {

        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        series: [{
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
      });
    });
}());
