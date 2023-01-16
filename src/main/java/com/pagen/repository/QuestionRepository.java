package com.pagen.repository;

import com.pagen.domain.Question;
import com.pagen.domain.QuestionType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Question entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query(value = "SELECT * FROM question WHERE question_type_id = :questionType ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomByQuestionType(@Param("questionType") QuestionType questionType, @Param("limit") int limit);
}
