FROM node:20-alpine

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add py3-pip
RUN apk add gcc musl-dev python3-dev libffi-dev openssl-dev cargo make
RUN pip install --upgrade --break-system-packages pip
RUN pip install --break-system-packages azure-cli

RUN az --version

WORKDIR /app

COPY ./dist/scripts/cjs/* /app/

RUN mkdir -p /app/azl
COPY ./dist/binary/azl-alpine /app/azl/azl
ENV PATH="/app/azl:${PATH}"

RUN azl --version

CMD ["node", "/app/cli.js", "run"]