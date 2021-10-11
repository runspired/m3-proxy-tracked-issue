import Component from '@glimmer/component';
// import { tracked } from '@glimmer/tracking';
import { inject } from '@ember/service';

/*
class Model {
  @tracked name = 'John';
}
*/

class NonProxyApproachWorks {
  constructor(model) {
    this.model = model;
  }
  get name() {
    return this.model.name;
  }
}
class ProxyApproachDoesntWork {
  constructor(model) {
    return new Proxy(this, {
      get(t, key) {
        return Reflect.get(model, key);
      },
    });
  }
}

export default class WatComponent extends Component {
  @inject store;
  constructor() {
    super(...arguments);
    // let model = new Model();
    // this.nonWorkingValue = new ProxyApproachDoesntWork(model);
    // this.workingValue = new NonProxyApproachWorks(model);

    let m3Model = this.store.push({
      data: {
        type: 'user',
        id: '1',
        attributes: {
          name: 'john',
        },
      },
    });

    this.nonWorkingValue = new ProxyApproachDoesntWork(m3Model);
    this.workingValue = new NonProxyApproachWorks(m3Model);

    console.log('current name', m3Model.name);
    this.m3Model = m3Model;

    setTimeout(() => {
      m3Model.name = 'Chris';
      console.log('actual name is', m3Model.name);
      console.log(
        'we updated the non-working approach',
        this.nonWorkingValue.name
      );
      console.log('we updated the working approach', this.workingValue.name);
      // debugger;
    }, 3000);
  }
}
