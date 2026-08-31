FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache ca-certificates \
  && update-ca-certificates

# Use Alpine's CA bundle in addition to Node.js's built-in certificates.
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

CMD ["npm", "start"]
