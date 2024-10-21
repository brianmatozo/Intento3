# Client Management System

A simple client management system built with Next.js, MongoDB, and React Hook Form

## How to use

1. Clone the repository
2. Install the dependencies with `npm install` or `yarn install`
3. Create a new file called `.env.local` and add the following variables:
	* `MONGODB_URI`: the URI of your MongoDB instance
	* `NEXTAUTH_SECRET`: a secret key for next-auth
4. Run the development server with `npm run dev` or `yarn dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Technologies used

This example uses the following technologies:

* Next.js as the React framework
* next-auth for authentication
* Mongoose as the database adapter
* MongoDB as the database
* TypeScript as the programming language 
* Zod for form validations
* Chakra UI as the component library

## What is this example showing?

This example is showing how to use next-auth with mongoose as the database adapter to store users and sessions. It also shows how to use the built-in `Credentials` provider to allow users to sign in with their email and password.

The example also includes a simple protected page at `/protected` that only allows authenticated users to access it.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
