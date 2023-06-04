package warehouse.warehouse.service.warehouse;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import warehouse.warehouse.DTO.ChangeWorkMachine;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.entity.warehouse.WarehouseWork;
import warehouse.warehouse.repository.warehouse.WarehouseWorkRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WarehouseWorkService {
    private final WarehouseWorkRepository warehouseWorkRepository;
    private final WarehouseService warehouseService;


    @Transactional
    public void edit(WarehouseWork warehouseWork) {
        try {
            warehouseWorkRepository
                    .findById(warehouseWork.getId())
                    .ifPresent(warehouse1 -> warehouse1.setDataFinish(warehouseWork.getDataFinish()));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }


    public Map<Long, List<WarehouseWork>> getSelectWarehouseWork() {


        List<WarehouseWork> warehouseWorks = warehouseWorkRepository.findAllOpen(1);

        return resultWarehouseWork(warehouseWorks);

    }

    private Map<Long, List<WarehouseWork>> resultWarehouseWork(List<WarehouseWork> warehouseWorks) {
        Map<Long, List<WarehouseWork>> projectMap;

        projectMap = warehouseWorks.stream()
                .collect(Collectors.groupingBy(
                        WarehouseWork::getIdProject,
                        HashMap::new,
                        Collectors.toCollection(ArrayList::new)));


        return projectMap;
    }


    public void saveWork(Warehouse warehouse) {
        WarehouseWork saveWork = new WarehouseWork();

        saveWork.setIdProject(warehouse.getIdProject());
        saveWork.setIdModule(warehouse.getIdModule());
        saveWork.setIdElement(warehouse.getIdElement());
        saveWork.setNumber(warehouse.getNumber());
        saveWork.setDataStart(warehouse.getDataStart());
        saveWork.setDataFinish(Date.valueOf(LocalDate.now()));
        saveWork.setHeidenhain("magazyn");
        saveWork.setLathe("magazyn");
        saveWork.setBacaFanuc("magazyn");
        saveWork.setMillingMachineSmall("magazyn");
        saveWork.setFanucTime(0);
        saveWork.setHeidenhainTime(0);
        saveWork.setLatheTime(0);
        saveWork.setSmallTime(0);
        saveWork.setWarehouseOpen(1);

        warehouseWorkRepository.save(saveWork);
    }

    public void changeMachine(ChangeWorkMachine changeWorkMachine) {
        int statusDetailed = 1;

        if (changeWorkMachine.getBacaFanuc().equals("gotowa")
                && changeWorkMachine.getLathe().equals("gotowa")
                && changeWorkMachine.getMillingMachineSmall().equals("gotowa")
                && changeWorkMachine.getHeidenhain().equals("gotowa")) {
            statusDetailed = 2;
            warehouseService.editWarehouseName(changeWorkMachine.getIdProject(), changeWorkMachine.getIdElement());

        }
        warehouseWorkRepository.update(
                changeWorkMachine.getLatheTime(),
                changeWorkMachine.getFanucTime(),
                changeWorkMachine.getHeidenhainTime(),
                changeWorkMachine.getSmallTime(),
                changeWorkMachine.getBacaFanuc(),
                changeWorkMachine.getHeidenhain(),
                changeWorkMachine.getLathe(),
                changeWorkMachine.getMillingMachineSmall(),
                statusDetailed, changeWorkMachine.getId()
        );

    }

    public List<WarehouseWork> getAll() {
        return warehouseWorkRepository.findAll();
    }


    public HashMap<Date, ArrayList<WarehouseWork>> getTimeMachine() {
        List<WarehouseWork> timeMachineOfData = warehouseWorkRepository.sortTimeMachineOfData(1);


        return timeMachineOfData.stream()
                .collect(Collectors.groupingBy(
                        WarehouseWork::getDataFinish,
                        HashMap::new, Collectors.toCollection(ArrayList::new))
                );
    }


}
