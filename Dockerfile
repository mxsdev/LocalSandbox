FROM node:20-alpine

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 py3-pip python3-dev musl-dev linux-headers build-base

RUN mkdir -p /app/azl/azure_local_cli
# COPY ./packages/azure-local-cli/azure_local_cli/* /app/azl/azure_local_cli/
# COPY ./packages/azure-local-cli/requirements.txt /app/azl/azure_local_cli/requirements.txt

# RUN pip3 install --break-system-packages -r /app/azl/azure_local_cli/requirements.txt

# COPY ./packages/azure-local-cli/pyproject.toml /app/azl/pyproject.toml
# COPY ./packages/azure-local-cli/README.md /app/azl/README.md

COPY ./dist/scripts/cjs/* /app/
COPY ./packages/azure-local-cli/dist/* /app/azl/

WORKDIR /app

RUN pip3 install --break-system-packages /app/azl/*.whl

RUN python -m azure_local_cli --version

RUN echo "#!/bin/sh" > /app/azl/azl
RUN echo "python -m azure_local_cli \$@" >> /app/azl/azl
RUN chmod +x /app/azl
ENV PATH="/app/azl:${PATH}"

RUN azl --version

CMD ["node", "/app/cli.js", "run"]