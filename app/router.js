import Backbone from 'backbone';

import HomePage from './views/pages/home';
import LotterisPage from './views/pages/lotteris';
import ResultsPage from './views/pages/results';
import SupportPage from './views/pages/support';
import MyAccountPage from './views/pages/myaccount';

const routes = {
  '': 'index',
  'lotteris': 'lotteris',
  'results': 'results',
  'support': 'support',
  'myaccount': 'myaccount'
};

class Router extends Backbone.Router {
  constructor() {
    super({ routes });
  }

  index() {
    new HomePage({ el: 'main' }).render();
  }

  lotteris() {
    new LotterisPage({ el: 'main' }).render();
  }

  results() {
    new ResultsPage({ el: 'main' }).render();
  }

  support() {
    new SupportPage({ el: 'main' }).render();
  }

  myaccount() {
    new MyAccountPage({ el: 'main' }).render();
  }
}

export default Router;
