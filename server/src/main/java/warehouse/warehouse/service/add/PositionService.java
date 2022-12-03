package warehouse.warehouse.service.add;


import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.addBD.Position;
import warehouse.warehouse.repository.add.PositionRepository;

import java.util.List;

@Service
public class PositionService {
    private final PositionRepository positionRepository;


    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    public List<Position> getAll() {
        return positionRepository.findAll();
    }

    public Position save(Position position){
        return positionRepository.save(position);
    }
}
