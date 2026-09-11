package ai.aarogyam.api.config;

import java.time.Instant;
import java.util.Locale;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import ai.aarogyam.api.domain.Role;
import ai.aarogyam.api.domain.User;
import ai.aarogyam.api.repository.UserRepository;

@Component
public class AdminBootstrap implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String email;
    private final String password;
    private final String name;

    public AdminBootstrap(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${aarogyam.admin.email:}") String email,
            @Value("${aarogyam.admin.password:}") String password,
            @Value("${aarogyam.admin.name:System Administrator}") String name
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.email = email.trim().toLowerCase(Locale.ROOT);
        this.password = password;
        this.name = name.trim();
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (email.isBlank() || password.isBlank()) {
            return;
        }
        if (password.length() < 12) {
            throw new IllegalStateException("AAROGYAM_ADMIN_PASSWORD must be at least 12 characters.");
        }

        User admin = userRepository.findByEmailIgnoreCase(email).orElseGet(() -> {
            User user = new User();
            user.setId(UUID.randomUUID());
            user.setEmail(email);
            user.setCreatedAt(Instant.now());
            return user;
        });
        admin.setName(name.isBlank() ? "System Administrator" : name);
        admin.setPasswordHash(passwordEncoder.encode(password));
        admin.setRole(Role.ADMIN);
        admin.setEmailVerified(true);
        userRepository.save(admin);
    }
}
