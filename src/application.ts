import {AuthenticationComponent} from '@loopback/authentication';
import {JWTAuthenticationComponent, SECURITY_SCHEME_SPEC, TokenServiceBindings, UserServiceBindings} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {AuthorizationComponent, CasbinAuthenticationComponent} from './components/casbin-authorization';
import {UsersRepository} from './repositories';
import {MySequence} from './sequence';
import {JwtService, UserService} from './services';

export {ApplicationConfig};

const TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || 'abcdef'
const TOKEN_EXPIRES_IN = process.env.JWT_TOKEN_EXPIRES_IN || '6000'

export class ImsApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);
    this.addSecuritySpec();
    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);
    this.component(JWTAuthenticationComponent);
    this.bind(UserServiceBindings.USER_REPOSITORY).toClass(UsersRepository)
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(TOKEN_SECRET)
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TOKEN_EXPIRES_IN)
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JwtService)
    this.component(CasbinAuthenticationComponent);
    this.bind(UserServiceBindings.USER_SERVICE).toClass(UserService)
    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  addSecuritySpec(): void {
    this.api({
      openapi: '3.0.0',
      info: {
        title: 'ImsApi',
        version: require('.././package.json').version,
      },
      paths: {},
      components: {securitySchemes: SECURITY_SCHEME_SPEC},
      security: [
        {
          jwt: [],
        },
      ],
      servers: [{url: '/'}],
    });
  }
}
