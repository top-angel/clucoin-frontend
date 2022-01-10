FROM node:alpine
WORKDIR /app

RUN apk add libc6-compat git

COPY .yarn ./.yarn
COPY patches ./patches
COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install

COPY . .

ARG STAGING=0
ENV STAGING=$STAGING

RUN yarn build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

RUN npx next telemetry disable

CMD ["node_modules/.bin/next", "start"]
