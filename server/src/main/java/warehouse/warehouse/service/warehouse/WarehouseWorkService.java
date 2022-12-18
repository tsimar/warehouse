package warehouse.warehouse.service.warehouse;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.entity.warehouse.WarehouseWork;
import warehouse.warehouse.repository.warehouse.WarehouseRepository;
import warehouse.warehouse.repository.warehouse.WarehouseWorkRepository;

import java.util.List;

@Service
public class WarehouseWorkService {
    private final WarehouseWorkRepository warehouseWorkRepository;


    public WarehouseWorkService(WarehouseWorkRepository warehouseWorkRepository) {
        this.warehouseWorkRepository = warehouseWorkRepository;
    }

    public List<WarehouseWork> getAll(){
        return warehouseWorkRepository.findAll();
    }

    public WarehouseWork save(WarehouseWork warehouseWork) {
        return warehouseWorkRepository.save(warehouseWork);
    }

    public void delete(Long id) {
        warehouseWorkRepository.deleteById(id);
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


}
