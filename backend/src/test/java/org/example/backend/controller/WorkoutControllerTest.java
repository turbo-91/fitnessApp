package org.example.backend.controller;

import org.example.backend.model.Exercise;
import org.example.backend.model.Workout;
import org.example.backend.repo.WorkoutRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class WorkoutControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WorkoutRepo repo;

    @Test
    void getAllWorkouts_shouldReturnListWithOneWorkout_whenCalledWithFilledDB() throws Exception {
        Workout workout = new Workout(
                "workout1",
                "Full Body Strength",
                List.of(
                        new Exercise("exercise1", "Squat", 60, List.of(10, 8, 6), "Focus on depth and control."),
                        new Exercise("exercise2", "Bench Press", 40, List.of(10, 8, 6), "Ensure proper grip and avoid locking elbows."),
                        new Exercise("exercise3", "Deadlift", 80, List.of(8, 6, 4), "Maintain a straight back throughout the lift.")
                ),
                1705400659
        );
        repo.save(workout);

        mockMvc.perform(get("/api/workouts"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                        [
                                          {
                                              "id": "workout1",
                                              "name": "Full Body Strength",
                                              "exercises": [
                                                {
                                                  "id": "exercise1",
                                                  "name": "Squat",
                                                  "kg": 60,
                                                  "set": [
                                                    10,
                                                    8,
                                                    6
                                                  ],
                                                  "notes": "Focus on depth and control."
                                                },
                                                {
                                                  "id": "exercise2",
                                                  "name": "Bench Press",
                                                  "kg": 40,
                                                  "set": [
                                                    10,
                                                    8,
                                                    6
                                                  ],
                                                  "notes": "Ensure proper grip and avoid locking elbows."
                                                },
                                                {
                                                  "id": "exercise3",
                                                  "name": "Deadlift",
                                                  "kg": 80,
                                                  "set": [
                                                    8,
                                                    6,
                                                    4
                                                  ],
                                                  "notes": "Maintain a straight back throughout the lift."
                                                }
                                              ],
                                              "timestamp": 1705400659
                                            }
                                        ]
                                        """));
    }


}