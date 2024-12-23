package warehouse.warehouse.controller.warehouse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.warehouse.DTO.ChangeWorkMachine;
import warehouse.warehouse.entity.warehouse.WarehouseWork;
import warehouse.warehouse.service.warehouse.WarehouseWorkService;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/warehouseWork")
@CrossOrigin
@Slf4j
public class WarehouseWorkController {
//    private final WarehouseWorkService warehouseWorkService;
//
//    public WarehouseWorkController(WarehouseWorkService warehouseWorkService) {
//        this.warehouseWorkService = warehouseWorkService;
//    }
//
//    @GetMapping
//    public ResponseEntity<Map<Long, List<WarehouseWork>>> getSelectOpen() {
//
//        return ResponseEntity.ok(warehouseWorkService.getSelectWarehouseWork());
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<WarehouseWork>> getAll() {
//
//        return ResponseEntity.ok(warehouseWorkService.getAll());
//    }
//
//    @PutMapping("/changeWorkMachine")
//    public void changeMachine(@RequestBody ChangeWorkMachine changeWorkMachine) {
//
//        warehouseWorkService.changeMachine(changeWorkMachine);
//    }


//    @PutMapping
//    public void edit(@RequestBody WarehouseWork warehouseWork) {
//        warehouseWorkService.edit(warehouseWork);
//    }
//
//    @GetMapping("/timeMachine")
//    public ResponseEntity<HashMap<Date, ArrayList<WarehouseWork>>> getTimeMachine(){
//        return ResponseEntity.ok(warehouseWorkService.getTimeMachine());
//    }
}
