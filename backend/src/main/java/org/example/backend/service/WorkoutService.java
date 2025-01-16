package org.example.backend.service;

import org.example.backend.model.Workout;
import org.example.backend.repo.WorkoutRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepo workoutRepo;

    public WorkoutService(WorkoutRepo workoutRepo) {
        this.workoutRepo = workoutRepo;
    }

    public List<Workout> getAllWorkouts() {
        return workoutRepo.findAll();
    }

}
