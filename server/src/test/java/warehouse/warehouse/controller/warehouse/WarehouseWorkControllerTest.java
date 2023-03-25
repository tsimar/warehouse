package warehouse.warehouse.controller.warehouse;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import warehouse.warehouse.service.warehouse.WarehouseWorkService;


@WebMvcTest(controllers = WarehouseWorkController.class)
@AutoConfigureMockMvc(addFilters=false)
@ExtendWith(MockitoExtension.class)
class WarehouseWorkControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private WarehouseWorkService warehouseWorkService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getSelectOpen() {
    }

    @Test
    void getAll() {
    }

    @Test
    void changeMachine() {
    }

    @Test
    void edit() {
    }
}