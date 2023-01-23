package com.pagen.repository;

import com.pagen.domain.MultipleChoice;
import java.util.List;
import java.util.Optional;

import com.pagen.domain.Question;
import com.pagen.domain.QuestionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the MultipleChoice entity.
 *
 * When extending this class, extend MultipleChoiceRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface MultipleChoiceRepository extends MultipleChoiceRepositoryWithBagRelationships, JpaRepository<MultipleChoice, Long> {
    default Optional<MultipleChoice> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<MultipleChoice> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<MultipleChoice> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
