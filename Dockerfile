FROM mcr.microsoft.com/azure-cli

ARG TARGETARCH

WORKDIR /app

COPY ./dist/binary/localsandbox-linux-${TARGETARCH} /app/localsandbox

RUN /app/localsandbox --version

COPY ./packages/azure-local-cli/azure_local_cli/__main__.py /app/__main__.py

RUN mkdir -p /app/azl

RUN echo "#!/bin/bash" > /app/azl/azl
RUN echo "PYTHONPATH=/usr/lib64/az/lib/python3.9/site-packages python3 /app/__main__.py \$@" >> /app/azl/azl
RUN chmod +x /app/azl/azl
ENV PATH="/app/azl:${PATH}"

RUN azl --version

CMD ["/app/localsandbox", "run"]