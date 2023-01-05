package warehouse.warehouse.controller.add;


import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import warehouse.warehouse.entity.add.Element;
import warehouse.warehouse.service.add.ElementService;

import java.util.List;

@RestController
@RequestMapping("/element")
@CrossOrigin
public class ElementController {
    private final ElementService elementService;

    public  ElementController(ElementService elementService) {
        this.elementService = elementService;
    }

    @GetMapping
    public ResponseEntity<List<Element>> getElement() {
        return ResponseEntity.ok(elementService.getAll());
    }

//    @PostMapping
//    public ResponseEntity<Element> save(@RequestBody Element element) {
//        return ResponseEntity.ok(elementService.save(element));
//    }
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
    public void editElement(@RequestBody Element element) {
        elementService.editElement(element);
    }
}
