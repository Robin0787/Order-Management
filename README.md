# Welcome to Order Management Server.

### Here are the steps to run the application in your local environment.

1 . Clone the repository.

2 . Run the command to install all the dependencies `npm install`

3 . Go to the `.env` file and write your `database url`.

4 . Now, write this command to build the application for running `tsc`

5 . Then run this command to run the application `npm run start:prod`

### Now go the this address of your browser `localhost://6060` to see the output.

## API Requests

1 . Get - `localhost://6060/api/users` = to get all the users information.

2 . Post - `http://localhost:6060/api/users` - to create a new user. Include user information to the request body as below.

```
- `userId` (number): A unique identifier for the user.
- `username` (string): Denotes the user's unique username, ensuring uniqueness across the system.
- `password` (string): Represents the user's password. The password is securely stored in hashed form, utilizing the bcrypt algorithm for hashing.
- `fullName` (object): An object containing the first and last name of the user.
  - `firstName` (string): The first name of the user.
  - `lastName` (string): The last name of the user.
- `age` (number): The age of the user.
- `email` (string): The email address of the user.
- `isActive` (boolean): A flag indicating whether the user is active or not.
- `hobbies` (array of strings): An array containing the hobbies of the user.
- `address` (object): An object containing the street, city, and country of the user's address.
  - `street` (string): The street of the user's address.
  - `city` (string): The city of the user's address.
  - `country` (string): The country of the user's address.
```

3 . Get - `http://localhost:6060/api/users/userId ` = Replace userId with users userId to get the user from database.

4 . Delete - `http://localhost:6060/api/users/userId ` = Replace userId with users userId to delete the user from database.

5 . Put - `http://localhost:6060/api/users/userId` = Replace userId with users userId to update the users information. Include updated data in the request body as like below.

```
- `userId` (number): A unique identifier for the user.
- `username` (string): Denotes the user's unique username, ensuring uniqueness across the system.
- `password` (string): Represents the user's password. The password is securely stored in hashed form, utilizing the bcrypt algorithm for hashing.
- `fullName` (object): An object containing the first and last name of the user.
  - `firstName` (string): The first name of the user.
  - `lastName` (string): The last name of the user.
- `age` (number): The age of the user.
- `email` (string): The email address of the user.
- `isActive` (boolean): A flag indicating whether the user is active or not.
- `hobbies` (array of strings): An array containing the hobbies of the user.
- `address` (object): An object containing the street, city, and country of the user's address.
  - `street` (string): The street of the user's address.
  - `city` (string): The city of the user's address.
  - `country` (string): The country of the user's address.
```

6 . Put - `http://localhost:6060/api/users/userId/orders` = Replace userId with users userId to add order items to the user. Include ordered items information in the request body as like below.

```
"productName": "string",
"price": "number",
"quantity": "number"
```

7 . Get - `http://localhost:6060/api/users/userId/orders` = Replace userId with users userId to get the ordered items of the user.

8 . Get `http://localhost:6060/api/users/userId/orders/total-price ` = Replace userId with users userId to get the total price of the ordered items of the user.
