# Using a multi-stage build process
# Stage 1: Build
FROM node:18-slim AS builder
WORKDIR /app

# Ustaw zmienne środowiskowe na podstawie argumentów budowy
ARG DB_PATH
ARG ADMIN_PASSWORD
ENV DB_PATH=$DB_PATH
ENV ADMIN_PASSWORD=$ADMIN_PASSWORD

# Install packages needed to build node modules
RUN apt update -qq && \
    apt install -y python-is-python3 pkg-config build-essential

# Install node modules
COPY package.json package-lock.json ./
RUN npm ci --omit dev

# copy source across (excludes items filtered by .dockerignore)
COPY . .

RUN if [ ! -d data ]; then mkdir data; fi
RUN npm run build

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
