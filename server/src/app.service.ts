import { Injectable } from '@nestjs/common';
import { SftpClientService } from 'nest-sftp';



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
        remotePath: string,
        localPath: string,
        submitConfig: any,
    ): Promise<string | NodeJS.ReadableStream | Buffer> {
        await this.sftpClient.resetConnection(submitConfig);
        return await this.sftpClient.upload(remotePath, localPath);
    }

}
