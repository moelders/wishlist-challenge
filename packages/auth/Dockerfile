FROM node:12-alpine AS build

WORKDIR /usr/src/build

COPY . /usr/src/build

RUN npm ci \
 && npm prune --production

FROM node:12-alpine

EXPOSE 3000

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=build /usr/src/build/.env /usr/src/app/.env
COPY --from=build /usr/src/build/package.json /usr/src/app/package.json
COPY --from=build /usr/src/build/src /usr/src/app/src
COPY --from=build /usr/src/build/node_modules /usr/src/app/node_modules

CMD npm run start
