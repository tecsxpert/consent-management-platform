package com.example.tool.service;

import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    // ✅ GENERIC EMAIL METHOD
    public void sendEmail(String to, String subject, String name, String message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, true);

            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("message", message);

            String htmlContent =
                    templateEngine.process("email-template", context);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);

            System.out.println("EMAIL SENT SUCCESSFULLY");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // ✅ ADD THIS METHOD (THIS FIXES YOUR ERROR)
    public void sendUserCreatedEmail(String email, String name) {
        sendEmail(
                email,
                "User Created Successfully",
                name,
                "Your account has been created successfully!"
        );
    }
}