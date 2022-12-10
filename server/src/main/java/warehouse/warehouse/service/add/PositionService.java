package warehouse.warehouse.service.add;


import org.springframework.stereotype.Service;
import warehouse.warehouse.entity.add.Position;
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

    public Long getPositionId (String namePosition){
        Long id=0L;
        List <Position> positions=positionRepository.select(namePosition);
//        id=positions.id;
        System.out.println(positions);
        return id;
    }

    public Position save(Position position) {
        return positionRepository.save(position);
    }


    public void deletePosition(Long id) {
        positionRepository.deleteById(id);
    }

    public void editPosition(Position position) {
        try {
            positionRepository.update
                    (

                            position.getPosition(),
                            position.getPermission(),
                            position.getId()
                    );
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
