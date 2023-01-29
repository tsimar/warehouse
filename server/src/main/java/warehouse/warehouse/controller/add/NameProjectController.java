package warehouse.warehouse.controller.add;


import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import warehouse.warehouse.entity.add.Project;
import warehouse.warehouse.service.add.NameProjectService;

import java.util.List;

@RestController
@RequestMapping("/project")
@CrossOrigin
public class NameProjectController {
    private  final NameProjectService nameProjectService;

    public NameProjectController(NameProjectService nameProjectService) {
        this.nameProjectService = nameProjectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAll(){
        return ResponseEntity.ok(nameProjectService.getAll());
    }

    @PostMapping
    public ResponseEntity<Project> save(@RequestBody Project nameProject ) {
        System.out.println(nameProject);
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
    public void editUser(@RequestBody Project nameProject) {
        nameProjectService.editNameProject(nameProject);
    }
}
