package com.pagen.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
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
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "archived")
    private Boolean archived;

    @JsonIgnoreProperties(value = { "question" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private QuestionType questionType;

    @OneToMany(mappedBy = "question")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "question" }, allowSetters = true)
    private Set<Standard> standards = new HashSet<>();

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

    public Set<Standard> getStandards() {
        return this.standards;
    }

    public void setStandards(Set<Standard> standards) {
        if (this.standards != null) {
            this.standards.forEach(i -> i.setQuestion(null));
        }
        if (standards != null) {
            standards.forEach(i -> i.setQuestion(this));
        }
        this.standards = standards;
    }

    public Question standards(Set<Standard> standards) {
        this.setStandards(standards);
        return this;
    }

    public Question addStandard(Standard standard) {
        this.standards.add(standard);
        standard.setQuestion(this);
        return this;
    }

    public Question removeStandard(Standard standard) {
        this.standards.remove(standard);
        standard.setQuestion(null);
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
