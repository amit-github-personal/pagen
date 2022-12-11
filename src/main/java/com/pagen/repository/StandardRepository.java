package com.pagen.repository;

import com.pagen.domain.Standard;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Standard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StandardRepository extends JpaRepository<Standard, Long> {}
