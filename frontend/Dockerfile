# Stage 1 - build
FROM node:18-alpine AS build

WORKDIR /app

COPY frontend/package*.json ./
# npm ci if --> have package-lock.json for reproducible builds
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi

COPY frontend/ ./
# allow injecting API base at build time (prefix REACT_APP_)
ARG REACT_APP_API
ENV REACT_APP_API=$REACT_APP_API

RUN npm run build

# Stage 2 - serve with nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
