package warehouse.warehouse.controller.warehouse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.warehouse.DTO.ChangeWorkMachine;
import warehouse.warehouse.entity.warehouse.WarehouseWork;
import warehouse.warehouse.service.warehouse.WarehouseWorkService;

import java.util.List;


@RestController
@RequestMapping("/warehouseWork")
@CrossOrigin
public class WarehouseWorkController {
    private final WarehouseWorkService warehouseWorkService;

    public WarehouseWorkController(WarehouseWorkService warehouseWorkService) {
        this.warehouseWorkService = warehouseWorkService;
    }

    @GetMapping
    public ResponseEntity<List<WarehouseWork>> getAll(){

        return ResponseEntity.ok(warehouseWorkService.getSelectWarehouseWork());
    }


    @PutMapping("/changeWorkMachine")
    public void changeMachine(@RequestBody ChangeWorkMachine changeWorkMachine){

       warehouseWorkService.changeMachine(changeWorkMachine);
    }


    @PutMapping
    public void edit(@RequestBody WarehouseWork warehouseWork) {
        warehouseWorkService.edit(warehouseWork);
    }
}
