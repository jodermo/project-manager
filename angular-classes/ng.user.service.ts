import {NgApiService} from './ng.api.service';
import {NgUserEntity} from './angular-entities/ng.user.entity';
import {NgCompanyEntity} from "./angular-entities/ng.company.entity";
import {NgAddressEntity} from "./angular-entities/ng.address.entity";

export class NgUserAuthError {
    code = 505;
    status = 'Server Error';
    message = 'Something went wrong';

    constructor(responseData: any) {
        if (responseData.status) {
            this.code = responseData.status;
        }
        if (responseData.statusText) {
            this.status = responseData.statusText;
        }
        if (responseData.message) {
            this.message = responseData.message;
        }
        if (responseData.error) {
            if (responseData.error.message) {
                this.message = responseData.error.message;
            }
        }
    }
}

export class NgUserService extends NgApiService {

    user?: NgUserEntity;
    /*
    userCredentials = {
        username: this.user?.username,
        password: this.user?.password,
        email: this.user?.email
    };

     */

    userCredentials = {
        username: ('TestUser' as string | undefined),
        password: ('Test1234' as string | undefined),
        email: this.user?.email
    };

    passwordConfirm?: string;
    loginError?: NgUserAuthError;
    registrationError?: NgUserAuthError;
    successfulRegistered?: string;
    successfulActivated?: string;
    activationError?: NgUserAuthError;

    constructor(httpClient: any, formBuilder: any, headers: any, staticData: any = undefined, private router: any, private route: any) {
        super(httpClient, formBuilder, headers, staticData);
    }

    initUser() {
        this.checkUserActivation();
        this.loadCredentials();
        console.log('initUser', this.apiURL);
    }

    register(user: any) {
        const onSuccess = (user: any) => {
            if (user) {
                this.saveCredentials();
                this.userCredentials.password = '';
                this.passwordConfirm = '';
            }
            this.registrationError = undefined;
            this.successfulRegistered = user.email;
            this.loaded();
        };
        const onError = (error: any) => {
            if (error) {
                this.registrationError = new NgUserAuthError(error);
            }
            this.loaded();
        };

        this.registrationError = undefined;
        this.load();
        this.post('auth/register/', user, (user: any) => {
            onSuccess(user);
        }, (error: any) => {
            onError(error);
        });
    }

    login(onLogin?: (user?: NgUserEntity) => void) {
        this.loginError = undefined;
        const onSuccess = (user: any) => {
            if (user) {
                this.saveCredentials();
                this.userCredentials.password = '';
                this.passwordConfirm = '';
                user = new NgUserEntity(this).setData(user);
                this.setUser(user);
                if (onLogin) {
                    onLogin(this.user);
                }
            }
            this.loginError = undefined;
            this.loaded();
        };
        const onError = (error: any) => {
            console.log('login error', error);
            if (error) {
                this.loginError = new NgUserAuthError(error);
            }
            this.initUserCredentials();
            this.loaded();
        };
        console.log('login', this.userCredentials);
        if (this.userCredentials.username && this.userCredentials.password) {
            this.load();
            console.log('do login', this.userCredentials);
            if (this.environment.staticTestData) {
                let user: any = this.staticData.users ? this.staticData.users.find((user: any) => {
                    return user.username === this.userCredentials.username && user.password === this.userCredentials.password;
                }) : [];
                onSuccess(user);
            } else {
                console.log('auth', this.userCredentials);
                this.post('auth/login/', this.userCredentials, (authResult: any) => {
                    console.log('authResult', authResult);
                    if (authResult.token) {
                        if (authResult.user) {

                            onSuccess(authResult.user);
                        } else {
                            onError({
                                message: 'no_response_user'
                            });
                        }
                    } else {
                        onError({
                            message: 'no_response_token'
                        });
                    }
                    this.token = authResult.token || undefined;
                    this.get('user')
                }, (error: any) => {
                    console.log('auth error', error);
                    onError(error);
                });
            }

        }
    }

    replaceAll(originalString: string, find: string, replace: string) {
        if (originalString) {
            return originalString.replace(new RegExp(find, 'g'), replace);
        }
        return originalString;
    }

    checkUserActivation() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const fullToken = urlParams.get('auth');
        if (fullToken) {
            const tokenParts = fullToken.split('::');
            const userName = tokenParts[0] || null;
            let token = tokenParts[1] || null;
            if (token) {
                token = this.replaceAll(token, '~.~', '/');
                if (userName && token) {
                    this.activateUser(userName, token, (result: any) => {
                        this.userCredentials.username = userName;
                        this.successfulActivated = userName;
                        // @ts-ignore
                        window.history.replaceState(null, null, window.location.pathname);
                    }, (error: any) => {
                        if (error) {
                            this.activationError = new NgUserAuthError(error);
                        }
                    });
                }
            }
        }
    }

    activateUser(userName: string, token: string, onSuccess: any = null, onError: any = null) {
        this.post('auth/activate/', {username: userName, token}, (result: any) => {
            if (onSuccess) {
                onSuccess(result);
            }
        }, (error: any) => {
            if (onError) {
                onError(error);
            }
        });
    }

    initUserCredentials() {
        this.userCredentials.username = undefined;
        this.userCredentials.email = undefined;
        this.userCredentials.password = undefined;
        localStorage.removeItem('user-credentials');
        this.setUser(undefined);
    }

    logout() {
        this.load();
        this.initUserCredentials();
        location.reload();
    }


    loadCredentials() {
        const savedCredentials = localStorage.getItem('user-credentials');
        console.log('loadCredentials', this);
        if (savedCredentials) {
            this.userCredentials = JSON.parse(savedCredentials);
            console.log('savedCredentials', this.userCredentials);
            this.login();
        }
    }

    private saveCredentials() {
        localStorage.setItem('user-credentials', JSON.stringify(this.userCredentials));
    }

    setUser(user?: NgUserEntity) {
        this.user = user;
    }


}
