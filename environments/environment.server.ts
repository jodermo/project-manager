import { RequestMethod } from '@nestjs/common';

export const environment = {
    allowDomains: [
        'localhost',
        'localhost:4200',
        'localhost:4300',
        'localhost:4400',
        'localhost:4500',
        '192.168.0.194',
        '192.168.0.194:4200',
        '192.168.0.194:4300',
        '192.168.0.194:4400',
        '192.168.0.194:4500',
        'witali-ruff.de',
        'm-project-manager.witali-ruff.de',
        'project-manager-admin.witali-ruff.de',
        'project-manager.witali-ruff.de',
        'project-manager-api.witali-ruff.de',
        'ProjectManager-113938361.eu-central-1.elb.amazonaws.com'
    ],
    adminEmails: 'moritz@petzka.com, admin-test@petzka.com',
    logEmails: 'moritz@petzka.com, log-test@petzka.com',
    errorEmails: 'moritz@petzka.com, error-test@petzka.com',
    ports: [],
    protocols: ['http', 'https'],
    openRoutes: (
        // @ts-ignore
        { path: 'auth', method: RequestMethod.GET },
        { path: 'auth', method: RequestMethod.POST }
    )
};
