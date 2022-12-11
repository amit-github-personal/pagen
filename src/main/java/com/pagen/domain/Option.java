package com.pagen.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Option.
 */
@Entity
@Table(name = "jhi_option")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Option implements Serializable {

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

    @ManyToMany(mappedBy = "options")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "options" }, allowSetters = true)
    private Set<MultipleChoice> multipleChoices = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Option id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Option name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getArchived() {
        return this.archived;
    }

    public Option archived(Boolean archived) {
        this.setArchived(archived);
        return this;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public Set<MultipleChoice> getMultipleChoices() {
        return this.multipleChoices;
    }

    public void setMultipleChoices(Set<MultipleChoice> multipleChoices) {
        if (this.multipleChoices != null) {
            this.multipleChoices.forEach(i -> i.removeOption(this));
        }
        if (multipleChoices != null) {
            multipleChoices.forEach(i -> i.addOption(this));
        }
        this.multipleChoices = multipleChoices;
    }

    public Option multipleChoices(Set<MultipleChoice> multipleChoices) {
        this.setMultipleChoices(multipleChoices);
        return this;
    }

    public Option addMultipleChoice(MultipleChoice multipleChoice) {
        this.multipleChoices.add(multipleChoice);
        multipleChoice.getOptions().add(this);
        return this;
    }

    public Option removeMultipleChoice(MultipleChoice multipleChoice) {
        this.multipleChoices.remove(multipleChoice);
        multipleChoice.getOptions().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Option)) {
            return false;
        }
        return id != null && id.equals(((Option) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Option{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", archived='" + getArchived() + "'" +
            "}";
    }
}
