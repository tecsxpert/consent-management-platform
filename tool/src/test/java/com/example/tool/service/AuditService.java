package com.example.tool.service;

import org.junit.jupiter.api.Test;

class AuditServiceTest {

    @Test
    void testLog() {

        AuditService auditService = new AuditService();

        auditService.log("TEST AUDIT");
    }
}