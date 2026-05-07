package com.example.tool.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FileDataTest {

    @Test
    void testFileData() {

        FileData data =
                new FileData("a.png", "image/png", "/temp/a.png");

        assertEquals("a.png", data.getFileName());

        data.setFileName("b.png");

        assertEquals("b.png", data.getFileName());

        data.setFileType("image/jpeg");

        assertEquals("image/jpeg", data.getFileType());

        data.setFilePath("/new/path");

        assertEquals("/new/path", data.getFilePath());
    }
}