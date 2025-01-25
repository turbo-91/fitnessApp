package org.example.backend.model;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public record Exercise(
        String uniqueIdentifier,
        String name,
        double kg,
        List<Integer> set,
        String notes
) {
}