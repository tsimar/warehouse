package warehouse.warehouse.service.warehouse;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.repository.warehouse.WarehouseRepository;
import warehouse.warehouse.repository.warehouse.WarehouseWorkRepository;

import java.util.*;
import java.util.stream.Collectors;


@Service
@Slf4j
public class WarehouseService {

private final WarehouseWorkRepository warehouseWorkRepository;
    private final WarehouseRepository warehouseRepository;


    public WarehouseService(WarehouseWorkRepository warehouseWorkRepository, WarehouseRepository warehouseRepository) {
        this.warehouseWorkRepository = warehouseWorkRepository;
        this.warehouseRepository = warehouseRepository;
    }

    public Warehouse save(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public void delete(Long id) {
        warehouseRepository.deleteById(id);
    }

    @Transactional
    public void editProject(Warehouse warehouse) {
        try {
        var idProjectFirst=   warehouseRepository
                    .getIdProject(warehouse.getId());

            warehouseRepository
                    .updateProject(warehouse.getIdProject(),idProjectFirst);
            warehouseWorkRepository
                    .updateProject(warehouse.getIdProject(),idProjectFirst);
            
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
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }


    public void editWarehouseName(Long idProject, Long idElement) {

        warehouseRepository.findAll()
                .stream()
                .filter(warehouse -> idProject == warehouse.getIdProject() && idElement == warehouse.getIdElement())
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
//                    .sort(Comparator.comparing((a, b) -> a.getIdModule().compareTo(b.getIdModule()))
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
                if (item.getIdElement() == itemIterator.getIdElement()
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
                        if (itemIterator.getIdModule() == id) {
                            selectIdModule++;
                        }
                    }
                    if (selectIdModule == 0 || selectIdProject == 0) {
                        number += itemIterator.getNumber();
                    }

                }

            }
            idProjectList.add(item.getIdProject());
            idModuleList.add(item.getIdModule());
            if (number > 0) {
                warehouse.setId(item.getId());
                warehouse.setDataStart(item.getDataStart());
                warehouse.setIdUser(item.getIdUser());
                warehouse.setIdProject(item.getIdProject());
                warehouse.setIdModule(item.getIdModule());
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
            warehouse.setIdModule(itemIn.getIdModule());
            warehouse.setIdElement(itemIn.getIdElement());
            warehouse.setDataStart(itemIn.getDataStart());
            warehouse.setNumber(numbers);
            warehouseJoin.add(warehouse);
        }


        return warehouseJoin;

    }


}
