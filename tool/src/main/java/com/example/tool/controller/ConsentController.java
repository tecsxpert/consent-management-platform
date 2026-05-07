package com.example.tool.controller;

import com.example.tool.dto.ConsentDto;
import com.example.tool.entity.Consent;
import com.example.tool.service.ConsentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/consents")
@Tag(name = "Consent API", description = "Operations related to Consents")
public class ConsentController {

    private final ConsentService service;

    public ConsentController(ConsentService service) {
        this.service = service;
    }

    // ✅ CREATE
    @Operation(summary = "Create new consent")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Consent created",
            content = @Content(schema = @Schema(implementation = ConsentDto.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<ConsentDto> create(@Valid @RequestBody Consent consent) {

        Consent saved = service.createConsent(consent);
        return ResponseEntity.status(201).body(convertToDto(saved));
    }

    // ✅ GET ALL
    @Operation(summary = "Get all consents")
    @ApiResponse(responseCode = "200", description = "List fetched successfully",
        content = @Content(schema = @Schema(implementation = ConsentDto.class)))
    @GetMapping
    public ResponseEntity<Page<ConsentDto>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Page<ConsentDto> dtoPage = service.getAllConsents(page, size)
                .map(this::convertToDto);

        return ResponseEntity.ok(dtoPage);
    }

    // ✅ GET BY ID
    @Operation(summary = "Get consent by ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Consent found",
            content = @Content(schema = @Schema(implementation = ConsentDto.class))),
        @ApiResponse(responseCode = "404", description = "Consent not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ConsentDto> getById(@PathVariable Long id) {

        Consent consent = service.getConsentById(id);
        return ResponseEntity.ok(convertToDto(consent));
    }

    // ✅ UPDATE
    @Operation(summary = "Update consent")
    @ApiResponse(responseCode = "200", description = "Consent updated",
        content = @Content(schema = @Schema(implementation = ConsentDto.class)))
    @PutMapping("/{id}")
    public ResponseEntity<ConsentDto> update(
            @PathVariable Long id,
            @RequestBody Consent consent) {

        Consent updated = service.updateConsent(id, consent);
        return ResponseEntity.ok(convertToDto(updated));
    }

    // ✅ DELETE
    @Operation(summary = "Delete consent")
    @ApiResponse(responseCode = "200", description = "Consent deleted")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteConsent(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    // 🔥 CONVERTER METHOD (VERY IMPORTANT)
    private ConsentDto convertToDto(Consent consent) {
        ConsentDto dto = new ConsentDto();
        dto.setId(consent.getId());
        dto.setName(consent.getTitle()); // map title → name
        dto.setAccepted("ACTIVE".equals(consent.getStatus()));
        return dto;
    }
}