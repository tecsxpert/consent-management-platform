package com.example.tool.controller;

import com.example.tool.model.FileData;
import com.example.tool.service.FileService;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;

@RestController
public class FileController {

    private final FileService service;

    public FileController(FileService service) {
        this.service = service;
    }

    // ✅ UPLOAD FILE (FIXED)
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public FileData upload(@RequestPart("file") MultipartFile file) throws Exception {

        System.out.println("FILE RECEIVED: " + file.getOriginalFilename());

        return service.uploadFile(file);
    }

    // ✅ DOWNLOAD FILE
    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) throws Exception {

        FileData data = service.getFile(id);

        File file = new File(data.getFilePath());

        byte[] content = Files.readAllBytes(file.toPath());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + data.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(data.getFileType()))
                .body(content);
    }
}