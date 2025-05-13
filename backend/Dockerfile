
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copy maven executable
COPY mvnw .
COPY .mvn .mvn

# Copy pom.xml
COPY pom.xml .

# Copy source code
COPY src ./src

# Package the application
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copy built jar from the build stage
COPY --from=0 /app/target/*.jar app.jar

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=prod

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
