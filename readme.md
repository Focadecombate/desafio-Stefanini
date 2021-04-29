# Serverless Challenge

## Run Locally

To run locally you need to:

~~~bash
docker-compose up
npm i
npm run generate
npm run sync
npm run start
~~~

## Live EndPoint

[Link](https://wfzas05qud.execute-api.us-east-1.amazonaws.com/dev)

## Routes

### Signup

Método: post
Endpoint: /api/signup
Auth: false

Request Body:

~~~typescript
interface SignUpRequestBody {
  name: string, 
 email: string,
 password: string,
 passwordConfirmation: string,
 age: number
}
~~~

Response:

~~~typescript
interface SignUpResponse {
  accessToken: string
}
~~~

### Login

Método: post
Endpoint: /api/login
Auth: false

Request Body:

~~~typescript
interface LoginRequestBody{
 email: string,
 password: string,
}
~~~

Response:

~~~typescript
interface LoginResponseBody{
  accessToken: string
}
~~~

### Edit

Método: put
Endpoint: /api/account
Auth: true

header authorization = accessToken

~~~typescript
interface EditAccountResponseBody {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirmation?: string;
  age?: number;
}
~~~

### Delete

Método: delete
Endpoint: /api/account
Auth: true

header authorization = accessToken

### Health

~~~typescript
{
  status:200,
}
~~~
