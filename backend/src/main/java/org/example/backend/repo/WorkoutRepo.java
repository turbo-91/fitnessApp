package org.example.backend.repo;

import org.example.backend.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutRepo extends MongoRepository<Workout, String> {
}
