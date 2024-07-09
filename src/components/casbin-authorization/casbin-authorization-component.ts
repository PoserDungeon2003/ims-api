import {
  Binding,
  Component,
  ContextTags,
  createBindingFromClass,
  injectable,
} from '@loopback/core';
import {AuthorizationInterceptor} from './casbin-authorize-interceptor';
import {AuthorizationBindings} from '@loopback/authorization';

@injectable({tags: {[ContextTags.KEY]: AuthorizationBindings.COMPONENT.key}})
export class AuthorizationComponent implements Component {
  bindings: Binding[] = [createBindingFromClass(AuthorizationInterceptor)];
}
