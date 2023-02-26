FROM node:16.18 as build

WORKDIR /frontend-react-js
COPY package.json .
RUN npm install

ENV PORT=3000
COPY . .
EXPOSE ${PORT}
RUN npm run build

FROM nginx 
COPY --from=build /frontend-react-js/build /usr/share/nginx/html