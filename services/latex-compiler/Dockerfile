FROM node:22-alpine

RUN apk add --no-cache tectonic

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY server.js ./

RUN addgroup --system --gid 1001 compiler && \
    adduser --system --uid 1001 compiler
USER compiler

EXPOSE 8080
ENV PORT=8080
CMD ["node", "server.js"]
