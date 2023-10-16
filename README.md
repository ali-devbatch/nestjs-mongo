### database module

- database module will be separate and import it in app module

### mongoose model

- all models will be in entities folder
- all the models will be imported in sharedModule

### shared module

- sharedModule will be imported it in app module
- it will get all schemas and names (both imported from entities or schemas folder )
- sharedModule will be provided in app module
- imports: [SharedModule] , this will be added in every module whose data is saving in database.

### validations

- validation should be in DTO
- apply validation pipes in controllers (users got method level validation , posts got whole controller validation)

### pagination

- pagination service should be provided in every module whose service will use the pagination (ex: providers:[PaginationService])
- pagination service should be given in constructor which service will use the pagination
- query params are optional , sorting will be ascending or descending order
- query params should be sent from controller to service which will send to pagination service
- request example [{{base_url}}/post?page=2&limit=14&sort=createdAt:desc]

### .env setup
 - my-config module for env configuration
 - import in app module root file
 - change the env file name in app module.
 - to use env variables inject this in constructor ( private configService: ConfigService,) and to get a single variable from env use (configService.get<string>('JWT_SECRET'))

### JWT-Authentication 
 - make complete module of auth
 - AuthModule will be in imports array of every module whose service is going to use authentication.
 - jwt-strategy file will be in auth folder (verify user).
 - jwt-strategy will be injected to providers of auth module.
 - auth service will get login and sign up.
 - @UseGuards(AuthGuard()) at any controller method for authentication.
 - 