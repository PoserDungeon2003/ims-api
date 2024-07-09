import {
  Application,
  Binding,
  Component,
  CoreBindings,
  BindingKey,
  CoreTags,
  inject,
} from '@loopback/core';
import path from 'path'
import * as casbin from 'casbin'

export const CASBIN_CONTROLLER_LIST = BindingKey.create<Record<string, string>>(
  'casbin.Controllers',
);

export const CASBIN_ENFORCER = BindingKey.create<casbin.Enforcer>(
  'casbin.Enforcer',
);

export class CasbinAuthenticationComponent implements Component {
  bindings: Binding[] = [
  ];

  getControllers() {
    const map: Record<string, string> = {}
    const controllers = this.app.findByTag(CoreTags.CONTROLLER)
    if (controllers.length > 0) {
      controllers.forEach(controller => {
        const name = controller.key.replace('controllers.', '')
        map[name] = name.replace('Controller', 's').toLowerCase()
      });
      console.log('get map', JSON.stringify(map))
      this.app.bind(CASBIN_CONTROLLER_LIST).to(map)
    } else {
      setTimeout(() => this.getControllers(), 200)
    }
  }

  async getEnforcer() {
    const conf = path.resolve(
      __dirname,
      './../../../fixtures/casbin/rbac_model.conf',
    );
    const policy = path.resolve(__dirname, './../../../fixtures/casbin/rbac_policy.csv');
    const casbinEnforcer = await casbin.newEnforcer(conf, policy)
    this.app.bind(CASBIN_ENFORCER).to(casbinEnforcer)
  }
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {
    this.getControllers()
    this.getEnforcer()
  }
}

