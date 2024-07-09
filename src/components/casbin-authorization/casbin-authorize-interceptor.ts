import {
  //getAuthorizationMetadata,
  AuthorizationBindings,
  AuthorizationDecision,
  AuthorizationOptions,
} from '@loopback/authorization';
import {
  Interceptor,
  InvocationContext,
  Next,
  NonVoid,
  Provider,
  asGlobalInterceptor,
  config,
  inject,
  injectable,
} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {SecurityBindings, UserProfile, securityId} from '@loopback/security';
import * as casbin from 'casbin';
import debugFactory from 'debug';
import {CASBIN_CONTROLLER_LIST, CASBIN_ENFORCER} from './casbin-component';

const debug = debugFactory('loopback:authorization:interceptor');

@injectable(asGlobalInterceptor('authorization'))
export class AuthorizationInterceptor implements Provider<Interceptor> {
  private options: AuthorizationOptions;

  constructor(
    @config({fromBinding: AuthorizationBindings.COMPONENT})
    options: AuthorizationOptions = {},
    @inject(CASBIN_CONTROLLER_LIST)
    private map: Record<string, string>,
    @inject(CASBIN_ENFORCER)
    private casbinEnforcer: casbin.Enforcer,
  ) {
    this.options = {
      defaultDecision: AuthorizationDecision.DENY,
      precedence: AuthorizationDecision.DENY,
      defaultStatusCodeForDeny: 403,
      ...options,
    };
    debug('Authorization options', this.options);
  }

  value(): Interceptor {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: Next,
  ): Promise<NonVoid> {
    //const description = debug.enabled ? invocationCtx.description : '';
    //let metadata = getAuthorizationMetadata(
    //invocationCtx.target,
    //invocationCtx.methodName,
    //);
    //console.log('intercept metadata', JSON.stringify(metadata))
    //if (!metadata) {
    //debug('No authorization metadata is found for %s', description);
    //}
    //metadata = metadata ?? this.options.defaultMetadata;
    //if (!metadata || metadata?.skip) {
    //debug('Authorization is skipped for %s', description);
    //const result = await next();
    //return result;
    //}
    //debug('Authorization metadata for %s', description, metadata);

    // retrieve it from authentication module
    const user = await invocationCtx.get<UserProfile>(SecurityBindings.USER, {
      optional: true,
    });

    let roles = user?.roles
    if (!roles) {
      if (!user?.[securityId]) {
        roles = ['guest']
      } else {
        roles = ['player']
      }
    }
    console.log('roles', JSON.stringify(user))

    const enforcer = this.casbinEnforcer
    const targetName = invocationCtx.targetName
    const names = targetName.match(/^(\w+)\./)
    if (!names) {
      throw new HttpErrors[403]('Access denied')
    }
    const resource = this.map[names[1]]
    const action = invocationCtx.methodName
    for (let role of roles) {
      const can = await enforcer.enforce(role, resource, action)
      if (can) return next()
    }

    console.log('====CHECK FAIL', JSON.stringify({roles, resource, action}))
    throw new HttpErrors[403]('Access denied')
  }
}
