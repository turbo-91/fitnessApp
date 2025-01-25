package org.example.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "workouts")
public record Workout(
        String id, // Maps to MongoDB's "_id"
        String name,
        List<Exercise> exercises,
        Integer timestamp
) {

    public Workout(String name, List<Exercise> exercises, Integer timestamp) {
        this(null, name, exercises, timestamp);
    }

    public Workout withId(String id) {
        return new Workout(id, name, exercises, timestamp);
    }
}