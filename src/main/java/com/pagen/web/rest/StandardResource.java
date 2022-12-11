package com.pagen.web.rest;

import com.pagen.domain.Standard;
import com.pagen.repository.StandardRepository;
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
 * REST controller for managing {@link com.pagen.domain.Standard}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StandardResource {

    private final Logger log = LoggerFactory.getLogger(StandardResource.class);

    private static final String ENTITY_NAME = "standard";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StandardRepository standardRepository;

    public StandardResource(StandardRepository standardRepository) {
        this.standardRepository = standardRepository;
    }

    /**
     * {@code POST  /standards} : Create a new standard.
     *
     * @param standard the standard to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new standard, or with status {@code 400 (Bad Request)} if the standard has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/standards")
    public ResponseEntity<Standard> createStandard(@Valid @RequestBody Standard standard) throws URISyntaxException {
        log.debug("REST request to save Standard : {}", standard);
        if (standard.getId() != null) {
            throw new BadRequestAlertException("A new standard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Standard result = standardRepository.save(standard);
        return ResponseEntity
            .created(new URI("/api/standards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /standards/:id} : Updates an existing standard.
     *
     * @param id the id of the standard to save.
     * @param standard the standard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated standard,
     * or with status {@code 400 (Bad Request)} if the standard is not valid,
     * or with status {@code 500 (Internal Server Error)} if the standard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/standards/{id}")
    public ResponseEntity<Standard> updateStandard(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Standard standard
    ) throws URISyntaxException {
        log.debug("REST request to update Standard : {}, {}", id, standard);
        if (standard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, standard.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!standardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Standard result = standardRepository.save(standard);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, standard.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /standards/:id} : Partial updates given fields of an existing standard, field will ignore if it is null
     *
     * @param id the id of the standard to save.
     * @param standard the standard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated standard,
     * or with status {@code 400 (Bad Request)} if the standard is not valid,
     * or with status {@code 404 (Not Found)} if the standard is not found,
     * or with status {@code 500 (Internal Server Error)} if the standard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/standards/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Standard> partialUpdateStandard(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Standard standard
    ) throws URISyntaxException {
        log.debug("REST request to partial update Standard partially : {}, {}", id, standard);
        if (standard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, standard.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!standardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Standard> result = standardRepository
            .findById(standard.getId())
            .map(existingStandard -> {
                if (standard.getName() != null) {
                    existingStandard.setName(standard.getName());
                }

                return existingStandard;
            })
            .map(standardRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, standard.getId().toString())
        );
    }

    /**
     * {@code GET  /standards} : get all the standards.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of standards in body.
     */
    @GetMapping("/standards")
    public List<Standard> getAllStandards() {
        log.debug("REST request to get all Standards");
        return standardRepository.findAll();
    }

    /**
     * {@code GET  /standards/:id} : get the "id" standard.
     *
     * @param id the id of the standard to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the standard, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/standards/{id}")
    public ResponseEntity<Standard> getStandard(@PathVariable Long id) {
        log.debug("REST request to get Standard : {}", id);
        Optional<Standard> standard = standardRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(standard);
    }

    /**
     * {@code DELETE  /standards/:id} : delete the "id" standard.
     *
     * @param id the id of the standard to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/standards/{id}")
    public ResponseEntity<Void> deleteStandard(@PathVariable Long id) {
        log.debug("REST request to delete Standard : {}", id);
        standardRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
