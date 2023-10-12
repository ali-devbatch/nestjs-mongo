
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