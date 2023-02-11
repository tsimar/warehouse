package warehouse.warehouse.service.warehouse;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import warehouse.warehouse.DTO.ChangeWorkMachine;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.entity.warehouse.WarehouseWork;
import warehouse.warehouse.repository.warehouse.WarehouseWorkRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class WarehouseWorkService {
    private final WarehouseWorkRepository warehouseWorkRepository;
    private final WarehouseService warehouseService;

    public WarehouseWorkService(WarehouseWorkRepository warehouseWorkRepository, WarehouseService warehouseService) {
        this.warehouseWorkRepository = warehouseWorkRepository;
        this.warehouseService = warehouseService;
    }


    @Transactional
    public void edit(WarehouseWork warehouseWork) {
        try {
            warehouseWorkRepository
                    .findById(warehouseWork.getId())
                    .ifPresent(warehouse1 -> {
                        warehouse1.setIdProject(warehouseWork.getIdProject());
                        warehouse1.setIdElement(warehouseWork.getIdElement());
                        warehouse1.setNumber(warehouseWork.getNumber());
                        warehouse1.setDataStart(warehouseWork.getDataStart());
                        warehouse1.setDataFinish(warehouseWork.getDataFinish());
                        warehouse1.setBacaFanuc(warehouseWork.getBacaFanuc());
                        warehouse1.setLathe(warehouseWork.getLathe());
                        warehouse1.setHeidenhain(warehouseWork.getHeidenhain());
                        warehouse1.setMillingMachineSmall(warehouseWork.getMillingMachineSmall());
                    });
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public List<WarehouseWork> getSelectWarehouseWork() {
        List<Warehouse> warehouses = warehouseService.getWarehouseByName();
        List<WarehouseWork> warehouseWorks = warehouseWorkRepository.findAllOpen(1);
        List<WarehouseWork> resultWarehouseWork = systemWarehouseWork(warehouses, warehouseWorks);
        warehouseWorkRepository.saveAll(resultWarehouseWork);
        return resultWarehouseWork;
    }

    private List<WarehouseWork> systemWarehouseWork(List<Warehouse> warehouses, List<WarehouseWork> warehouseWorks) {
        List<WarehouseWork> resultWarehouseWork = warehouseWorks;
        Long idNew = 3L;
        for (Warehouse item : warehouses) {
            WarehouseWork warehouseWork = new WarehouseWork();
            int k = 0;

            for (WarehouseWork itemWork : resultWarehouseWork) {
                if (itemWork.getIdProject() == item.getIdProject() && itemWork.getIdElement() == item.getIdElement()) {
                    k++;
                }
            }
            if (k == 0) {
                warehouseWork.setId(idNew);
                warehouseWork.setIdProject(item.getIdProject());
                warehouseWork.setIdElement(item.getIdElement());
                warehouseWork.setNumber(item.getNumber());
                warehouseWork.setDataStart(item.getDataStart());
                warehouseWork.setDataFinish(Date.valueOf(LocalDate.now()));
                warehouseWork.setHeidenhain("false");
                warehouseWork.setLathe("false");
                warehouseWork.setBacaFanuc("false");
                warehouseWork.setMillingMachineSmall("false");
                warehouseWork.setWarehouseOpen(1);
                resultWarehouseWork.add(warehouseWork);
            }
            idNew++;
        }
        return resultWarehouseWork;
    }

    public void changeMachine(ChangeWorkMachine changeWorkMachine) {
        int statusDetailed = 1;
        if (changeWorkMachine.getBacaFanuc() == "gotowo"
                && changeWorkMachine.getLathe() == "gotowo"
                && changeWorkMachine.getMillingMachineSmall() == "gotowo"
                && changeWorkMachine.getHeidenhain() == "gotowo") {
            statusDetailed = 2;

        }
        System.out.println(changeWorkMachine.getBacaFanuc()+"  "+
                changeWorkMachine.getHeidenhain()+"  "+
                changeWorkMachine.getLathe()+"  "+
                changeWorkMachine.getMillingMachineSmall()+"  "+
                statusDetailed+"  "+ changeWorkMachine.getId());

    }
}
