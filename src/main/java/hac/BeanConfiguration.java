package hac;

import hac.repo.CartItem;
import hac.repo.Purchase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {


    @Bean
    public Purchase purchase() {
        return new Purchase();
    }
}
