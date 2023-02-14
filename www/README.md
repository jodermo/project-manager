# Angular, Nest.js, Ionic - GeoLocation Game

##### *© 2022 - Moritz Petzka - [petzka.com](https://petzka.com/)*

### TypeScript based Server, Backend, Frontend and Mobile App

incl.  PostgreSQL and JSON test database

<br><br>

## Preconfiguration

##### 1. Install Git

- Download for Windows: [gitforwindows.org](https://gitforwindows.org)
- Install on macOS: [git-scm.com/download/mac](https://git-scm.com/download/mac) or [www.atlassian.com/de/git/tutorials/install-git](https://www.atlassian.com/de/git/tutorials/install-git)


##### 2. Install Node.js

- Download: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)


##### 3. Install Angular CLI and npm-run-all

- Run: `npm install -g @angular/cli`
- Run: `npm install -g npm-run-all`

##### 4. Install Docker

- Get Docker: [docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)


##### 5. Clone Repository

```
git clone git@github.com:jodermo/project-manager.git
```

<br>
<br>

## Deployment

- `npm install`
    - Install dependencies and build apps
- `npm start`
    - Serve all Angular apps, incl. Ionic mobile app 
- `npm run docker:install`
    - Install Docker image
- `npm run docker:start`
    - Start Docker image
- `npm run docker:restart`
    - Build apps and restart Docker image
- `npm run build` 
    - Build HTML to [/www/](/www/)
- `npm run build:docker` 
    - Build HTML for Docker image

<br>

#### Other scripts

##### Angular

- `ng serve`
    - *Serve **all** apps` npm run ng:serve`*
    - *Serve **administration** only `npm run ng:serve:admin`*
    - *Serve **frontend** only `npm run ng:serve:frontend`*

- `ng build`
    - *Build **all** apps `npm run build` or `npm run ng:build`*
    - *Build **administration** only `npm run ng:build:admin`*
    - *Build **frontend** only `npm run ng:build:frontend`*
    - *Build Docker **administration** only `npm run ng:build:docker:admin`*
    - *Build Docker **frontend** only `npm run ng:build:docker:frontend`*

##### Ionic

- *Serve Ionic mobile app only `npm run ionic:serve`*

<br>
<br>

## App Structure

#### URL Endpoints

- [localhost](http://localhost/): Angular Frontend 
- [localhost/backend/](http://localhost/backend/): Angular Backend 
- [localhost/api/](http://localhost/api/): API
- [localhost:4200](http://localhost:4200/): Deploy Angular Frontend (`ng serve`)
- [localhost:4300](http://localhost:4300/): Deploy Angular Backend (`ng serve`)
- [localhost:4400](http://localhost:4400/): Deploy Ionic Mobile App (`ionic start`)
- [localhost:8080](http://localhost:8080/): JSON-Server / Test Data
- [localhost:8282](http://localhost:8282/): JSON-Server / Test Data / Serve Mode
- [localhost:5432](http://localhost:5432/): PostgreSQL Database

<br>

#### Administration Login

Username: `Test`

Password: `Test1234`

<br>


#### JSON-Server - Test Data

[/json-server/data.json](json-server/data.json): JSON Data

<br>

#### THEME Configuration Files

##### Assets and Documents

- [/theme/assets/](./theme/assets/) ***Asset** Directory* 

- [/theme/www/](./theme/www/) *Files for **plublic_html** / root directory*


##### SASS / SCSS

- [/theme/scss/](./theme/scss/) *Directory for **SCSS config** files*
    - [_animations.scss](./theme/scss/_animations.scss) *CSS **animations***
    - [_app.scss](./theme/scss/_app.scss) ***Ionic app** styles*
    - [_imports.scss](./theme/scss/_imports.scss) ***Import file** for all theme variables*
    - [_mat_theme.scss](./theme/scss/_mat_theme.scss) *Configuration file for **Angular Material***
    - [_styles.scss](./theme/scss/_styles.scss) ***Theme - SCSS styles***


- [/theme/colors.scss](./theme/colors.scss) *SCSS **color** variables*

- [/theme/fonts.scss](./theme/fonts.scss) *SCSS **text / font** variables*

- [/theme/sizes.scss](./theme/sizes.scss)  *SCSS **scaling and sizes** variables*

- [/theme/styles.scss](./theme/styles.scss) *Style **imports and declarations***


##### Templates Variables

- [/templates/](./templates/) ***Template** directory*
    - [/templates/app-conditions.ts](./templates/app-conditions.ts) *App **conditions** (AGB)*
    - [/templates/app-privacy-protection.ts](./templates/app-privacy-protection.ts) *App **privacy protection** (Datenschutz)*


<br>


## Environments

*Environment directory: [/environments/](environments/)*

<br>

#### Docker (local deployment)

- *Angular Environment* : [/environments/environment.docker.ts](environments/environment.docker.ts)

<br>

#### Development *"dev"*

Docker Compose File: *[docker-compose.yml](docker-compose.yml)*
- *.env* : [/environments/dev.env](environments/dev.env) 
- *Angular Environment* : [/environments/environment.dev.ts](environments/environment.dev.ts)

<br>

#### Production *"prod"*

- *.env* : [/environments/dev.env](environments/dev.env) 
- *Angular Environment* : [/environments/environment.dev.ts](environments/environment.dev.ts)

<br>

#### Amazon Web Service (AWS)

- *Amazon Elastic Container Service - Configuration*: [/environments/ecs.env](environments/ecs.env) 

<br>
<br>

## Technologies

#### Angular | [administration](administration) and [frontend](./frontend)

- Website: [angular.io](https://angular.io/)
- Docs: [angular.io/docs](https://angular.io/docs)
- Angular Material: [material.angular.io](https://material.angular.io/)
- Angular Material Components: [material.angular.io/components](https://https://material.angular.io/components/categories/)

<br>

#### Nest.js | [server](server)

- Website: [nestjs.com](https://nestjs.com/)

<br>

#### json-server | [json-server](./json-server)

- npm package: [www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)

<br>

#### Ionic  *(+ Angular)* | [mobile-app](./mobile-app)

- Website: [ionicframework.com](https://ionicframework.com/)
- Docs: [ionicframework.com/docs/](https://ionicframework.com/docs/)
- UI Components:  [ionicframework.com/docs/components](https://ionicframework.com/docs/components)

<br>
<br>
