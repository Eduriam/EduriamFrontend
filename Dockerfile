# Use Node.js 18 LTS as base image (comes with Yarn pre-installed)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Copy yarn configuration (if it exists)
COPY .yarnrc.yml* ./
COPY .yarnrc* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Start the development server
CMD ["yarn", "dev"]
