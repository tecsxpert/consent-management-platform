package com.example.tool.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.tool.service.EmailService;

@Component
public class OverdueScheduler {

    @Autowired
    private EmailService emailService;

    @Scheduled(fixedRate = 60000) // every 1 minute
    public void checkOverdueTasks() {
        System.out.println("Checking overdue tasks...");

        emailService.sendEmail(
            "receiver@gmail.com",
            "Task Overdue",
            "User",
            "Your task is overdue. Please take action!"
        );
    }
}