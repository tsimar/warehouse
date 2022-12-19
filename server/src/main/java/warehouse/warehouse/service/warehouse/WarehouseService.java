package warehouse.warehouse.service.warehouse;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.add.Position;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.repository.warehouse.WarehouseRepository;

import java.util.Collection;
import java.util.List;

@Service
public class WarehouseService {
    private final WarehouseRepository warehouseRepository;


    public WarehouseService(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    public Warehouse save(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public void delete(Long id) {
        warehouseRepository.deleteById(id);
    }

    @Transactional
    public void edit(Warehouse warehouse) {
        try {
            warehouseRepository
                    .findById(warehouse.getId())
                    .ifPresent(warehouse1 -> {
                        warehouse1.setIdProject(warehouse.getIdProject());
                        warehouse1.setIdElement(warehouse.getIdElement());
                        warehouse1.setNumber(warehouse.getNumber());
                        warehouse1.setDataStart(warehouse.getDataStart());
                        warehouse1.setIdUser(warehouse.getIdUser());
                        warehouse1.setWarehouseName(warehouse.getWarehouseName());
                    });
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }



    public Collection<Warehouse> getTypeWarehouse(String warehouseName) {
        return warehouseRepository.getWarehouse(warehouseName);
    }


    public List<Warehouse> getAll() {
        return warehouseRepository.findAll();
    }
}
