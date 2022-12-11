package com.pagen.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pagen.IntegrationTest;
import com.pagen.domain.Standard;
import com.pagen.repository.StandardRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link StandardResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StandardResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/standards";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StandardRepository standardRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStandardMockMvc;

    private Standard standard;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Standard createEntity(EntityManager em) {
        Standard standard = new Standard().name(DEFAULT_NAME);
        return standard;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Standard createUpdatedEntity(EntityManager em) {
        Standard standard = new Standard().name(UPDATED_NAME);
        return standard;
    }

    @BeforeEach
    public void initTest() {
        standard = createEntity(em);
    }

    @Test
    @Transactional
    void createStandard() throws Exception {
        int databaseSizeBeforeCreate = standardRepository.findAll().size();
        // Create the Standard
        restStandardMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(standard)))
            .andExpect(status().isCreated());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeCreate + 1);
        Standard testStandard = standardList.get(standardList.size() - 1);
        assertThat(testStandard.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createStandardWithExistingId() throws Exception {
        // Create the Standard with an existing ID
        standard.setId(1L);

        int databaseSizeBeforeCreate = standardRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStandardMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(standard)))
            .andExpect(status().isBadRequest());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = standardRepository.findAll().size();
        // set the field null
        standard.setName(null);

        // Create the Standard, which fails.

        restStandardMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(standard)))
            .andExpect(status().isBadRequest());

        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllStandards() throws Exception {
        // Initialize the database
        standardRepository.saveAndFlush(standard);

        // Get all the standardList
        restStandardMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(standard.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getStandard() throws Exception {
        // Initialize the database
        standardRepository.saveAndFlush(standard);

        // Get the standard
        restStandardMockMvc
            .perform(get(ENTITY_API_URL_ID, standard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(standard.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingStandard() throws Exception {
        // Get the standard
        restStandardMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingStandard() throws Exception {
        // Initialize the database
        standardRepository.saveAndFlush(standard);

        int databaseSizeBeforeUpdate = standardRepository.findAll().size();

        // Update the standard
        Standard updatedStandard = standardRepository.findById(standard.getId()).get();
        // Disconnect from session so that the updates on updatedStandard are not directly saved in db
        em.detach(updatedStandard);
        updatedStandard.name(UPDATED_NAME);

        restStandardMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedStandard.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedStandard))
            )
            .andExpect(status().isOk());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeUpdate);
        Standard testStandard = standardList.get(standardList.size() - 1);
        assertThat(testStandard.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingStandard() throws Exception {
        int databaseSizeBeforeUpdate = standardRepository.findAll().size();
        standard.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStandardMockMvc
            .perform(
                put(ENTITY_API_URL_ID, standard.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(standard))
            )
            .andExpect(status().isBadRequest());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStandard() throws Exception {
        int databaseSizeBeforeUpdate = standardRepository.findAll().size();
        standard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStandardMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(standard))
            )
            .andExpect(status().isBadRequest());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStandard() throws Exception {
        int databaseSizeBeforeUpdate = standardRepository.findAll().size();
        standard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStandardMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(standard)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStandardWithPatch() throws Exception {
        // Initialize the database
        standardRepository.saveAndFlush(standard);

        int databaseSizeBeforeUpdate = standardRepository.findAll().size();

        // Update the standard using partial update
        Standard partialUpdatedStandard = new Standard();
        partialUpdatedStandard.setId(standard.getId());

        partialUpdatedStandard.name(UPDATED_NAME);

        restStandardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStandard.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStandard))
            )
            .andExpect(status().isOk());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeUpdate);
        Standard testStandard = standardList.get(standardList.size() - 1);
        assertThat(testStandard.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void fullUpdateStandardWithPatch() throws Exception {
        // Initialize the database
        standardRepository.saveAndFlush(standard);

        int databaseSizeBeforeUpdate = standardRepository.findAll().size();

        // Update the standard using partial update
        Standard partialUpdatedStandard = new Standard();
        partialUpdatedStandard.setId(standard.getId());

        partialUpdatedStandard.name(UPDATED_NAME);

        restStandardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStandard.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStandard))
            )
            .andExpect(status().isOk());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeUpdate);
        Standard testStandard = standardList.get(standardList.size() - 1);
        assertThat(testStandard.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingStandard() throws Exception {
        int databaseSizeBeforeUpdate = standardRepository.findAll().size();
        standard.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStandardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, standard.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(standard))
            )
            .andExpect(status().isBadRequest());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStandard() throws Exception {
        int databaseSizeBeforeUpdate = standardRepository.findAll().size();
        standard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStandardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(standard))
            )
            .andExpect(status().isBadRequest());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStandard() throws Exception {
        int databaseSizeBeforeUpdate = standardRepository.findAll().size();
        standard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStandardMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(standard)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Standard in the database
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStandard() throws Exception {
        // Initialize the database
        standardRepository.saveAndFlush(standard);

        int databaseSizeBeforeDelete = standardRepository.findAll().size();

        // Delete the standard
        restStandardMockMvc
            .perform(delete(ENTITY_API_URL_ID, standard.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Standard> standardList = standardRepository.findAll();
        assertThat(standardList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
