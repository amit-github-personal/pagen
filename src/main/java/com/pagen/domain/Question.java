package com.pagen.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Question Representation.\n@author Amit Mishra\n@since 1.0
 */
@Schema(description = "Question Representation.\n@author Amit Mishra\n@since 1.0")
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, length = 50000)
    private String name;

    @Column(name = "archived")
    private Boolean archived;

    @JsonIgnoreProperties(value = { "question" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = false)
    private QuestionType questionType;

    @ManyToOne
    @JsonIgnoreProperties(value = { "questions" }, allowSetters = true)
    private Standard standard;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Question id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Question name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getArchived() {
        return this.archived;
    }

    public Question archived(Boolean archived) {
        this.setArchived(archived);
        return this;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public QuestionType getQuestionType() {
        return this.questionType;
    }

    public void setQuestionType(QuestionType questionType) {
        this.questionType = questionType;
    }

    public Question questionType(QuestionType questionType) {
        this.setQuestionType(questionType);
        return this;
    }

    public Standard getStandard() {
        return this.standard;
    }

    public void setStandard(Standard standard) {
        this.standard = standard;
    }

    public Question standard(Standard standard) {
        this.setStandard(standard);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", archived='" + getArchived() + "'" +
            "}";
    }
}
