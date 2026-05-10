package com.internship.tool.service;

import com.internship.tool.entity.Consent;
import com.internship.tool.repository.ConsentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsentService {

    @Autowired
    private ConsentRepository consentRepository;

    public Consent createConsent(Consent consent) {
        return consentRepository.save(consent);
    }

    public List<Consent> getAllConsents() {
        return consentRepository.findAll();
    }

    public Consent getConsentById(Long id) {
        return consentRepository.findById(id).orElse(null);
    }

    public Consent updateConsent(Long id, Consent consent) {

        Consent updatedConsent =
                consentRepository.findById(id).orElse(null);

        if (updatedConsent != null) {

            updatedConsent.setPurpose(consent.getPurpose());
            updatedConsent.setStatus(consent.getStatus());

            return consentRepository.save(updatedConsent);
        }

        return null;
    }

    public void deleteConsent(Long id) {
        consentRepository.deleteById(id);
    }
}