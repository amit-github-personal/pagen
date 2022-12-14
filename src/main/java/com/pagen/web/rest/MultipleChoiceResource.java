package com.pagen.web.rest;

import com.pagen.domain.MultipleChoice;
import com.pagen.repository.MultipleChoiceRepository;
import com.pagen.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.pagen.domain.MultipleChoice}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MultipleChoiceResource {

    private final Logger log = LoggerFactory.getLogger(MultipleChoiceResource.class);

    private static final String ENTITY_NAME = "multipleChoice";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MultipleChoiceRepository multipleChoiceRepository;

    public MultipleChoiceResource(MultipleChoiceRepository multipleChoiceRepository) {
        this.multipleChoiceRepository = multipleChoiceRepository;
    }

    /**
     * {@code POST  /multiple-choices} : Create a new multipleChoice.
     *
     * @param multipleChoice the multipleChoice to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new multipleChoice, or with status {@code 400 (Bad Request)} if the multipleChoice has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/multiple-choices")
    public ResponseEntity<MultipleChoice> createMultipleChoice(@Valid @RequestBody MultipleChoice multipleChoice)
        throws URISyntaxException {
        log.debug("REST request to save MultipleChoice : {}", multipleChoice);
        if (multipleChoice.getId() != null) {
            throw new BadRequestAlertException("A new multipleChoice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MultipleChoice result = multipleChoiceRepository.save(multipleChoice);
        return ResponseEntity
            .created(new URI("/api/multiple-choices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /multiple-choices/:id} : Updates an existing multipleChoice.
     *
     * @param id the id of the multipleChoice to save.
     * @param multipleChoice the multipleChoice to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated multipleChoice,
     * or with status {@code 400 (Bad Request)} if the multipleChoice is not valid,
     * or with status {@code 500 (Internal Server Error)} if the multipleChoice couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/multiple-choices/{id}")
    public ResponseEntity<MultipleChoice> updateMultipleChoice(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MultipleChoice multipleChoice
    ) throws URISyntaxException {
        log.debug("REST request to update MultipleChoice : {}, {}", id, multipleChoice);
        if (multipleChoice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, multipleChoice.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!multipleChoiceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MultipleChoice result = multipleChoiceRepository.save(multipleChoice);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, multipleChoice.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /multiple-choices/:id} : Partial updates given fields of an existing multipleChoice, field will ignore if it is null
     *
     * @param id the id of the multipleChoice to save.
     * @param multipleChoice the multipleChoice to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated multipleChoice,
     * or with status {@code 400 (Bad Request)} if the multipleChoice is not valid,
     * or with status {@code 404 (Not Found)} if the multipleChoice is not found,
     * or with status {@code 500 (Internal Server Error)} if the multipleChoice couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/multiple-choices/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MultipleChoice> partialUpdateMultipleChoice(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MultipleChoice multipleChoice
    ) throws URISyntaxException {
        log.debug("REST request to partial update MultipleChoice partially : {}, {}", id, multipleChoice);
        if (multipleChoice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, multipleChoice.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!multipleChoiceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MultipleChoice> result = multipleChoiceRepository
            .findById(multipleChoice.getId())
            .map(existingMultipleChoice -> {
                if (multipleChoice.getName() != null) {
                    existingMultipleChoice.setName(multipleChoice.getName());
                }
                if (multipleChoice.getArchived() != null) {
                    existingMultipleChoice.setArchived(multipleChoice.getArchived());
                }

                return existingMultipleChoice;
            })
            .map(multipleChoiceRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, multipleChoice.getId().toString())
        );
    }

    /**
     * {@code GET  /multiple-choices} : get all the multipleChoices.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of multipleChoices in body.
     */
    @GetMapping("/multiple-choices")
    public List<MultipleChoice> getAllMultipleChoices(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all MultipleChoices");
        if (eagerload) {
            return multipleChoiceRepository.findAllWithEagerRelationships();
        } else {
            return multipleChoiceRepository.findAll();
        }
    }

    /**
     * {@code GET  /multiple-choices/:id} : get the "id" multipleChoice.
     *
     * @param id the id of the multipleChoice to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the multipleChoice, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/multiple-choices/{id}")
    public ResponseEntity<MultipleChoice> getMultipleChoice(@PathVariable Long id) {
        log.debug("REST request to get MultipleChoice : {}", id);
        Optional<MultipleChoice> multipleChoice = multipleChoiceRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(multipleChoice);
    }

    /**
     * {@code DELETE  /multiple-choices/:id} : delete the "id" multipleChoice.
     *
     * @param id the id of the multipleChoice to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/multiple-choices/{id}")
    public ResponseEntity<Void> deleteMultipleChoice(@PathVariable Long id) {
        log.debug("REST request to delete MultipleChoice : {}", id);
        multipleChoiceRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
