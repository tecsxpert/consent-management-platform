package com.example.tool.entity;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class ConsentTest {

    @Test
    void testConsentGetterSetter() {

        Consent consent = new Consent();

        consent.setTitle("Test");
        consent.setDescription("Desc");
        consent.setStatus("ACTIVE");
        consent.setGivenBy("Manju");

        LocalDateTime now = LocalDateTime.now();

        consent.setExpiryDate(now);

        assertEquals("Test", consent.getTitle());
        assertEquals("Desc", consent.getDescription());
        assertEquals("ACTIVE", consent.getStatus());
        assertEquals("Manju", consent.getGivenBy());
        assertEquals(now, consent.getExpiryDate());
    }

    @Test
    void testLifecycleMethods() {

        Consent consent = new Consent();

        consent.onCreate();
        consent.onUpdate();

        assertNotNull(consent.getCreatedAt());
        assertNotNull(consent.getUpdatedAt());
    }
}