package com.pagen.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pagen.IntegrationTest;
import com.pagen.domain.QuestionType;
import com.pagen.repository.QuestionTypeRepository;
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
 * Integration tests for the {@link QuestionTypeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class QuestionTypeResourceIT {

    private static final Integer DEFAULT_MARKS = 1;
    private static final Integer UPDATED_MARKS = 2;

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ARCHIVED = false;
    private static final Boolean UPDATED_ARCHIVED = true;

    private static final String ENTITY_API_URL = "/api/question-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private QuestionTypeRepository questionTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restQuestionTypeMockMvc;

    private QuestionType questionType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionType createEntity(EntityManager em) {
        QuestionType questionType = new QuestionType().marks(DEFAULT_MARKS).type(DEFAULT_TYPE).archived(DEFAULT_ARCHIVED);
        return questionType;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuestionType createUpdatedEntity(EntityManager em) {
        QuestionType questionType = new QuestionType().marks(UPDATED_MARKS).type(UPDATED_TYPE).archived(UPDATED_ARCHIVED);
        return questionType;
    }

    @BeforeEach
    public void initTest() {
        questionType = createEntity(em);
    }

    @Test
    @Transactional
    void createQuestionType() throws Exception {
        int databaseSizeBeforeCreate = questionTypeRepository.findAll().size();
        // Create the QuestionType
        restQuestionTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(questionType)))
            .andExpect(status().isCreated());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeCreate + 1);
        QuestionType testQuestionType = questionTypeList.get(questionTypeList.size() - 1);
        assertThat(testQuestionType.getMarks()).isEqualTo(DEFAULT_MARKS);
        assertThat(testQuestionType.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testQuestionType.getArchived()).isEqualTo(DEFAULT_ARCHIVED);
    }

    @Test
    @Transactional
    void createQuestionTypeWithExistingId() throws Exception {
        // Create the QuestionType with an existing ID
        questionType.setId(1L);

        int databaseSizeBeforeCreate = questionTypeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestionTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(questionType)))
            .andExpect(status().isBadRequest());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkMarksIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionTypeRepository.findAll().size();
        // set the field null
        questionType.setMarks(null);

        // Create the QuestionType, which fails.

        restQuestionTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(questionType)))
            .andExpect(status().isBadRequest());

        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionTypeRepository.findAll().size();
        // set the field null
        questionType.setType(null);

        // Create the QuestionType, which fails.

        restQuestionTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(questionType)))
            .andExpect(status().isBadRequest());

        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllQuestionTypes() throws Exception {
        // Initialize the database
        questionTypeRepository.saveAndFlush(questionType);

        // Get all the questionTypeList
        restQuestionTypeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(questionType.getId().intValue())))
            .andExpect(jsonPath("$.[*].marks").value(hasItem(DEFAULT_MARKS)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].archived").value(hasItem(DEFAULT_ARCHIVED.booleanValue())));
    }

    @Test
    @Transactional
    void getQuestionType() throws Exception {
        // Initialize the database
        questionTypeRepository.saveAndFlush(questionType);

        // Get the questionType
        restQuestionTypeMockMvc
            .perform(get(ENTITY_API_URL_ID, questionType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(questionType.getId().intValue()))
            .andExpect(jsonPath("$.marks").value(DEFAULT_MARKS))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.archived").value(DEFAULT_ARCHIVED.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingQuestionType() throws Exception {
        // Get the questionType
        restQuestionTypeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingQuestionType() throws Exception {
        // Initialize the database
        questionTypeRepository.saveAndFlush(questionType);

        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();

        // Update the questionType
        QuestionType updatedQuestionType = questionTypeRepository.findById(questionType.getId()).get();
        // Disconnect from session so that the updates on updatedQuestionType are not directly saved in db
        em.detach(updatedQuestionType);
        updatedQuestionType.marks(UPDATED_MARKS).type(UPDATED_TYPE).archived(UPDATED_ARCHIVED);

        restQuestionTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedQuestionType.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedQuestionType))
            )
            .andExpect(status().isOk());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
        QuestionType testQuestionType = questionTypeList.get(questionTypeList.size() - 1);
        assertThat(testQuestionType.getMarks()).isEqualTo(UPDATED_MARKS);
        assertThat(testQuestionType.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testQuestionType.getArchived()).isEqualTo(UPDATED_ARCHIVED);
    }

    @Test
    @Transactional
    void putNonExistingQuestionType() throws Exception {
        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();
        questionType.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, questionType.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(questionType))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchQuestionType() throws Exception {
        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();
        questionType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(questionType))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamQuestionType() throws Exception {
        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();
        questionType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionTypeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(questionType)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateQuestionTypeWithPatch() throws Exception {
        // Initialize the database
        questionTypeRepository.saveAndFlush(questionType);

        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();

        // Update the questionType using partial update
        QuestionType partialUpdatedQuestionType = new QuestionType();
        partialUpdatedQuestionType.setId(questionType.getId());

        partialUpdatedQuestionType.type(UPDATED_TYPE).archived(UPDATED_ARCHIVED);

        restQuestionTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuestionType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedQuestionType))
            )
            .andExpect(status().isOk());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
        QuestionType testQuestionType = questionTypeList.get(questionTypeList.size() - 1);
        assertThat(testQuestionType.getMarks()).isEqualTo(DEFAULT_MARKS);
        assertThat(testQuestionType.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testQuestionType.getArchived()).isEqualTo(UPDATED_ARCHIVED);
    }

    @Test
    @Transactional
    void fullUpdateQuestionTypeWithPatch() throws Exception {
        // Initialize the database
        questionTypeRepository.saveAndFlush(questionType);

        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();

        // Update the questionType using partial update
        QuestionType partialUpdatedQuestionType = new QuestionType();
        partialUpdatedQuestionType.setId(questionType.getId());

        partialUpdatedQuestionType.marks(UPDATED_MARKS).type(UPDATED_TYPE).archived(UPDATED_ARCHIVED);

        restQuestionTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuestionType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedQuestionType))
            )
            .andExpect(status().isOk());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
        QuestionType testQuestionType = questionTypeList.get(questionTypeList.size() - 1);
        assertThat(testQuestionType.getMarks()).isEqualTo(UPDATED_MARKS);
        assertThat(testQuestionType.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testQuestionType.getArchived()).isEqualTo(UPDATED_ARCHIVED);
    }

    @Test
    @Transactional
    void patchNonExistingQuestionType() throws Exception {
        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();
        questionType.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuestionTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, questionType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(questionType))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchQuestionType() throws Exception {
        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();
        questionType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(questionType))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamQuestionType() throws Exception {
        int databaseSizeBeforeUpdate = questionTypeRepository.findAll().size();
        questionType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuestionTypeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(questionType))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuestionType in the database
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteQuestionType() throws Exception {
        // Initialize the database
        questionTypeRepository.saveAndFlush(questionType);

        int databaseSizeBeforeDelete = questionTypeRepository.findAll().size();

        // Delete the questionType
        restQuestionTypeMockMvc
            .perform(delete(ENTITY_API_URL_ID, questionType.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QuestionType> questionTypeList = questionTypeRepository.findAll();
        assertThat(questionTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
