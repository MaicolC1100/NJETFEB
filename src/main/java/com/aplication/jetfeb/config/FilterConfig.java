package com.aplication.jetfeb.config;

import com.aplication.jetfeb.filter.AuthenticationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    FilterRegistrationBean<AuthenticationFilter> authenticationFilter() {
        FilterRegistrationBean<AuthenticationFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new AuthenticationFilter());
        registrationBean.addUrlPatterns("/solicitud_vale.html"); // Añade más patrones si es necesario
        registrationBean.addUrlPatterns("/empleado.html"); // Añade más patrones si es necesario
        registrationBean.addUrlPatterns("/empleadocliente.html"); // Añade más patrones si es necesario
        registrationBean.addUrlPatterns("/tarifa.html"); // Añade más patrones si es necesario
        registrationBean.addUrlPatterns("/asignacion_vale.html"); // Añade más patrones si es necesario
        registrationBean.addUrlPatterns("/reportes.html"); // Añade más patrones si es necesario
        

        return registrationBean;
    }
}