FROM --platform=linux/amd64 openjdk:21
EXPOSE 8080
ADD backend/target/fitnessapp.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
