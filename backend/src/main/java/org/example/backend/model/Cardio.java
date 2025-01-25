package org.example.backend.model;

public record Cardio(
        String id,
        String name,
        String parameters,
        Integer duration,
        String notes
) {
}
