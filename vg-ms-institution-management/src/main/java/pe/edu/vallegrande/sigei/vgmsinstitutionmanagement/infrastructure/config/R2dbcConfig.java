package pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.r2dbc.config.EnableR2dbcAuditing;
import org.springframework.data.r2dbc.convert.R2dbcCustomConversions;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableR2dbcAuditing
@EnableR2dbcRepositories(basePackages = "pe.edu.vallegrande.sigei.vgmsinstitutionmanagement.infrastructure.persistence")
public class R2dbcConfig {

    @Bean
    public R2dbcCustomConversions r2dbcCustomConversions() {
        List<Converter<?, ?>> converters = new ArrayList<>();
        return R2dbcCustomConversions.of(
                org.springframework.data.r2dbc.dialect.PostgresDialect.INSTANCE,
                converters
        );
    }
}
