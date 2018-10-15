# APIs
(https://dzone.com/articles/be-the-best-api-you-can-be)
(https://medium.com/@rebeccahezhang/restful-api-interview-questions-d7e3eaa3d246)
(https://www.katalon.com/resources-center/blog/web-api-testing-interview-questions/)
(https://www.softwaretestinghelp.com/restful-web-services-interview-question/)


## Q: what's a URL vs resource vs collection?
## A:
* a Uniform Resource Locator is the path through which a resource can be located
* a resource is an object or representation of something, which has some associated data and maybe some methods that operate on it (student, and you can _delete_, _add_, and _update_ them)
* a collection is a set of resources, such as students
* URIs are combinations of some parts of the URL

---
## Q: what architectural styles/approaches/techniques are important for creating a REST API?
## A:
* use of http transport
* use of http verbs GET/PUT/POST/DELETE/PATCH
* xml or json as data format
* simple URI for services/resources
* stateless communication
  
---
## Q: the HTTP methods?
## A: (see below)
1. GET requests data, produces no other data manipulations
2. POST creates a resource; no modifications are to be performed
3. PUT updates the resource OR creates it if it doesn't exist; must be idempotent and can be executed several times with the same results
4. DELETE removes the resource
5. PATCH? (see if the candidate knows this one)

---
## Q: differences between POST vs PUT vs PATCH
## A: (see below)
POST is not idempotent and will create new resources
PUT is idempotent and creates/replaces a resource
PATCH is idempotent and updates parts of a resource 

---
## Q: three types of routing
## A:
(https://dzone.com/articles/the-three-http-routing-patterns-you-should-know)
1. host-based  
like old virtual servers, the web server (or other) looks at the host being accessed and routes accordingly (api.example.com vs web.example.com)
1. path-based  
increasingly common with scaling containers and ingress-controllers, requiring visibility into the URI portion of the HTTP request:
http://api.example.com/*v1/users/1*  
Everything you need to know is found in the URI
1. header-based  
An arbitrary HTTP header is used as the bsais for determining how to route a request. This may be a standard header, like _content-type_ or _cookie_, or a custom header such as _x-custom-header-for-my-app_. This is often used in maintaining secure sessions such as SSL/TLS.

---
## Q: how might you handle API versioning?
## A:
Design, from the start, a versioning portion of the URI, as in:
```
http://api.example.com/v1/users/123
```
Other approaches include:
1. adding a version number to the request's accepted mime types, such as `Accept: application/vnd.example-v1+json` or `Accept:application/vnd.example+json;version=1.0`. This won't work with HTML forms, however.
1. versioning with the custom request header, such as `Accept-version: v1`
1. version in the payload of the request; this implies there's always a payload, however

---
## Q: when would you change the version on an API?
## A:
A major version number change is required when breaking changes are introduced:
1. a change in the response data format for one or more calls
2. a change in a response type (integer to float, for example)
3. removing any part of the API
Non-breaking changes, such as adding new endpoints or new response parameters, don't require major version changes but *must* be tracked as minor version changes

---
## Q: Routes for typical CRUD operations
## A:
1. `/v1/tenants/<tenant_id>/users` - GET (Get all users for a particular tenant)
2. `/v1/tenants/<tenant_id>/users` - POST (Create a new user under a particular tenant)
3. `/v1/tenants/<tenant_id>/users/:id` - PUT/PATCH (Edit a user with a specific id)
4. `/v1/tenants/<tenant_id>/users/:id` - DELETE (Delete a user with a specific id)
5. `/v1/tenants/<tenant_id>/users/:id` - GET (Get a particular user)  
Information needed for the route in PUT and POST requests should be contained in the body. Not all actions can simply be done in one scope, such as a more verbose option like getting a users groups, as groups can be thought of as a sub action
1. `/v1/tenants/<tenant_id>/users/:id/groups` - GET (get all groups of a user)  
Query parameters should be leveraged for filtering the resource and should typically only be used in GET requests.
1. `/v1/tenants/<tenant_id>/users?lastUpdated=10-07-17&sort=username-desc` - GET (Get all users whose last update date was 10-07-17 and sort by username descending)
1. `/v1/tenants/<tenant_id>/users?banned=true` - PUT (update all banned users)  
1. `/v1/tenants/<tenant_id>/users/:id/banned` - PUT (update a user only if that user is banned)  
Since query params are principally used for filters,they should only be used in GET requests where the goal is to get a list or when updating records in bulk. When modifying records with conditions, the conditions should be obscured from the endpoint. If you need to modify a record only if the user is banned, it should be part of the url parameter for the route.

---
## Q: what is pagination in an API, and why would one need it?
## A:
Thinking of the examples above, the volume of data being returned may, in some cases, be enormous. Thus, it makes sense to be able to limit the amount of data returned via pagination, and putting the responsibility for 'paging' the data on the caller.

If pagination is supported, the API response should provide a set of headers that contain the paging information for the response:
* `x-pagination-page` - The current page being displayed.
* `x-pagination-pagesize` - The number of records on each page.
* `x-pagination-pagecount` - The total number of available pages.
* `x-pagination-recordcount` - The total number of records across all pages.
* `x-pagination-next` - The link to the next page (optional)
* `x-pagination-prev` - The link to the previous page (optional)
The URL should then support page and pagesize parameters:
```
/v1/records?page=5&pagesize=20
```

