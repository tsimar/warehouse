package warehouse.warehouse.service.warehouse;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import warehouse.warehouse.DTO.ChangeWorkMachine;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.entity.warehouse.WarehouseWork;
import warehouse.warehouse.repository.warehouse.WarehouseWorkRepository;

import java.sql.Date;
import java.sql.Time;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
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
                    .ifPresent(warehouse1 -> {

                        warehouse1.setDataFinish(warehouseWork.getDataFinish());

                    });
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public Map<Long, List<WarehouseWork>> getSelectWarehouseWork() {

        List<Warehouse> warehouses = warehouseService.getWarehouseByName();
        List<WarehouseWork> warehouseWorks = warehouseWorkRepository.findAllOpen(1);
        Map<Long, List<WarehouseWork>> result = resultWarehouseWork(warehouses, warehouseWorks);

        return result;
    }

    private Map<Long, List<WarehouseWork>> resultWarehouseWork(List<Warehouse> warehouses, List<WarehouseWork> warehouseWorks) {
        List<WarehouseWork> workList = new ArrayList<>();
        Map<Long, List<WarehouseWork>> projectMap = new TreeMap<>();
        Long idNew = 3L;


        for (Warehouse item : warehouses) {
            WarehouseWork saveWork = new WarehouseWork();
            int k = 0;
            for (WarehouseWork itemWork : warehouseWorks) {
                WarehouseWork work = new WarehouseWork();
                if (itemWork.getIdProject().equals(item.getIdProject()) && itemWork.getIdElement().equals(item.getIdElement())) {
//                    k++;
                    work.setId(itemWork.getId());
                    work.setIdProject(itemWork.getIdProject());
                    work.setIdModule(itemWork.getIdModule());
                    work.setIdElement(itemWork.getIdElement());
                    work.setNumber(itemWork.getNumber());
                    work.setDataStart(itemWork.getDataStart());
                    work.setDataFinish(itemWork.getDataFinish());
                    work.setHeidenhain(itemWork.getHeidenhain());
                    work.setLathe(itemWork.getLathe());
                    work.setBacaFanuc(itemWork.getBacaFanuc());
                    work.setMillingMachineSmall(itemWork.getMillingMachineSmall());
                    work.setWarehouseOpen(itemWork.getWarehouseOpen());
                    workList.add(work);

                } else {
                    saveWork.setIdProject(itemWork.getId());
                    saveWork.setIdProject(itemWork.getIdProject());
                    saveWork.setIdModule(itemWork.getIdModule());
                    saveWork.setIdElement(itemWork.getIdElement());
                    saveWork.setNumber(itemWork.getNumber());
                    saveWork.setDataStart(itemWork.getDataStart());
                    saveWork.setDataFinish(Date.valueOf(LocalDate.now()));
                    saveWork.setHeidenhain("magazyn");
                    saveWork.setLathe("magazyn");
                    saveWork.setBacaFanuc("magazyn");
                    saveWork.setMillingMachineSmall("magazyn");
                    saveWork.setWarehouseOpen(1);
                    workList.add(saveWork);


                }
            }
            idNew++;
        }

        for (WarehouseWork item : workList) {
            projectMap.put(item.getIdProject(), workList.stream()
                    .filter(id -> Objects.equals(id.getIdProject(), item.getIdProject()))
                    .collect(Collectors.toList()));
        }

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

    public  Map<Date,List<WarehouseWork>> getTimeMachine() {
        List<WarehouseWork> warehouseWorks = new ArrayList<>(warehouseWorkRepository.findAll());
        Map<Date,List<WarehouseWork>> keyDateFinishMap=new TreeMap<>();
        warehouseWorks.stream().sorted(Comparator.comparing(WarehouseWork::getDataFinish)
                        .thenComparing(WarehouseWork::getIdProject)
                        .thenComparing(WarehouseWork::getIdModule)
                        .thenComparing(WarehouseWork::getId))
                .collect(Collectors.toList());

        for (WarehouseWork item:warehouseWorks) {
            keyDateFinishMap.put(item.getDataFinish(),warehouseWorks.stream()
                    .filter(date->Objects.equals(date.getDataFinish(),item.getDataFinish()))
                    .collect(Collectors.toList()));
        }
        return keyDateFinishMap;
    }
}
