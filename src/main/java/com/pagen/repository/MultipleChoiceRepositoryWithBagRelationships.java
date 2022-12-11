package com.pagen.repository;

import com.pagen.domain.MultipleChoice;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface MultipleChoiceRepositoryWithBagRelationships {
    Optional<MultipleChoice> fetchBagRelationships(Optional<MultipleChoice> multipleChoice);

    List<MultipleChoice> fetchBagRelationships(List<MultipleChoice> multipleChoices);

    Page<MultipleChoice> fetchBagRelationships(Page<MultipleChoice> multipleChoices);
}
