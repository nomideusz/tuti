# Using a multi-stage build process
# Stage 1: Build
FROM node:18-slim AS builder
WORKDIR /app

# Install packages needed to build node modules
RUN apt update -qq && \
    apt install -y python-is-python3 pkg-config build-essential

# Install node modules
COPY package.json package-lock.json ./
RUN npm ci --omit dev

# copy source across (excludes items filtered by .dockerignore)
COPY . .

RUN if [ ! -d data ]; then mkdir data; fi
RUN --mount=type=secret,id=DB_PATH \
    --mount=type=secret,id=ADMIN_PASSWORD \
    --mount=type=secret,id=ORIGIN \
    DB_PATH="$(cat /run/secrets/DB_PATH)" \
    ADMIN_PASSWORD="$(cat /run/secrets/ADMIN_PASSWORD)" \
    ORIGIN="$(cat /run/secrets/ORIGIN)" \
    npm run build

# Stage 2: Run
FROM node:18-slim AS runner
WORKDIR /app

RUN apt update -qq && \
    apt install -y sqlite3

# Copy from build stage
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app

ENV NODE_ENV production

EXPOSE 3000

# Start the server by default, this can be overwritten at runtime
CMD [ "node", "build" ]