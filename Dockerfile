
FROM node:18 as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM eclipse-temurin:17-jdk-jammy as backend-builder
WORKDIR /app/backend
# Copy Maven wrapper and POM
COPY backend/mvnw backend/.mvn ./
COPY backend/pom.xml ./
# Copy source code
COPY backend/src ./src
# Make the Maven wrapper executable
RUN chmod +x mvnw
# Build the backend application
RUN ./mvnw clean package -DskipTests

FROM nginx:alpine as frontend
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

FROM eclipse-temurin:17-jre-jammy as backend
WORKDIR /app
COPY --from=backend-builder /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
