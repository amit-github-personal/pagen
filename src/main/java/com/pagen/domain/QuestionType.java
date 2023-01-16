package com.pagen.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Question Type Representation.\nBelongs to Question.\n@author Amit Mishra\n@since 1.0
 */
@Schema(description = "Question Type Representation.\nBelongs to Question.\n@author Amit Mishra\n@since 1.0")
@Entity
@Table(name = "question_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class QuestionType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "marks", nullable = false)
    private Integer marks;

    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "archived")
    private Boolean archived;


    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public QuestionType id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMarks() {
        return this.marks;
    }

    public QuestionType marks(Integer marks) {
        this.setMarks(marks);
        return this;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }

    public String getType() {
        return this.type;
    }

    public QuestionType type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getArchived() {
        return this.archived;
    }

    public QuestionType archived(Boolean archived) {
        this.setArchived(archived);
        return this;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }


    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QuestionType)) {
            return false;
        }
        return id != null && id.equals(((QuestionType) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuestionType{" +
            "id=" + getId() +
            ", marks=" + getMarks() +
            ", type='" + getType() + "'" +
            ", archived='" + getArchived() + "'" +
            "}";
    }
}
