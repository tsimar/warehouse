package warehouse.warehouse.service.warehouse;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.repository.warehouse.WarehouseRepository;

import java.util.ArrayList;
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


    public List<Warehouse> getTypeWarehouse(String warehouseName) {
        return warehouseRepository.getWarehouse(warehouseName);
    }


    public List<Warehouse> getAll() {
        return warehouseRepository.findAll();
    }


    private List<Warehouse> summaElements(List<Warehouse> list) {
        List<Warehouse> totalElements = new ArrayList<>();
        List<Long> idElementList = new ArrayList<>();

        for (Warehouse item : list) {
            Warehouse warehouse = new Warehouse();
            int number = 0;

            for (Warehouse itemIterator : list) {
                if (item.getIdElement() == itemIterator.getIdElement()
                        &&item.getIdProject()== itemIterator.getIdProject()

                ) {
                    int select = 0;
                    for (Long id : idElementList) {
                        if (itemIterator.getIdElement() == id) {
                            select++;
                        }
                    }
                    if (select == 0) {
                        number += itemIterator.getNumber();
                    }

                }

            }
            idElementList.add(item.getIdProject());
            if (number > 0) {
                warehouse.setId(item.getId());
                warehouse.setDataStart(item.getDataStart());
                warehouse.setIdUser(item.getIdUser());
                warehouse.setIdProject(item.getIdProject());
                warehouse.setIdElement(item.getIdElement());
                warehouse.setNumber(number);
                warehouse.setWarehouseName(item.getWarehouseName());
                totalElements.add(warehouse);
            }

        }
        return totalElements;
    }

    public List<Warehouse> getWarehouseByName() {
        List<Warehouse> warehouseIn = summaElements(warehouseRepository.getIn("in"));
        List<Warehouse> warehouseOut = summaElements(warehouseRepository.getOut("out"));
        return warehouseJoin(warehouseIn, warehouseOut);
    }

    private List<Warehouse> warehouseJoin(List<Warehouse> warehouseIn, List<Warehouse> warehouseOut) {

        List<Warehouse> warehouseJoin = new ArrayList<>();
        for (Warehouse itemIn : warehouseIn) {
            Warehouse warehouse = new Warehouse();
            int numbers = itemIn.getNumber();
            for (Warehouse itemOut : warehouseOut) {
                if (itemIn.getIdElement() == itemOut.getIdElement()
                        && itemIn.getIdProject() == itemOut.getIdProject()) {

                    numbers -= itemOut.getNumber();
                }
            }
            warehouse.setId(itemIn.getId());
            warehouse.setIdProject(itemIn.getIdProject());
            warehouse.setIdElement(itemIn.getIdElement());
            warehouse.setNumber(numbers);
            warehouseJoin.add(warehouse);
        }


        return warehouseJoin;

    }

}
