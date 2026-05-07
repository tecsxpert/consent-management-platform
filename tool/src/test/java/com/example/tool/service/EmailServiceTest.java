package com.example.tool.service;

import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.mail.javamail.JavaMailSender;

import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.Properties;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private SpringTemplateEngine templateEngine;

    @InjectMocks
    private EmailService emailService;

    EmailServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSendEmail() {

        MimeMessage mimeMessage =
                new MimeMessage(Session.getDefaultInstance(new Properties()));

        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

        when(templateEngine.process(anyString(), any()))
                .thenReturn("<html>Email</html>");

        emailService.sendEmail(
                "test@gmail.com",
                "Test Subject",
                "Manju",
                "Hello"
        );

        verify(mailSender, times(1)).send(any(MimeMessage.class));
    }

    @Test
    void testSendUserCreatedEmail() {

        MimeMessage mimeMessage =
                new MimeMessage(Session.getDefaultInstance(new Properties()));

        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

        when(templateEngine.process(anyString(), any()))
                .thenReturn("<html>Email</html>");

        emailService.sendUserCreatedEmail(
                "test@gmail.com",
                "Manju"
        );

        verify(mailSender, times(1)).send(any(MimeMessage.class));
    }
}