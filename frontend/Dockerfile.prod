# FROM node:18-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .

# # RUN npm install -g node-gyp 
# # RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install 
# # ENV PATH /opt/node_modules/.bin: $PATH

# #  WORKDIR /opt/app 

# EXPOSE 3000 
# CMD [ "npm" , "run" , "dev" ]

FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with a production-ready image
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./
# COPY .env ./

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD ["npm", "start"]