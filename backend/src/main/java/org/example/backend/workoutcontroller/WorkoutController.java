package org.example.backend.workoutcontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WorkoutController {

    @GetMapping("/hello")
    public String getAll() {
        return "hi";
    }

}
