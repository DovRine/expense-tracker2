FROM node:18 AS build
RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init \
    libpq-dev \
    postgresql-13
RUN npm install -g node-gyp

WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm ci --only=production
RUN npm run build

FROM node:18.15.0-bullseye-slim
ARG NODE_ENV
ARG BACKEND_HOST
ARG PORT
ARG DB_PASSWORD
ARG DB_USER
ARG DB_HOST
ARG DB_NAME
ARG DB_PORT

ENV NODE_ENV ${NODE_ENV}
ENV HOST ${HOST}
ENV PORT ${PORT}
# NOTE: must be named DB_PASSWORD for the docker image
ENV DB_PASSWORD ${DB_PASSWORD}
ENV DB_PORT ${DB_PORT}
ENV DB_USER ${DB_USER}
ENV DB_HOST ${DB_HOST}
ENV DB_NAME ${DB_NAME}
ENV NEXT_PUBLIC_BACKEND_HOST ${BACKEND_HOST}
ENV NEXT_PUBLIC_PORT ${PORT}

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /usr/src/app
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/sr/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/.next /usr/src/app/.next
COPY --chown=node:node . /usr/src/app
USER node
