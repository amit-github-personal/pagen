package com.pagen.repository;

import com.pagen.domain.QuestionType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA repository for the QuestionType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionTypeRepository extends JpaRepository<QuestionType, Long> {

    Optional<QuestionType> findByMarks(int marks);

    Optional<QuestionType> findByType(String type);
}
