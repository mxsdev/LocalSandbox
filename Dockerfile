FROM node:20

WORKDIR /app

COPY ./dist/scripts/cjs/* /app/

CMD ["node", "/app/cli.js", "run"]