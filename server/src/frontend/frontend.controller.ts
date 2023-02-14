import { Controller, Get, Param, Res, Logger } from '@nestjs/common';
import { configService } from '../config/config.service';

@Controller(configService.getFrontendRoute())
export class FrontendController {

    private logger = new Logger('Frontend');

    @Get()
    async serveIndex(@Param() params: any, @Res() res): Promise<any> {
        this.logger.log('serveIndex: ' + configService.getFrontendHTML());
        res.sendFile('index.html', {root: './' + configService.getFrontendHTML()});
    }

    @Get(':fileName')
    async serveFile(@Param('fileName') fileName, @Res() res): Promise<any> {
        this.logger.log('serveFile: ' + fileName + ' / ' + configService.getFrontendHTML());
        res.sendFile(fileName, {root: './' + configService.getFrontendHTML()});
    }

    @Get('assets/:route/:fileName')
    async serveAssets(@Param('route') route, @Param('fileName') fileName, @Res() res): Promise<any> {
        const filePath = configService.getFrontendHTML() + '/assets/' + route;
        this.logger.log('serveAssets: ' + fileName + ' / ' + filePath);
        res.sendFile(fileName, {root: './' + filePath});
    }


}
