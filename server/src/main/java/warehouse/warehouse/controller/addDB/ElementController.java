package warehouse.warehouse.controller.addDB;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import warehouse.warehouse.entity.addBD.Element;
import warehouse.warehouse.service.add.ElementService;

import java.util.List;

@Controller
@RequestMapping("/element")
@CrossOrigin
public class ElementController {
    private final ElementService elementService;

    public ElementController(ElementService elementService) {
        this.elementService = elementService;
    }

    @GetMapping
    public ResponseEntity<List<Element>> getElement() {
        return ResponseEntity.ok(elementService.getAll());
    }

    @PostMapping
    public ResponseEntity<Element> save(@RequestBody Element element) {
        return ResponseEntity.ok(elementService.save(element));
    }
}
