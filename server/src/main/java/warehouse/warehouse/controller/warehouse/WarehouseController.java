package warehouse.warehouse.controller.warehouse;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.warehouse.DTO.EditElementDTO;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.service.warehouse.WarehouseService;
import warehouse.warehouse.service.warehouse.WarehouseWorkService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/warehouse")
@CrossOrigin
public class WarehouseController {
    private final WarehouseService warehouseService;
    private final WarehouseWorkService warehouseServiceWork;

    public WarehouseController(WarehouseService warehouseService, WarehouseWorkService warehouseServiceWork) {
        this.warehouseService = warehouseService;
        this.warehouseServiceWork = warehouseServiceWork;
    }

    @GetMapping("/{warehouseName}")
    public ResponseEntity<Map<Long,List<Warehouse>>> getAll(@PathVariable String warehouseName){
        return ResponseEntity.ok(warehouseService.getTypeWarehouse(warehouseName));
    }

    @GetMapping
    public ResponseEntity<List<Warehouse>> getAll(){
        return ResponseEntity.ok(warehouseService.getAll());
    }

    @PostMapping
    public ResponseEntity<Warehouse> save(@RequestBody Warehouse warehouse){

        if (warehouse.getWarehouseName().equals("in")){
            warehouseServiceWork.saveWork(warehouse);
        }

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

    @PutMapping("/editProject")
    public void edit(@RequestBody Warehouse warehouse) {
        warehouseService.editProject(warehouse);
    }

    @PutMapping("/editModule")
    public void editModule(@RequestBody Warehouse warehouse) {
        warehouseService.editModule(warehouse);
    }
    @PutMapping("/editElement")
    public void editElement(@RequestBody Warehouse warehouse) {
        warehouseService.editElement(warehouse);
    }
}
