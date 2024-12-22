package warehouse.warehouse.controller.add;


import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import warehouse.warehouse.entity.add.ElementName;

import warehouse.warehouse.service.add.ElementService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/element")
@CrossOrigin
public class ElementController {
    private final ElementService elementService;


    public ElementController(ElementService elementService) {
        this.elementService = elementService;
    }

    @GetMapping
    public ResponseEntity<List<ElementName>> getElement() {
        return ResponseEntity.ok(elementService.getAll());
    }

    @GetMapping("/{nameFile}")
    public ResponseEntity<?> getFile(@PathVariable("nameFile") String nameFile) throws Exception {
//        OutputStream pdfStream = PDFGenerator.pdfGenerate(data);

        Resource resource = null;
        try {
            resource = elementService.getFileAsResource(nameFile);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }

        if (resource == null) {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }

        String contentType = "application/pdf";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }
//  .contentType(MediaType.parseMediaType(contentType))
    @PostMapping
    public ResponseEntity<ElementName> save(@RequestBody ElementName element) throws Exception {

        return ResponseEntity.ok(elementService.save(element));
    }

    @PostMapping("/upload")
    public void uploadFile(@RequestParam("file") MultipartFile file) throws Exception {

        elementService.uploadFile(file);
    }

    @DeleteMapping("/{id}")
    public void deleteElement(@PathVariable Long id) {

        if (id == null) {
            throw new RuntimeException("You must define new user");
        } else {
            elementService.deleteElement(id);
        }
    }

    @PutMapping()
    public void editElement(@RequestBody ElementName element) {
        elementService.editElement(element);
    }
}
