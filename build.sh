 
npm run build:ssg-client -- --mode $1

cp dist/public/.vite/manifest.json  dist/client-manifest.json 

npm run build:ssg-server -- --mode $1

npx cross-env NODE_ENV=production node dist/server.js
