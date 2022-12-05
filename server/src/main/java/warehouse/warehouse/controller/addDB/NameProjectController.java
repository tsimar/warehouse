package warehouse.warehouse.controller.addDB;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import warehouse.warehouse.entity.addBD.Element;
import warehouse.warehouse.entity.addBD.NameProject;
import warehouse.warehouse.service.add.NameProjectService;

import java.util.List;

@Controller
@RequestMapping("/project")
@CrossOrigin
public class NameProjectController {
    private  final NameProjectService nameProjectService;

    public NameProjectController(NameProjectService nameProjectService) {
        this.nameProjectService = nameProjectService;
    }

    @GetMapping
    public ResponseEntity<List<NameProject>> getAll(){
        return ResponseEntity.ok(nameProjectService.getAll());
    }

    @PostMapping
    public ResponseEntity<NameProject> save(@RequestBody NameProject nameProject) {
        return ResponseEntity.ok(nameProjectService.save(nameProject));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {

        if (id == null) {
            throw new RuntimeException("You must define new user");
        } else {
            nameProjectService.deleteNameProject(id);
        }
    }
    @PutMapping()
    public void editUser(@RequestBody NameProject nameProject) {
        nameProjectService.editNameProject(nameProject);
    }
}
