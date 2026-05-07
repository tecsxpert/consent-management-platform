package com.example.tool.service;

import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;

import org.junit.jupiter.api.Test;

import org.springframework.mail.javamail.JavaMailSender;

import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.Properties;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ExtraServiceTest {

    @Test
    void testSendUserCreatedEmail() {

        JavaMailSender mailSender = mock(JavaMailSender.class);
        SpringTemplateEngine templateEngine = mock(SpringTemplateEngine.class);

        MimeMessage mimeMessage =
                new MimeMessage(Session.getDefaultInstance(new Properties()));

        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

        when(templateEngine.process(anyString(), any(Context.class)))
                .thenReturn("<html>Email</html>");

        EmailService emailService = new EmailService();

        try {

            java.lang.reflect.Field mailField =
                    EmailService.class.getDeclaredField("mailSender");

            mailField.setAccessible(true);
            mailField.set(emailService, mailSender);

            java.lang.reflect.Field templateField =
                    EmailService.class.getDeclaredField("templateEngine");

            templateField.setAccessible(true);
            templateField.set(emailService, templateEngine);

        } catch (Exception e) {
            e.printStackTrace();
        }

        emailService.sendUserCreatedEmail(
                "test@mail.com",
                "Manju"
        );

        verify(mailSender, times(1))
                .send(any(MimeMessage.class));
    }
}