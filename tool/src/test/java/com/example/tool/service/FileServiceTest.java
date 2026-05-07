package com.example.tool.service;

import com.example.tool.exception.ResourceNotFoundException;
import com.example.tool.model.FileData;
import com.example.tool.repository.FileDataRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FileServiceTest {

    @Mock
    private FileDataRepository repository;

    @InjectMocks
    private FileService fileService;

    @BeforeEach
    void setup() {

        MockitoAnnotations.openMocks(this);

        ReflectionTestUtils.setField(
                fileService,
                "folderPath",
                "uploads"
        );
    }

    @Test
    void testUploadFile() throws IOException {

        MockMultipartFile file =
                new MockMultipartFile(
                        "file",
                        "image.png",
                        "image/png",
                        "hello".getBytes()
                );

        when(repository.save(any(FileData.class)))
                .thenReturn(new FileData());

        FileData result = fileService.uploadFile(file);

        assertNotNull(result);
    }

    @Test
    void testInvalidFileType() {

        MockMultipartFile file =
                new MockMultipartFile(
                        "file",
                        "test.txt",
                        "text/plain",
                        "hello".getBytes()
                );

        assertThrows(
                RuntimeException.class,
                () -> fileService.uploadFile(file)
        );
    }

    @Test
    void testGetFile() {

        FileData data = new FileData();

        when(repository.findById(1L))
                .thenReturn(Optional.of(data));

        FileData result = fileService.getFile(1L);

        assertNotNull(result);
    }

    @Test
    void testFileNotFound() {

        when(repository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> fileService.getFile(1L)
        );
    }
}