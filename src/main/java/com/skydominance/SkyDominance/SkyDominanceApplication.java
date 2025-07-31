package com.skydominance.SkyDominance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.annotations.OpenAPI30;

@SpringBootApplication(scanBasePackages = {"com.skydominance.SkyDominance", "Controller", "Service", "Repository", "Entity","Response","Exception"})
@EnableJpaRepositories(basePackages = "Repository")
@EntityScan(basePackages = "Entity")
public class SkyDominanceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkyDominanceApplication.class, args);
	}
	@Bean
    public OpenAPI op() {
    	return new OpenAPI();
    }
}
