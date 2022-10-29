FROM node:14

# NX
RUN yarn global add nx

# application must be mirrored in the container
WORKDIR /app

# allow outside access to the application
EXPOSE 4200