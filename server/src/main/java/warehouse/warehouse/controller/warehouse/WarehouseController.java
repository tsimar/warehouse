package warehouse.warehouse.controller.warehouse;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.service.warehouse.WarehouseService;

import java.util.List;

@RestController
@RequestMapping("/warehouse")
@CrossOrigin
public class WarehouseController {
    private final WarehouseService warehouseService;

    public WarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @GetMapping
    public ResponseEntity<List<Warehouse>> getAll(){
        return ResponseEntity.ok(warehouseService.getAll());
    }

    @PostMapping
    public ResponseEntity<Warehouse> save(@RequestBody Warehouse warehouse){
        return ResponseEntity.ok(warehouseService.save(warehouse));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {

        if (id == null) {
            throw new RuntimeException("You must define new user");
        } else {
            warehouseService.delete(id);
        }
    }
    @PutMapping() public void edit(@RequestBody Warehouse warehouse) {
        warehouseService.edit(warehouse);
    }
}
