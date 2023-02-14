/**
 *    TATOR - Nest App
 *    © 2020
 *    Author: Moritz Petzka
 *    Website: https://petzka.com
 *    Email: info@petzka.com
 */

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AppMiddleware implements NestMiddleware {
    // tslint:disable-next-line:ban-types
    use(req: Request, res: Response, next: Function) {
        next();
    }
}
