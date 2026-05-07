package com.example.tool.service;

import com.example.tool.model.FileData;
import com.example.tool.repository.FileDataRepository;
import com.example.tool.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileService {

    private final FileDataRepository repo;

    // ✅ GET FROM application.properties
    @Value("${file.upload-dir}")
    private String folderPath;

    public FileService(FileDataRepository repo) {
        this.repo = repo;
    }

    // ✅ UPLOAD FILE
    public FileData uploadFile(MultipartFile file) throws IOException {

        // ✅ SIZE VALIDATION (10MB)
        if (file.getSize() > 10 * 1024 * 1024) {
            throw new RuntimeException("File too large");
        }

        // ✅ TYPE VALIDATION
        if (file.getContentType() == null ||
                (!file.getContentType().startsWith("image") &&
                 !file.getContentType().equals("application/pdf"))) {
            throw new RuntimeException("Invalid file type");
        }

        // ✅ CREATE FOLDER IF NOT EXISTS
        File folder = new File(folderPath);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // ✅ UNIQUE NAME
        String uniqueName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // ✅ FULL ABSOLUTE PATH (VERY IMPORTANT)
        String fullPath = folder.getAbsolutePath() + File.separator + uniqueName;

        // ✅ SAVE FILE
        file.transferTo(new File(fullPath));

        // ✅ SAVE DB
        FileData data = new FileData(
                file.getOriginalFilename(),
                file.getContentType(),
                fullPath   // save FULL PATH
        );

        return repo.save(data);
    }

    // ✅ DOWNLOAD
    public FileData getFile(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("File not found"));
    }
}