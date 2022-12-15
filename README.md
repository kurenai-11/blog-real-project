# XBlog MERN Project

A blog project made with the MERN stack with the modern approach.

# Starting in development mode

0. Install mongodb on your system. Make sure the command `mongod` works.

1. Install [concurrently](https://www.npmjs.com/package/concurrently) locally with `npm run install` in this project's root folder or skip this step to use your global installation if you already have it installed.

2. Make sure to install actual project dependencies.
   You can use **install-deps** script for that or go into _frontend/_ and _backend/_ and do it manually.

   `npm run install-deps`

3. You can then start both the frontend and backend at the same time with
   `npm run dev` in this project's root folder.

By default frontend will run at port **5173** and backend at port **5000**. You can change the ports in _backend/.env_ (create the file if you need it) and (todo) _frontend/vite.config.ts_
