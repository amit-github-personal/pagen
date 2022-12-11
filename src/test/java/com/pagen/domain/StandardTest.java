package com.pagen.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.pagen.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StandardTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Standard.class);
        Standard standard1 = new Standard();
        standard1.setId(1L);
        Standard standard2 = new Standard();
        standard2.setId(standard1.getId());
        assertThat(standard1).isEqualTo(standard2);
        standard2.setId(2L);
        assertThat(standard1).isNotEqualTo(standard2);
        standard1.setId(null);
        assertThat(standard1).isNotEqualTo(standard2);
    }
}
