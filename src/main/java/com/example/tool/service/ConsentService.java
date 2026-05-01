package com.example.tool.service;

import com.example.tool.entity.Consent;
import com.example.tool.repository.ConsentRepository;
import com.example.tool.exception.ResourceNotFoundException;
import com.example.tool.exception.InvalidInputException;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;

@Service
public class ConsentService {

    private final ConsentRepository repository;

    public ConsentService(ConsentRepository repository) {
        this.repository = repository;
    }

    // ✅ CREATE
    public Consent createConsent(Consent consent) {
        validateConsent(consent);
        return repository.save(consent);
    }

    // ✅ GET ALL (PAGINATION)
    public Page<Consent> getAllConsents(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    // ✅ GET BY ID
    public Consent getConsentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Consent not found"));
    }

    // ✅ UPDATE
    public Consent updateConsent(Long id, Consent newData) {
        Consent existing = getConsentById(id);

        existing.setTitle(newData.getTitle());
        existing.setDescription(newData.getDescription());
        existing.setStatus(newData.getStatus());
        existing.setGivenBy(newData.getGivenBy());
        existing.setExpiryDate(newData.getExpiryDate());

        return repository.save(existing);
    }

    // ✅ DELETE
    public void deleteConsent(Long id) {
        Consent consent = getConsentById(id);
        repository.delete(consent);
    }

    // ✅ VALIDATION
    private void validateConsent(Consent consent) {

        if (consent.getTitle() == null || consent.getTitle().isEmpty()) {
            throw new InvalidInputException("Title is required");
        }

        if (consent.getGivenBy() == null || consent.getGivenBy().isEmpty()) {
            throw new InvalidInputException("GivenBy is required");
        }

        if (consent.getExpiryDate() != null &&
                consent.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new InvalidInputException("Expiry date cannot be in the past");
        }
    }
}