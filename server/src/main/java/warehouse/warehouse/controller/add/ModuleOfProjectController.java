package warehouse.warehouse.controller.add;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.warehouse.entity.add.ModuleName;
import warehouse.warehouse.service.add.ModuleNameService;

import java.util.List;

@RestController
@RequestMapping("/module")
@CrossOrigin
public class ModuleOfProjectController {
    private final ModuleNameService moduleNameService;

    public ModuleOfProjectController(ModuleNameService moduleNameService) {
        this.moduleNameService = moduleNameService;
    }

    @GetMapping
    public ResponseEntity<List<ModuleName>> getAll() {
        return ResponseEntity.ok(moduleNameService.getAll());
    }

    @PostMapping
    public ResponseEntity<ModuleName> save(@RequestBody ModuleName moduleOfProject) {
        System.out.println(moduleOfProject);
        return ResponseEntity.ok(moduleNameService.save(moduleOfProject));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {

        if (id == null) {
            throw new RuntimeException("You must define new user");
        } else {
            moduleNameService.deleteModule(id);
        }
    }

    @PutMapping()
    public void editUser(@RequestBody ModuleName moduleOfProject) {
        moduleNameService.editModule(moduleOfProject);
    }
}
