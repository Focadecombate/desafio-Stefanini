FROM node:14.16.1-alpine3.13 as default

FROM default as deps
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY --chown=node:node tsconfig* ./
RUN npm config set cache /home/node/app/.npm-cache --global
RUN npm i -g serverless typescript
RUN npm i
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node src ./src
COPY --chown=node:node .env ./
RUN npm run generate
RUN tsc --build

FROM default as dev
ARG command=start:noBuild
ENV run_command ${command}
USER node
WORKDIR /home/node/app
EXPOSE 3000
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./serverless.yml ./
COPY --from=deps --chown=node:node /home/node/app/dist ./dist
COPY --from=deps --chown=node:node /home/node/app/node_modules ./node_modules
CMD npm run ${run_command}

FROM default as release
USER node
WORKDIR /home/node/app
COPY --chown=node:node tsconfig* ./
COPY --from=deps --chown=node:node /home/node/app/node_modules ./node_modules
COPY --from=deps --chown=node:node /home/node/app/dist ./dist
CMD ["serverless","deploy"]

