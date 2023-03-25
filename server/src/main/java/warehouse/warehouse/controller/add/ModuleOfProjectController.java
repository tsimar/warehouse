package warehouse.warehouse.controller.add;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.warehouse.entity.add.ModuleOfProject;
import warehouse.warehouse.service.add.ModuleOfProjectService;

import java.util.List;

@RestController
@RequestMapping("/module")
@CrossOrigin
public class ModuleOfProjectController {
    private final ModuleOfProjectService moduleOfProjectService;

    public ModuleOfProjectController(ModuleOfProjectService moduleOfProjectService) {
        this.moduleOfProjectService = moduleOfProjectService;
    }

    @GetMapping
    public ResponseEntity<List<ModuleOfProject>> getAll() {
        return ResponseEntity.ok(moduleOfProjectService.getAll());
    }

    @PostMapping
    public ResponseEntity<ModuleOfProject> save(@RequestBody ModuleOfProject moduleOfProject) {
        System.out.println(moduleOfProject);
        return ResponseEntity.ok(moduleOfProjectService.save(moduleOfProject));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {

        if (id == null) {
            throw new RuntimeException("You must define new user");
        } else {
            moduleOfProjectService.deleteModule(id);
        }
    }

    @PutMapping()
    public void editUser(@RequestBody ModuleOfProject moduleOfProject) {
        moduleOfProjectService.editModule(moduleOfProject);
    }
}
