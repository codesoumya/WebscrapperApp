FROM eclipse-temurin:20-jdk-alpine
COPY target/app.jar app.jar
ENV API_ENDPOINT=${API_ENDPOINT}
ENTRYPOINT ["java", "-jar", "app.jar"]
