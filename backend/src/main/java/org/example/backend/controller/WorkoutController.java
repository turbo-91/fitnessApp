package org.example.backend.controller;

import org.example.backend.model.Workout;
import org.example.backend.service.WorkoutService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService)
    {
        this.workoutService = workoutService;
    }

    @GetMapping
    public List<Workout> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    @GetMapping("/{id}")
    public Workout getWorkoutById(@PathVariable String id) {
        try {
            return workoutService.getWorkoutById(id);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    Workout createWorkout(@RequestBody Workout workout)
    {
        return workoutService.saveWorkout(workout);
    }

    @PutMapping(path = {"{id}/update", "{id}"})
    Workout updateWorkout(@PathVariable String id, @RequestBody Workout workout) {
        if (!workout.id().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The id in the url does not match the request body's id");
        }
        return workoutService.updateWorkout(workout);
    }

    @DeleteMapping("/{id}")
    void deleteWorkout(@PathVariable String id) {
        System.out.println("Delete request received for ID: " + id);
        try {
            workoutService.deleteWorkout(id);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

}


