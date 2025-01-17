package org.example.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "workouts")
public record WorkoutDTO(
        String name,
        List<Exercise> exercises,
        Integer timestamp
) {
}

