FROM node:14
WORKDIR /app
COPY src/index.ts src/index.ts
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
RUN npm install
CMD ["npm", "run", "dev"]
