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

private final WorkoutRepo repo= mock(WorkoutRepo.class);
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
                null,
                null,
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
                null,
                null,
                1705400659
        );;

        WorkoutService workoutService = new WorkoutService(repo, idService);
        List<Workout> workoutList = List.of(workout1, workout2);

        when(repo.findAll()).thenReturn(workoutList); // Mock the repository to return the list

        List<Workout> expected = workoutList;

        //WHEN
        List<Workout> actual = workoutService.getAllWorkouts();

        //THEN
        assertEquals(expected, actual); // Verify the list matches
        verify(repo).findAll(); // Verify findAll was called once
}

    @Test
    void getWorkoutById_ShouldReturnWorkout_whenIdExists() {
        // GIVEN
        String id = "workout1";
        Workout expectedWorkout = new Workout(
                id,
                "Full Body Strength",
                List.of(
                        new Exercise("exercise1", "Squat", 60, List.of(10, 8, 6), "Focus on depth and control."),
                        new Exercise("exercise2", "Bench Press", 40, List.of(10, 8, 6), "Ensure proper grip and avoid locking elbows."),
                        new Exercise("exercise3", "Deadlift", 80, List.of(8, 6, 4), "Maintain a straight back throughout the lift.")
                ),
                null,
                null,
                1705400659
        );

        when(repo.findById(id)).thenReturn(java.util.Optional.of(expectedWorkout)); // Mock repository to return the workout

        WorkoutService workoutService = new WorkoutService(repo, idService);

        // WHEN
        Workout actualWorkout = workoutService.getWorkoutById(id);

        // THEN
        assertEquals(expectedWorkout, actualWorkout); // Verify the returned workout matches the expected one
        verify(repo).findById(id); // Verify findById was called with the correct ID
    }

    @Test
    void getWorkoutById_ShouldThrowException_whenIdDoesNotExist() {
        // GIVEN
        String nonExistentId = "nonExistentId";

        when(repo.findById(nonExistentId)).thenReturn(java.util.Optional.empty()); // Mock repository to return empty

        WorkoutService workoutService = new WorkoutService(repo, idService);

        // WHEN & THEN
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            workoutService.getWorkoutById(nonExistentId);
        });

        assertEquals("Workout with ID " + nonExistentId + " not found.", exception.getMessage());
        verify(repo).findById(nonExistentId); // Verify findById was called with the correct ID
    }

    @Test
    void saveWorkout_shouldAddWorkout_whenCalledWithWorkout() {
        // GIVEN
        String generatedId = "newId123"; // Mocked ID
        Workout inputWorkout = new Workout(
                null, // ID is null because the service generates it
                "Full Body Strength",
                List.of(
                        new Exercise("exercise1", "Squat", 60, List.of(10, 8, 6), "Focus on depth and control."),
                        new Exercise("exercise2", "Bench Press", 40, List.of(10, 8, 6), "Ensure proper grip and avoid locking elbows."),
                        new Exercise("exercise3", "Deadlift", 80, List.of(8, 6, 4), "Maintain a straight back throughout the lift.")
                ),
                null,
                null,
                1705400659
        );
        Workout expectedWorkout = inputWorkout.withId(generatedId);

        when(idService.generateId()).thenReturn(generatedId);
        when(repo.save(expectedWorkout)).thenReturn(expectedWorkout);

        WorkoutService workoutService = new WorkoutService(repo, idService);

        // WHEN
        Workout actual = workoutService.saveWorkout(inputWorkout);

        // THEN
        assertEquals(expectedWorkout, actual);
        verify(idService).generateId();
        verify(repo).save(expectedWorkout);
    }

    @Test
    void updateWorkout_ShouldUpdateWorkout_whenIdExists() {
        // GIVEN
        String id = "workout1";
        Workout existingWorkout = new Workout(
                id,
                "Full Body Strength",
                List.of(
                        new Exercise("exercise1", "Squat", 60, List.of(10, 8, 6), "Focus on depth and control."),
                        new Exercise("exercise2", "Bench Press", 40, List.of(10, 8, 6), "Ensure proper grip and avoid locking elbows."),
                        new Exercise("exercise3", "Deadlift", 80, List.of(8, 6, 4), "Maintain a straight back throughout the lift.")
                ),
                null,
                "you got this",
                1705400659
        );

        Workout updatedWorkout = new Workout(
                id,
                "Full Body Updated",
                List.of(
                        new Exercise("exercise1", "Squat", 65, List.of(10, 8, 6), "Focus on depth and control."),
                        new Exercise("exercise2", "Bench Press", 45, List.of(10, 8, 6), "Ensure proper grip and avoid locking elbows.")
                ),
                null,
                "",
                1705400659
        );

        when(repo.existsById(id)).thenReturn(true); // Mock repository to indicate the workout exists
        when(repo.save(updatedWorkout)).thenReturn(updatedWorkout); // Mock save to return the updated workout

        WorkoutService workoutService = new WorkoutService(repo, idService);

        // WHEN
        Workout actual = workoutService.updateWorkout(updatedWorkout);

        // THEN
        assertEquals(updatedWorkout, actual); // Verify the updated workout is returned
        verify(repo).existsById(id); // Verify existsById was called with the correct ID
        verify(repo).save(updatedWorkout); // Verify save was called with the updated workout
    }

    @Test
    void updateWorkout_ShouldThrowException_whenIdDoesNotExist() {
        // GIVEN
        String nonExistentId = "nonExistentId";
        Workout workoutToUpdate = new Workout(
                nonExistentId,
                "Non-existent Workout",
                List.of(
                        new Exercise("exercise1", "Squat", 60, List.of(10, 8, 6), "Focus on depth and control.")
                ),
                null,
                "keep pushing",
                1705400659
        );

        when(repo.existsById(nonExistentId)).thenReturn(false); // Mock repository to indicate the workout does not exist

        WorkoutService workoutService = new WorkoutService(repo, idService);

        // WHEN & THEN
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            workoutService.updateWorkout(workoutToUpdate);
        });

        assertEquals("Workout with ID " + nonExistentId + " does not exist.", exception.getMessage());
        verify(repo).existsById(nonExistentId); // Verify existsById was called with the correct ID
        verify(repo, never()).save(any()); // Verify save was never called
    }

    @Test
    void deleteWorkout_ShouldDeleteWorkout_whenIdExists() {
        // GIVEN
        String id = "workout1";

        when(repo.existsById(id)).thenReturn(true); // Mock repository to indicate the workout exists

        WorkoutService workoutService = new WorkoutService(repo, idService);

        // WHEN
        workoutService.deleteWorkout(id);

        // THEN
        verify(repo).existsById(id); // Verify existsById was called with the correct ID
        verify(repo).deleteById(id); // Verify deleteById was called with the correct ID
    }

    @Test
    void deleteWorkout_ShouldThrowException_whenIdDoesNotExist() {
        // GIVEN
        String nonExistentId = "nonExistentId";

        when(repo.existsById(nonExistentId)).thenReturn(false); // Mock repository to indicate the workout does not exist

        WorkoutService workoutService = new WorkoutService(repo, idService);

        // WHEN & THEN
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            workoutService.deleteWorkout(nonExistentId);
        });

        assertEquals("Workout with ID " + nonExistentId + " does not exist.", exception.getMessage());
        verify(repo).existsById(nonExistentId); // Verify existsById was called with the correct ID
        verify(repo, never()).deleteById(any()); // Verify deleteById was never called
    }


}