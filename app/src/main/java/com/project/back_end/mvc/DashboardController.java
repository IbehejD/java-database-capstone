package com.project.back_end.mvc;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.back_end.services.TokenService;

@Controller
public class DashboardController {

    // 1. Set Up the MVC Controller Class:
    // - Annotate the class with `@Controller` to indicate that it serves as an MVC
    // controller returning view names (not JSON).
    // - This class handles routing to admin and doctor dashboard pages based on
    // token validation.
    @Autowired
    private TokenService service;

    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable("token") String token) {
        boolean result = service.validateToken(token, "admin");
        if (!result) {
            return "redirect:/";
        }

        return "admin/adminDashboard";
    }

    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable("token") String token) {
        boolean result = service.validateToken(token, "doctor");
        if (!result) {
            return "redirect:/";
        }

        return "doctor/doctorDashboard";
    }

}
