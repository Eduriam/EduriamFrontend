# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Copy yarn configuration (if it exists)
COPY .yarnrc.yml* .yarnrc* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .
