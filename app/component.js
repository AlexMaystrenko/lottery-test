import LayoutManager from 'layoutmanager';
import $ from 'jquery';
import _ from 'underscore';

const components = {};

class ComponentError extends Error {
  constructor(message) {
    super({ message });

    this.message = message;
  }
}

class Component extends LayoutManager {
  constructor(instanceProperties, classProperties) {
    super(instanceProperties, classProperties);

    this.dataset = this.$el.data();
    this.listenTo(this, 'afterRender', function() {
      Component.activateAll(this);
    });
  }

  fetchTemplate(template) {
    return template;
  }

  renderTemplate(template, data) {
    return template.render(data);
  }

  serialize() {
    return this.dataset;
  }

  static register(identifier, ctor) {
    identifier = identifier || ctor.prototype.selector;

    if (!identifier) {
      throw new ComponentError('Invalid component selector');
    }

    if (components[identifier]) {
      throw new ComponentError('Component is already registered');
    }

    if (identifier.slice(0, 1).match(/[A-Za-z]/)) {
      document.createElement(identifier);
    }

    let instances = [];
    components[identifier] = { ctor, instances };

    return ctor;
  }

  static unregister(identifier) {
    delete components[identifier];
  }

  static activate($el, instances) {
    var Ctor = this;
    var attrs = _.reduce($el[0].attributes, (attrs, attr) => {
      var name = attr.name;

      if (attr.name.indexOf('data-') === 0) {
        name = attr.name.slice(5);
      }

      attrs[name] = attr.value;
      return attrs;
    }, {});

    attrs.el = $el;

    var component = new Ctor(attrs);
    if (typeof component.createdCallback === 'function') {
      component.createdCallback();
    }

    instances.push(component);
    component.render();
  }

  static activateAll(component) {
    var el = component ? component.el : document.body;

    _.each(components, function(current, selector) {
      $(el).find(selector).each(function() {
        Component.activate.call(current.ctor, $(this), current.instances);
      });
    });
  }
}

$(Component.activateAll);

export default Component;
