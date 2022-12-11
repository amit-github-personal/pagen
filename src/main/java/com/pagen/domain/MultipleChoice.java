package com.pagen.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Multiple Choice Questions\n@author Amit Mishra\n@since 1.0
 */
@Schema(description = "Multiple Choice Questions\n@author Amit Mishra\n@since 1.0")
@Entity
@Table(name = "multiple_choice")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MultipleChoice implements Serializable {

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

    @ManyToOne
    @JsonIgnoreProperties(value = { "multipleChoices" }, allowSetters = true)
    private Option option;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public MultipleChoice id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public MultipleChoice name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getArchived() {
        return this.archived;
    }

    public MultipleChoice archived(Boolean archived) {
        this.setArchived(archived);
        return this;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public Option getOption() {
        return this.option;
    }

    public void setOption(Option option) {
        this.option = option;
    }

    public MultipleChoice option(Option option) {
        this.setOption(option);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MultipleChoice)) {
            return false;
        }
        return id != null && id.equals(((MultipleChoice) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MultipleChoice{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", archived='" + getArchived() + "'" +
            "}";
    }
}
