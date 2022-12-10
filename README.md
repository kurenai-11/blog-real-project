# XBlog MERN Project

A blog project made with the MERN stack.

# Starting in development mode

1. Make sure to install dependencies.
   You can use **install-deps-npm.sh** for that or go into _frontend/_ and _backend/_ do it manually <br/>
   `./install-deps-npm.sh`

2. Install [concurrently](https://www.npmjs.com/package/concurrently) globally <br/>
   `npm install -g concurrently`

3. You can then start both the frontend and backend with <br/>
   `./run-dev-npm.sh`

By default frontend will run at port **5173** and backend at port **5000**. You can change the ports in _backend/.env_ (create the file if you need it) and (todo) _frontend/vite.config.ts_
