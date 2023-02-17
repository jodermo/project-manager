import {Injectable} from '@nestjs/common';
import {SftpClientService} from 'nest-sftp';
import {configService} from "./config/config.service";


@Injectable()
export class AppService {

    constructor(private readonly sftpClient: SftpClientService) {
    }

    async download(
        remotePath: string,
        localPath: string,
    ): Promise<string | NodeJS.WritableStream | Buffer> {
        return await this.sftpClient.download(remotePath, localPath);
    }

    // change connection to a different user/password prior to upload
    async submit(
        remotePath: string | Buffer | NodeJS.ReadableStream,
        localPath: string,
        submitConfig: any,
    ) {
        await this.sftpClient.resetConnection(submitConfig);
        await this.sftpClient.upload(remotePath, localPath);
        // await this.sftpClient.disconnect();
        return 'success';
    }

}
