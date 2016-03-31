import Component from '../../component';
import template from './home.html';

export default Component.extend({
  template,

  initialize: function() {
    this.template.registerPartial('nav', require('../partials/nav.html'));
    var BALLS_QUANTITY = 6;

    // Load data from endpoint
    $.getJSON('http://data.ny.gov/resource/d6yy-54nr.json').then(function(data) {
      var $results = $('#results');

      // Iterate throuhg results
      for(var i = 0; i < data.length; i++) {
        var currentResults = data[i];
        var dataToRender = {
          label: 'U.S. - Powerball',
          winningNumbers: currentResults.winning_numbers.split(' '),
          date: moment(currentResults.draw_date).format('DD MMMM'),
          multiplier: currentResults.multiplier
        };

        // Generate template for balls
        function chechIfActive(multiplier, index) {
          return (BALLS_QUANTITY - multiplier - 1 < index ? ' active' : ''); // -1 to decrease index
        }

        var winningNimbersTemplate = '';
        dataToRender.winningNumbers.forEach(function(element, index) {
          winningNimbersTemplate += '<div class="ball' + chechIfActive(dataToRender.multiplier, index) + '">' + element + '</div>';
        });

        // Render data to widget
        $results.append(
          '<div>' +
            '<div class="label">' + dataToRender.label + '</div>' +
            '<div class="date">' + dataToRender.date + '</div>' +
            '<div style="clear: both;"></div>' +
            '<div class="balls">' + winningNimbersTemplate + '</div>' +
            '<hr />' +
          '</div>'
        );
      };
    });
  }
});
