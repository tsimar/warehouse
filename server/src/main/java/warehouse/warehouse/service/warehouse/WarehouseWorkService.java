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
import java.util.List;

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

    public List<WarehouseWork> getSelectWarehouseWork() {

        List<Warehouse> warehouses = warehouseService.getWarehouseByName();
        List<WarehouseWork> warehouseWorks = warehouseWorkRepository.findAllOpen(1);
        List<WarehouseWork> result = resultWarehouseWork(warehouses, warehouseWorks);

        return result;
    }

    private List<WarehouseWork> resultWarehouseWork(List<Warehouse> warehouses, List<WarehouseWork> warehouseWorks) {
        List<WarehouseWork> workList = new ArrayList<>();

        Long idNew = 3L;


        for (Warehouse item : warehouses) {
            WarehouseWork saveWork = new WarehouseWork();
            int k = 0;
            for (WarehouseWork itemWork : warehouseWorks) {
                WarehouseWork work = new WarehouseWork();
                if (itemWork.getIdProject().equals(item.getIdProject()) && itemWork.getIdElement().equals(item.getIdElement())) {
                    k++;
                    work.setId(itemWork.getId());
                    work.setIdProject(itemWork.getIdProject());
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
                }
            }
            if (k == 0) {

                saveWork.setIdProject(item.getIdProject());
                saveWork.setIdElement(item.getIdElement());
                saveWork.setNumber(item.getNumber());
                saveWork.setDataStart(item.getDataStart());
                saveWork.setDataFinish(Date.valueOf(LocalDate.now()));
                saveWork.setHeidenhain("magazyn");
                saveWork.setLathe("magazyn");
                saveWork.setBacaFanuc("magazyn");
                saveWork.setMillingMachineSmall("magazyn");
                saveWork.setWarehouseOpen(1);
                workList.add(saveWork);


            }
            idNew++;
        }

        return workList;
    }


    public void saveWork(Warehouse warehouse) {
        WarehouseWork saveWork = new WarehouseWork();

        saveWork.setIdProject(warehouse.getIdProject());
        saveWork.setIdElement(warehouse.getIdElement());
        saveWork.setNumber(warehouse.getNumber());
        saveWork.setDataStart(warehouse.getDataStart());
        saveWork.setDataFinish(Date.valueOf(LocalDate.now()));
        saveWork.setHeidenhain("magazyn");
        saveWork.setLathe("magazyn");
        saveWork.setBacaFanuc("magazyn");
        saveWork.setMillingMachineSmall("magazyn");
        saveWork.setTimeFanuc(0);
        saveWork.setTimeHeidenhain(0);
        saveWork.setTimeLathe(0);
        saveWork.setTimeSmall(0);
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
                changeWorkMachine.getBacaFanuc(),
                changeWorkMachine.getHeidenhain(),
                changeWorkMachine.getLathe(),
                changeWorkMachine.getMillingMachineSmall(),
                statusDetailed, changeWorkMachine.getId()
        );

    }

    public List<WarehouseWork> getAll() {
        return  warehouseWorkRepository.findAll();
    }
}
