package org.example.backend.service;

import org.example.backend.model.Exercise;
import org.example.backend.model.Workout;
import org.example.backend.repo.WorkoutRepo;
import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class WorkoutServiceTest {

private final WorkoutRepo workoutRepo= mock(WorkoutRepo.class);
private final IdService idService= mock(IdService.class);

    @Test
    void getAllWorkouts_ShouldReturnListOfToDos_whenCalled() {
        //GIVEN
        Workout workout1 = new Workout(
                "workout1",
                "Full Body Strength",
                List.of(
                        new Exercise("exercise1", "Squat", 60, List.of(10, 8, 6), "Focus on depth and control."),
                        new Exercise("exercise2", "Bench Press", 40, List.of(10, 8, 6), "Ensure proper grip and avoid locking elbows."),
                        new Exercise("exercise3", "Deadlift", 80, List.of(8, 6, 4), "Maintain a straight back throughout the lift.")
                ),
                1705400659
        );

        Workout workout2 = new Workout(
                "workout2",
                "Upper Body Hypertrophy",
                List.of(
                        new Exercise("exercise4", "Pull-ups", 0, List.of(12, 10, 8), "Use a controlled motion and full range of motion."),
                        new Exercise("exercise5", "Incline Dumbbell Press", 20, List.of(12, 10, 8), "Adjust the incline for optimal chest engagement."),
                        new Exercise("exercise6", "Lateral Raises", 10, List.of(15, 12, 10), "Avoid swinging the weights and keep arms slightly bent.")
                ),
                1705400659
        );;

        WorkoutService workoutService = new WorkoutService(workoutRepo, idService);
        List<Workout> workoutList = List.of(workout1, workout2);

        when(workoutRepo.findAll()).thenReturn(workoutList); // Mock the repository to return the list

        List<Workout> expected = workoutList;

        //WHEN
        List<Workout> actual = workoutService.getAllWorkouts();

        //THEN
        assertEquals(expected, actual); // Verify the list matches
        verify(workoutRepo).findAll(); // Verify findAll was called once

}}