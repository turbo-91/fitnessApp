package org.example.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "workouts")
public record Workout(
        String id,
        String name,
        List<Exercise> exercises,
        Cardio cardio,
        Integer timestamp
) {

    public Workout(String name, List<Exercise> exercises, Cardio cardio, Integer timestamp) {
        this(null, name, exercises, cardio, timestamp);
    }

    public Workout withId(String id) {
        return new Workout(id, name, exercises, cardio, timestamp);
    }

}
