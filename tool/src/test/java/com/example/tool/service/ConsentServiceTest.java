package com.example.tool.service;

import com.example.tool.entity.Consent;
import com.example.tool.repository.ConsentRepository;
import com.example.tool.exception.ResourceNotFoundException;
import com.example.tool.exception.InvalidInputException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ConsentServiceTest {

    private ConsentRepository repository;
    private ConsentService service;

    @BeforeEach
    void setup() {
        repository = mock(ConsentRepository.class);
        service = new ConsentService(repository);
    }

    // ✅ SUCCESS CREATE
    @Test
    void testCreateConsentSuccess() {
        Consent c = validConsent();
        when(repository.save(c)).thenReturn(c);

        Consent result = service.createConsent(c);

        assertNotNull(result);
        verify(repository).save(c);
    }

    // ❌ TITLE NULL
    @Test
    void testCreateConsentTitleNull() {
        Consent c = validConsent();
        c.setTitle(null);

        assertThrows(InvalidInputException.class, () -> {
            service.createConsent(c);
        });
    }

    // ❌ GIVENBY EMPTY
    @Test
    void testCreateConsentGivenByEmpty() {
        Consent c = validConsent();
        c.setGivenBy("");

        assertThrows(InvalidInputException.class, () -> {
            service.createConsent(c);
        });
    }

    // ❌ EXPIRY IN PAST
    @Test
    void testCreateConsentExpiryPast() {
        Consent c = validConsent();
        c.setExpiryDate(LocalDateTime.now().minusDays(1));

        assertThrows(InvalidInputException.class, () -> {
            service.createConsent(c);
        });
    }

    // ✅ GET BY ID SUCCESS
    @Test
    void testGetByIdSuccess() {
        Consent c = validConsent();

        when(repository.findById(1L)).thenReturn(Optional.of(c));

        Consent result = service.getConsentById(1L);

        assertNotNull(result);
    }

    // ❌ GET BY ID NOT FOUND
    @Test
    void testGetByIdNotFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            service.getConsentById(1L);
        });
    }

    // ✅ UPDATE SUCCESS
    @Test
    void testUpdateSuccess() {
        Consent oldC = validConsent();
        Consent newC = validConsent();
        newC.setTitle("Updated");

        when(repository.findById(1L)).thenReturn(Optional.of(oldC));
        when(repository.save(any())).thenReturn(oldC);

        Consent result = service.updateConsent(1L, newC);

        assertEquals("Updated", result.getTitle());
    }

    // ❌ UPDATE NOT FOUND
    @Test
    void testUpdateNotFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            service.updateConsent(1L, validConsent());
        });
    }

    // ✅ DELETE SUCCESS
    @Test
    void testDeleteSuccess() {
        Consent c = validConsent();

        when(repository.findById(1L)).thenReturn(Optional.of(c));

        service.deleteConsent(1L);

        verify(repository).delete(c);
    }

    // ❌ DELETE NOT FOUND
    @Test
    void testDeleteNotFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            service.deleteConsent(1L);
        });
    }

    // 🔧 HELPER METHOD
    private Consent validConsent() {
        Consent c = new Consent();
        c.setTitle("Test");
        c.setGivenBy("User");
        c.setExpiryDate(LocalDateTime.now().plusDays(1));
        return c;
    }
}