package com.internship.tool.controller;

import com.internship.tool.entity.Consent;
import com.internship.tool.service.ConsentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consents")
public class ConsentController {

    @Autowired
    private ConsentService consentService;

    // CREATE
    @PostMapping
    public Consent createConsent(@RequestBody Consent consent) {
        return consentService.createConsent(consent);
    }

    // GET ALL
    @GetMapping
    public List<Consent> getAllConsents() {
        return consentService.getAllConsents();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Consent getConsentById(@PathVariable Long id) {
        return consentService.getConsentById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Consent updateConsent(
            @PathVariable Long id,
            @RequestBody Consent consent) {

        return consentService.updateConsent(id, consent);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteConsent(@PathVariable Long id) {

        consentService.deleteConsent(id);

        return "Consent deleted successfully";
    }
}