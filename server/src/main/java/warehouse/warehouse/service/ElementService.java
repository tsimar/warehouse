package warehouse.warehouse.service;


import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.addBD.Element;
import warehouse.warehouse.repository.ElementRepository;

import java.util.List;


@Service
public class ElementService {
    private final ElementRepository elementRepository;


    public ElementService(ElementRepository elementRepository) {

        this.elementRepository = elementRepository;
    }

    public List<Element> getAll() {
        return elementRepository.findAll();
    }
}
