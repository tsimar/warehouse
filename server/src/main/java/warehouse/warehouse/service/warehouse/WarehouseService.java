package warehouse.warehouse.service.warehouse;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.repository.warehouse.WarehouseRepository;
import warehouse.warehouse.repository.warehouse.WarehouseWorkRepository;

import java.util.*;
import java.util.stream.Collectors;


@Service
@Slf4j
@AllArgsConstructor

public class WarehouseService {

//    private static final Logger log= LoggerFactory.getLogger(WarehouseService.class);

    private final WarehouseWorkRepository warehouseWorkRepository;
    private final WarehouseRepository warehouseRepository;






    public Warehouse save(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public void delete(Long id) {
        warehouseRepository.deleteById(id);
    }

//    @Transactional
//    public void editProject(Warehouse warehouse) {
//        try {
//            var idProjectFirst = warehouseRepository
//                    .getIdProject(warehouse.getId());
//
//            warehouseRepository
//                    .updateProject(warehouse.getIdProject(), idProjectFirst);



//            warehouseRepository
//                    .findById(warehouse.getId())
//                    .ifPresent(warehouse1 -> {
//                        warehouse1.setIdProject(warehouse.getIdProject());
//                        warehouse1.setIdElement(warehouse.getIdElement());
//                        warehouse1.setNumber(warehouse.getNumber());
//                        warehouse1.setDataStart(warehouse.getDataStart());
//                        warehouse1.setIdUser(warehouse.getIdUser());
//                        warehouse1.setWarehouseName(warehouse.getWarehouseName());
//                    });
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//    }

//    @Transactional
//    public void editModule(Warehouse warehouse) {
//        try {
//            warehouseRepository
//                    .updateModule(warehouse.getIdProject(), warehouse.getIdModuleOfProject(), warehouse.getIdElementOfModule());
//
//
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//    }
//    @Transactional
//    public void editElement(Warehouse warehouse) {
//        try {
//         warehouseRepository
//                    .updateElement(warehouse.getId(),
//                            warehouse.getNumber(),
//                            warehouse.getDataStart(),
//                            warehouse.getIdElementOfModule());
//
//
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//    }

    public void editWarehouseName(Long idProject, Long idElement) {

        warehouseRepository.findAll()
                .stream()
                .filter(warehouse -> idProject == warehouse.getIdProject() && idElement == warehouse.getIdElementOfModule())
                .map(i -> {
                    i.setWarehouseName("out");
                    return i;
                })
                .forEach(warehouseRepository::save);


    }


    public Map<Long, List<Warehouse>> getTypeWarehouse(String warehouseName) {
        List<Warehouse> warehouses = warehouseRepository.getWarehouse(warehouseName);

        Map<Long, List<Warehouse>> projectMap = new TreeMap<>();

        for (Warehouse item : warehouses) {

            projectMap.put(item.getIdProject(), warehouses.stream()
                    .filter(id -> Objects.equals(id.getIdProject(), item.getIdProject()))
                    .collect(Collectors.toList()));
        }
        return projectMap;
    }


    public List<Warehouse> getAll() {
        List<Warehouse> warehouses = new ArrayList<Warehouse>(warehouseRepository.findAll());
        Map<Long, List<Warehouse>> warehouseMap = new TreeMap<>();
        for (Warehouse item : warehouses) {
            warehouseMap.put(item.getIdProject(), warehouses);
        }
        return null;
    }


    private List<Warehouse> summaElements(List<Warehouse> list) {
        List<Warehouse> totalElements = new ArrayList<>();
        List<Long> idProjectList = new ArrayList<>();
        List<Long> idModuleList = new ArrayList<>();

        for (Warehouse item : list) {
            Warehouse warehouse = new Warehouse();
            int number = 0;

            for (Warehouse itemIterator : list) {
                if (item.getIdElementOfModule() == itemIterator.getIdElementOfModule()
                        && item.getIdProject() == itemIterator.getIdProject()

                ) {
                    int selectIdProject = 0;
                    int selectIdModule = 0;
                    for (Long id : idProjectList) {
                        if (itemIterator.getIdProject() == id) {
                            selectIdProject++;
                        }
                    }
                    for (Long id : idModuleList) {
                        if (itemIterator.getIdModuleOfProject() == id) {
                            selectIdModule++;
                        }
                    }


                }

            }
            idProjectList.add(item.getIdProject());
            idModuleList.add(item.getIdModuleOfProject());


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

            for (Warehouse itemOut : warehouseOut) {
                if (itemIn.getIdElementOfModule() == itemOut.getIdElementOfModule()
                        && itemIn.getIdProject() == itemOut.getIdProject()) {


                }
            }
            warehouse.setId(itemIn.getId());
            warehouse.setIdProject(itemIn.getIdProject());
            warehouse.setIdModuleOfProject(itemIn.getIdModuleOfProject());
            warehouse.setIdElementOfModule(itemIn.getIdElementOfModule());
            warehouse.setDataStart(itemIn.getDataStart());

            warehouseJoin.add(warehouse);
        }


        return warehouseJoin;

    }


}
