package warehouse.warehouse.controller.addDB;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import warehouse.warehouse.entity.addBD.Position;
import warehouse.warehouse.service.add.PositionService;

import java.util.List;

@Controller
@RequestMapping("/position")
@CrossOrigin
public class PositionController {
    private final PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping
    public ResponseEntity<List<Position>> getAll() {
        return ResponseEntity.ok(positionService.getAll());
    }

    @PostMapping
    public ResponseEntity<Position> save(@RequestBody Position position) {
        return ResponseEntity.ok(positionService.save(position));
    }

    @DeleteMapping("/{id}")
    public void deletePosition(@PathVariable Long id) {

        if (id == null) {
            throw new RuntimeException("You must define new user");
        } else {
            positionService.deletePosition(id);
        }
    }

    @PutMapping()
    public void editPosition(@RequestBody Position position) {
        positionService.editPosition(position);
    }
}
