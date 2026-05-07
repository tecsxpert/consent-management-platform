package com.example.tool.model;

import jakarta.persistence.*;

@Entity
public class FileData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;      // original name
    private String fileType;      // image/png, etc
    private String filePath;      // stored path

    public FileData() {}

    public FileData(String fileName, String fileType, String filePath) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
    }

    public Long getId() { return id; }

    public String getFileName() { return fileName; }

    public String getFileType() { return fileType; }

    public String getFilePath() { return filePath; }

    public void setId(Long id) { this.id = id; }

    public void setFileName(String fileName) { this.fileName = fileName; }

    public void setFileType(String fileType) { this.fileType = fileType; }

    public void setFilePath(String filePath) { this.filePath = filePath; }
}