package com.example.tool.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Consent Data Transfer Object")
public class ConsentDto {

    @Schema(example = "1", description = "Consent ID")
    private Long id;

    @Schema(example = "Data Sharing", description = "Consent name/title")
    private String name;

    @Schema(example = "true", description = "Consent accepted or not")
    private boolean accepted;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}