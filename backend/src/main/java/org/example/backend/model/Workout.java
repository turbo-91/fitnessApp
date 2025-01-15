package org.example.backend.model;

import java.util.List;

public record Workout(
        String id,
        String name,
        List<Exercise> exercises
) {
}
