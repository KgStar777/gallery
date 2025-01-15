# FROM node:18-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .

# EXPOSE 1337

# CMD [ "npm" , "run" , "develop" ]

FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .
EXPOSE 1337

CMD ["npm", "run", "start"]

# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./
# COPY .env ./

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 1337

# CMD ["npm", "start"]