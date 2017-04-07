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


      TweetsService.getTweetsByDate("Tue Apr 04 15:48:57 +0000 2017", "Sun Jan 01 15:48:57 +0000 2017")
        .then(saveTweetsByDate);

      function saveTweetsByDate(res) {
        vm.tweetsbydate = res.data;

        //a mettre dans le graphique
        //faire des date dynamique

        Highcharts.chart('BaseCharts', {

          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },

          series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          }]
        });
      }






      TweetsService.getTweetsByLangage('got')
        .then(saveGotTweetsByLangage);

      function saveGotTweetsByLangage(res) {

        Highcharts.chart('GotLanguageCharts', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Tweets number on Game of Thrones by Language'
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
            data: res.data
          }]
        });

      }

      TweetsService.getTweetsByLangage('Vikings')
        .then(saveVinkingsTweetsByLangage);

      function saveVinkingsTweetsByLangage(res) {

        Highcharts.chart('VinkingsLanguageCharts', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Tweets number on Vinkings by Language'
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
            data: res.data
          }]
        });

      }

      TweetsService.getTweetsByLangage('walkingdead')
        .then(saveWalkingDeadTweetsByLangage);

      function saveWalkingDeadTweetsByLangage(res) {

        Highcharts.chart('walkingdeadLanguageCharts', {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Tweets number on Walking dead by Language'
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
            data: res.data
          }]
        });

      }

      TweetsService.listSeriesByFrTweets()
        .then(saveSeriesByFrTweets);

      function saveSeriesByFrTweets(res) {

        Highcharts.chart('seriesByFrTweets', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Tweets number number by serie'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            name: 'Brands',
            colorByPoint: true,
            data: res.data
          }]
        });
      }


    //personnages
    TweetsService.listVikingsByCharacter()
      .then(saveVinkingsTweetsByCharacter);

    function saveVinkingsTweetsByCharacter(res) {

      Highcharts.chart('VinkingsCharactersCharts', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Tweets number on Vinkings by Character'
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
          data: res.data
        }]
      });

    }

    TweetsService.listGOTByCharacter()
      .then(saveGOTTweetsByCharacter);

    function saveGOTTweetsByCharacter(res) {

      Highcharts.chart('GOTCharactersCharts', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Tweets number on Vinkings by Character'
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
          data: res.data
        }]
      });

    }

    TweetsService.listWalkingDeadByCharacter()
      .then(saveWalkingDeadTweetsByCharacter);

    function saveWalkingDeadTweetsByCharacter(res) {

      Highcharts.chart('WalkingDeadCharactersCharts', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Tweets number on Walking Dead by Character'
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
          data: res.data
        }]
      });

    }

    });
}());
