package warehouse.warehouse.service.warehouse;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.entity.warehouse.WarehouseWork;
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


    public List<Warehouse> getWarehouseByName() {
        List<Warehouse> warehouseIn = warehouseRepository.getIn("in");
        List<Warehouse> warehouseOut = warehouseRepository.getOut("out");


        List<Warehouse> warehouseJoin =warehouseJoin(warehouseIn,warehouseOut);

        return warehouseJoin;
    }

    private List<Warehouse> warehouseJoin(List<Warehouse> warehouseIn, List<Warehouse> warehouseOut) {
       List<Warehouse> resultSelectWarehouse= new ArrayList<>();

        for (Warehouse itemIn: warehouseIn) {
            Warehouse warehouse=new Warehouse();
            int k=0;
            for (Warehouse itemOut:warehouseOut) {

                if (itemIn.getIdProject()== itemOut.getIdProject() && itemOut.getIdElement()== itemIn.getIdElement()){
                  k+= itemOut.getNumber();
                }
            }


                warehouse.setIdProject(itemIn.getIdProject());
                warehouse.setIdElement(itemIn.getIdElement());
                warehouse.setNumber(itemIn.getNumber()-k);
                warehouse.setDataStart(itemIn.getDataStart());

            resultSelectWarehouse.add(warehouse);
        }
        return resultSelectWarehouse;
    }

}
