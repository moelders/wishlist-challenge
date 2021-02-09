FROM hayd/alpine-deno:1.4.6

EXPOSE 8000

WORKDIR /app

COPY ./.env .
COPY ./src ./src

ADD . .

RUN deno cache src/main.ts

CMD [ "deno", "run", "--allow-net", "--allow-env", "--allow-read", "src/main.ts" ]
