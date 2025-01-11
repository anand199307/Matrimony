COMMANDS USED TO SETUP PROJECT

- npm init -y
- npm install -D typescript // to install typescript
- npm install -D ts-node // to initilaize node modules
- tsc —init // To generate tsconfig file

NPM INITIAL COMMANDS

- npm i winston express dotent mongoose joi bcrypt nodemon cors body-parser jsonwebtoken ua-parser-js geoip-lite twilio
- npm i -D @types/winston @types/express @types/dotenv @types/joi @types/cors @types/body-parser @types/jsonwebtoken @types/geoip-lite @types/ua-parser-js

TO SETUP NPM IN LOCAL

- rm -rf node_modules
- npm cache clean --force
- npm i

TO START THE PROJECT

- make build // build docker image
- make up // run the container
- make down // stop the container

TO RUN THE SEED FILE

- npx ts-node src/seed.ts

TO BUILD AND PUSH THE DOCKER IMAGE TO GCR

- docker build --platform=linux/amd64 -t royal-matrimoni-api . -- To Build The Image
- docker tag royal-matrimoni-api asia-south1-docker.pkg.dev/services-pprd/royal-matrimoni/royal-matrimoni-api - To Tag an Existing Image
- docker push asia-south1-docker.pkg.dev/services-pprd/royal-matrimoni/royal-matrimoni-api - To Push The Image to Artifact registery
