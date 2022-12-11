package com.pagen.repository;

import com.pagen.domain.MultipleChoice;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class MultipleChoiceRepositoryWithBagRelationshipsImpl implements MultipleChoiceRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<MultipleChoice> fetchBagRelationships(Optional<MultipleChoice> multipleChoice) {
        return multipleChoice.map(this::fetchOptions);
    }

    @Override
    public Page<MultipleChoice> fetchBagRelationships(Page<MultipleChoice> multipleChoices) {
        return new PageImpl<>(
            fetchBagRelationships(multipleChoices.getContent()),
            multipleChoices.getPageable(),
            multipleChoices.getTotalElements()
        );
    }

    @Override
    public List<MultipleChoice> fetchBagRelationships(List<MultipleChoice> multipleChoices) {
        return Optional.of(multipleChoices).map(this::fetchOptions).orElse(Collections.emptyList());
    }

    MultipleChoice fetchOptions(MultipleChoice result) {
        return entityManager
            .createQuery(
                "select multipleChoice from MultipleChoice multipleChoice left join fetch multipleChoice.options where multipleChoice is :multipleChoice",
                MultipleChoice.class
            )
            .setParameter("multipleChoice", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<MultipleChoice> fetchOptions(List<MultipleChoice> multipleChoices) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, multipleChoices.size()).forEach(index -> order.put(multipleChoices.get(index).getId(), index));
        List<MultipleChoice> result = entityManager
            .createQuery(
                "select distinct multipleChoice from MultipleChoice multipleChoice left join fetch multipleChoice.options where multipleChoice in :multipleChoices",
                MultipleChoice.class
            )
            .setParameter("multipleChoices", multipleChoices)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
