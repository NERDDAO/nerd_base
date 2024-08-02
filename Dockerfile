# # Image size ~ 400MB
FROM node:22-bullseye-slim as builder

# Enable Corepack and prepare for PNPM installation to increase performance
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the working directory
COPY package*.json pnpm-lock.yaml ./

# Install dependencies using PNPM
RUN pnpm install
COPY . .
RUN pnpm run build

# Create a new stage for deployment
FROM builder as deploy

# Copy only necessary files and directories for deployment
COPY --from=builder /app/src ./src 
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/data ./data 

RUN pnpm install
CMD ["pnpm", "start"]
