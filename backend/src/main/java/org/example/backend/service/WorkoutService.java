package org.example.backend.service;

import org.example.backend.model.Workout;
import org.example.backend.repo.WorkoutRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepo workoutRepo;
    private final IdService idService;

    public WorkoutService(WorkoutRepo workoutRepo, IdService idService) {
        this.workoutRepo = workoutRepo;
        this.idService = idService;
    }

    public List<Workout> getAllWorkouts() {
        return workoutRepo.findAll();
    }
}
