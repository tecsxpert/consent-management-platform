package com.example.tool.config;

import com.example.tool.entity.Consent;
import com.example.tool.repository.ConsentRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Random;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(ConsentRepository repo) {
        return args -> {

            // ✅ FORCE DELETE OLD DATA (IMPORTANT)
            repo.deleteAll();

            String[] titles = {
                "Data Sharing", "Marketing Emails", "Location Access",
                "Health Data", "Analytics Tracking"
            };

            String[] descriptions = {
                "Allow sharing data", "Receive emails",
                "Access location", "Use health data", "Track analytics"
            };

            String[] users = {
                "John", "Alice", "Bob", "Manju"
            };

            String[] statuses = {
                "ACTIVE", "EXPIRED", "REVOKED"
            };

            Random random = new Random();

            for (int i = 1; i <= 30; i++) {

                Consent c = new Consent();

                c.setTitle(titles[random.nextInt(titles.length)]);
                c.setDescription(descriptions[random.nextInt(descriptions.length)]);
                c.setStatus(statuses[random.nextInt(statuses.length)]);
                c.setGivenBy(users[random.nextInt(users.length)]);
                c.setExpiryDate(LocalDateTime.now().plusDays(random.nextInt(30)));

                repo.save(c);
            }

            System.out.println("✅ 30 Demo Records Inserted!");
        };
    }
}