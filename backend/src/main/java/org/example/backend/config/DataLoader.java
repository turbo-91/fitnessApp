package org.example.backend.config;

import org.example.backend.model.Exercise;
import org.example.backend.model.Workout;
import org.example.backend.repo.WorkoutRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {
    private final WorkoutRepo workoutRepo;

    public DataLoader(WorkoutRepo workoutRepo) {
        this.workoutRepo = workoutRepo;
    }

    @Override
    public void run(String... args) {
        if (workoutRepo.count() == 0) {
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
            );

            Workout workout3 = new Workout(
                    "workout3",
                    "Lower Body Endurance",
                    List.of(
                            new Exercise("exercise7", "Leg Press", 100, List.of(15, 12, 10), "Do not lock knees at the top of the movement."),
                            new Exercise("exercise8", "Walking Lunges", 20, List.of(12, 12, 12), "Keep an upright posture and take wide steps."),
                            new Exercise("exercise9", "Calf Raises", 30, List.of(20, 18, 15), "Pause at the top for maximum contraction.")
                    ),
                    1705400659
            );

            workoutRepo.save(workout1);
            workoutRepo.save(workout2);
            workoutRepo.save(workout3);
        }
    }
}