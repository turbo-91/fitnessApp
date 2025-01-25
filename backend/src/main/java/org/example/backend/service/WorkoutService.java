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
        try {
            List<Workout> workouts = workoutRepo.findAll();
            System.out.println("Service: Fetched all workouts: " + workouts);
            return workouts;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch workouts from the database.", e);
        }
    }
    public Workout getWorkoutById(String id) {
        return workoutRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workout with ID " + id + " not found."));
    }

    public Workout saveWorkout(Workout workout) {
        if (workout == null) {
            throw new IllegalArgumentException("Workout cannot be null.");
        }
        if (workout.name() == null || workout.name().isBlank()) {
            throw new IllegalArgumentException("Workout name cannot be null or blank.");
        }
        String newId = idService.generateId();
        Workout workoutToSave = workout.withId(newId);
        return workoutRepo.save(workoutToSave);
    }

    public Workout updateWorkout(Workout workout) {
        if (workoutRepo.existsById(workout.id())) {
            return workoutRepo.save(workout); // Save will update if the ID matches
        } else {
            throw new IllegalArgumentException("Workout with ID " + workout.id() + " does not exist.");
        }
    }

    public void deleteWorkout(String id) {
        if (!workoutRepo.existsById(id)) {
            throw new IllegalArgumentException("Workout with ID " + id + " does not exist.");
        }
        workoutRepo.deleteById(id);
    }

}
