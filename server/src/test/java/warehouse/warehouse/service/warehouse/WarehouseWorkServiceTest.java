package warehouse.warehouse.service.warehouse;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import warehouse.warehouse.entity.warehouse.Warehouse;
import warehouse.warehouse.entity.warehouse.WarehouseWork;
import warehouse.warehouse.repository.warehouse.WarehouseWorkRepository;

import java.util.List;

import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)

@DataJpaTest
class WarehouseWorkServiceTest {
@BeforeAll
static void  beforeAll(){
    System.out.println("before All");

}
    @InjectMocks
    private WarehouseService warehouseService;

    @Mock
    WarehouseWorkRepository warehouseWorkRepository;


    @Test
    void getAll() throws Exception {
//       when(warehouseWorkRepository.findAll().thenReturn(List.of(new WarehouseWork(),new WarehouseWork()))) List<WarehouseWork> result=warehouseWorkRepository.findAll();
//        () -> assertThat(warehouseService.getAll())
    }

    private void assertThat() {
    }

//    @Test
//    @DisplayName("save element warehouse with frontend")
//    void save() throws Exception {
////given
////Warehouse expected=n;
//        //when
////var result= warehouseWorkRepository.save(new WarehouseWork());
//        //then
////        Assertions.assertArrayEquals(expected,result);
//    }

    @Test
    void delete() {
    }

    @Test
    void edit() {
    }

    @Test
    void getSelectWarehouseWork() {
    }

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }
}