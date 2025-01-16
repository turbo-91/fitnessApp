package org.example.backend.model;

import java.util.List;

public record Exercise(
        String id,
        String name,
        int kg,
        List<Integer> set,
        String notes
) {
}
