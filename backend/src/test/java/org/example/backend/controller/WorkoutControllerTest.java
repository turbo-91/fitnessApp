package org.example.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.model.Exercise;
import org.example.backend.model.Workout;
import org.example.backend.repo.WorkoutRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class WorkoutControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WorkoutRepo repo;

    @Autowired
    ObjectMapper objectMapper;

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

    @Test
    void createWorkout_shouldPersistWorkoutAndReturnCreatedWorkout_whenCalledWithValidPayload() throws Exception {
        String requestBody = """
                {
                    "name": "Cardio and Core",
                    "exercises": [
                        {
                            "id": "exercise4",
                            "name": "Running",
                            "kg": 0,
                            "set": [],
                            "notes": "Maintain a steady pace."
                        },
                        {
                            "id": "exercise5",
                            "name": "Plank",
                            "kg": 0,
                            "set": [60, 60, 60],
                            "notes": "Engage the core and keep the back straight."
                        }
                    ],
                    "timestamp": 1705400700
                }
                """;

        mockMvc.perform(post("/api/workouts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Cardio and Core"))
                .andExpect(jsonPath("$.exercises").isArray())
                .andExpect(jsonPath("$.exercises[0].id").value("exercise4"))
                .andExpect(jsonPath("$.exercises[1].id").value("exercise5"))
                .andExpect(jsonPath("$.timestamp").value(1705400700));

        // Verify that the workout is saved in the database
        assertThat(repo.findAll()).hasSize(1);
        Workout savedWorkout = repo.findAll().get(0);
        assertThat(savedWorkout.name()).isEqualTo("Cardio and Core");
        assertThat(savedWorkout.exercises()).hasSize(2);
    }
}



