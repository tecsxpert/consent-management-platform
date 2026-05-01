package com.example.tool.controller;

import com.example.tool.entity.Consent;
import com.example.tool.service.ConsentService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/consents")
public class ConsentController {

    private final ConsentService service;

    public ConsentController(ConsentService service) {
        this.service = service;
    }

    // ✅ CREATE (201 + Validation)
    @PostMapping
    public ResponseEntity<Consent> create(@Valid @RequestBody Consent consent) {
        return ResponseEntity.status(201).body(service.createConsent(consent));
    }

    // ✅ GET ALL (Pagination)
    @GetMapping
    public ResponseEntity<Page<Consent>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(service.getAllConsents(page, size));
    }

    // ✅ GET BY ID (404 handled in service)
    @GetMapping("/{id}")
    public ResponseEntity<Consent> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getConsentById(id));
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Consent> update(
            @PathVariable Long id,
            @RequestBody Consent consent) {

        return ResponseEntity.ok(service.updateConsent(id, consent));
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteConsent(id);
        return ResponseEntity.ok("Deleted successfully");
        
    }
}