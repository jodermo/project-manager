import passport from 'passport';
import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailService } from '../mail/mail.service';

@Module({
    imports: [UserModule],
    providers: [AuthService, JwtStrategy, MailService],
    controllers: [AuthController],
    exports: [MailService]
})
export class AuthModule implements NestModule {

    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(passport.authenticate('jwt', {session: false}))
            .forRoutes(...this.restrictedRoutes());
    }

    restrictedRoutes() {
        const routes = [];
        /*
                for (const apiTable of config.api.restricted) {
            routes.push({path: '/api/' + apiTable, method: RequestMethod.ALL});
        }
         */

        return routes;
    }
}
