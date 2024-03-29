# XBlog MERN Project

A full stack project made with the MERN stack with the modern(?) approach.
The concept is to create a web site that lets you create and manage multiple blogs at once.

# Deployed example

https://blog-real-project.up.railway.app/

# Todos

1. Fix the authentication to more secure sessions or jwt.
2. Make individual users profile page(like the dashboard but for all users).
3. Make users be able to comment and like on the posts.

# About this repo...

I tried a lot of stuff and experimented a lot with this repo's git, so don't take this repo too seriously. I will rather start a new one knowing best practices now then painfully fix it at this point.

# Starting in development mode

0. Install mongodb on your system. Make sure the command `mongod` works.

1. Install [concurrently](https://www.npmjs.com/package/concurrently) locally with `npm run install` in this project's root folder or skip this step to use your global installation if you already have it installed.

2. Make sure to install actual project dependencies.
   You can use **install-deps** script for that or go into _frontend/_ and _backend/_ and do it manually.

   `npm run install-deps`

3. By default frontend will run at port **5173** and backend at port **5000**. You can change the ports in _backend/.env_ (create the file if you need it) and _frontend/vite.config.ts_.

4. To make frontend be able to connect to the backend properly, change the base url for the backend api in the _frontend/features/api/apiSlice.ts_

5. You can then start both the frontend and backend at the same time with
   `npm run dev` in this project's root folder.
