# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Install Yarn 4.x
RUN corepack enable && corepack prepare yarn@4.9.3 --activate

# Disable NextJS telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Copy yarn configuration (if it exists)
COPY .yarnrc.yml* .yarnrc* ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .
