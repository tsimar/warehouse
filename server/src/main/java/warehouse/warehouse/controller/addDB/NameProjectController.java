package warehouse.warehouse.controller.addDB;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
